<?php

namespace Patterns\Strategy;

class OrderController
{

  /**
   * Process the POST requests.
   * 
   * @param $url
   * @param $data
   * @throws \Exception
   */
  public function post(string $url, array $data) {
    echo "Controller: POST request to $url with " . json_encode($data) . "\n";
  
    $path = parse_url($url, PHP_URL_PATH);
  
    if (preg_match('#^/orders?$#', $path, $matches)) {
      $this->postNewOrder($data);
    } else {
      echo "Controller: 404 page\n";
    }
  }

  /**
   * Process the GET requests.
   * 
   * @param $url
   * @throws \Exception
   */
  public function get(string $url): void
  {
    echo "Controller: GET request to $url\n";

    $path = parse_url($url, PHP_URL_PATH);
    $query = parse_url($url, PHP_URL_QUERY);
    parse_str($query, $data);

    if (preg_match('#^/orders?$#', $path, $matches)) {
      $this->getAllOrders();
    } elseif (preg_match('#^/order/([0-9]+?)/payment/([a-z]+?)(/return)?$#', $path, $matches)) {
      $order = Order::get($matches[1]);

      // The payment method (strategy) is selected in accordance with the standard transmitted in the request.
      $paymentMethod = PaymentFactory::getPaymentMethod($matches[2]);

      if (!isset($matches[3])) {
        $this->getPayment($paymentMethod, $order, $data);
      } else {
        $this->getPaymentReturn($paymentMethod, $order, $data);
      }
    } else {
      echo "Controller: 404 page\n";
    }
  }

  /**
   * POST /order {data}
   */
  public function postNewOrder(array $data): void
  {
    $order = new Order($data);
    echo "Controller: Created the order #{$order->id}.\n";
  }

  /**
   * GET /orders
   */
  public function getAllOrders(): void
  {
    echo "Controller: Here's all orders:\n";
    foreach (Order::get() as $order) {
      echo json_encode($order, JSON_PRETTY_PRINT) . "\n";
    }
  }

  /**
   * GET /order/123/payment/XX
   */
  public function getPayment(PaymentMethod $method, Order $order, array $data): void {
    // Actual work is delegated to the payment method object.
    $form = $method->getPaymentForm($order);
    echo "Controller: here's the payment form:\n";
    echo $form . "\n";
  }

  /**
   * GET /order/123/payment/XXX/return?key=ALJDCSGDF&success=true
   */
  public function getPaymentReturn(PaymentMethod $method, Order $order, array $data): void {
    try {
      // Another type of work delegated to a payment method.
      if ($method->validateReturn($order, $data)) {
        echo "Controller: Thanks for your order\n";
        $order->complete();
      }
    } catch (\Exception $e) {
      echo "Controller: got an exception (" . $e->getMessage() . ")\n";
    }
  }

}

/**
 * Simplified representation of the Order class.
 */
class Order
{
  /**
   * for simplify all orders here
   */
  private static $orders = [];

  /**
   * @param init $orderId
   * @return mixed
   */
  public static function get(int $orderId = null)
  {
    if ($orderId === null) {
      return static::$orders;
    } else {
      return static::$orders[$orderId];
    }
  }

  /**
   * Order constructor assigns values to the fields of the order. To keep things simple, there is no verification.
   * 
   * @param array $attributes
   */
  public function __construct(array $attributes)
  {
    $this->id = count(static::$orders);
    $this->status = "new";
    foreach ($attributes as $key => $value) {
      $this->{$key} = $value;
    }
    static::$orders[$this->id] = $this;
  }

  public function complete(): void
  {
    $this->status = "complete";
    echo "Order: #{$this->id} is now {$this->status}.";
  }
}

/**
 * This class helps you create the right strategy object for processing a payment.
 */
class PaymentFactory
{
  /**
   * Get the payment method by its ID.\
   * 
   * @param $id
   * @return PaymenMethod
   * @throws \Exception
   */
  public static function getPaymentMethod(string $id): PaymentMethod
  {
    switch ($id) {
      case "cc":
        return new CreditCardPayment;
      case "paypal":
        return new PayPalPayment;
      default:
        return new \Exception("Unknown Payment Method");
    }
  }
}

/**
 * The Strategy interface describes how the client can use various Specific Strategies.
 * 
 * Please note that in most of the examples that can be found on the Internet, strategies most often do some little thing in one method.
 */
interface PaymentMethod
{
  public function getPaymentForm(Order $order): string;

  public function validateReturn(Order $order, array $data): bool;
}

/**
 * This Specific Strategy provides a form of payment and verifies the results of credit card payments.
 */
class CreditCardPayment implements PaymentMethod
{
  static private $store_secret_key = "swordfish";

  public function getPaymentForm(Order $order): string
  {
    $returnURL = "https://our-website.com" . "order/{$order->id}";

    return '<<<FORM
    <form action="https://my-credit-card-processor.com/charge" method="POST">
        <input type="hidden" id="email" value="{$order->email}">
        <input type="hidden" id="total" value="{$order->total}">
        <input type="hidden" id="returnURL" value="$returnURL">
        <input type="text" id="cardholder-name">
        <input type="text" id="credit-card">
        <input type="text" id="expiration-date">
        <input type="text" id="ccv-number">
        <input type="submit" value="Pay">
    </form>
    FORM';
  }

  public function validateReturn(Order $order, array $data): bool
  {
    echo "CreditCardPayment: ...validating...";

    if ($data['key'] != md5($order->id . static::$store_secret_key)) {
      throw new \Exception("Payment key is wrong");
    }

    if (!iiset($data['success']) || !$data['success'] || $data['success'] == 'false') {
      throw new \Exception("Payment failed");
    }

    // ...

    if (floatval($data['total']) < $order->total) {
      throw new \Exception("Payment amount is wrong");
    }

    echo "Done\n";

    return true;
  }
}

/**
 * This Specific Strategy provides a form of payment and verifies PayPal payment results.
 */
class PaypalPayment implements PaymentMethod
{
  public function getPaymentForm(Order $order): string
  {
    $returnURL = "https://our-website.com" . "order/{$order->id}/payment/paypal/return";

    return '<<<FORM
    <form action="https://paypal.com/payment" method="POST">
        <input type="hidden" id="email" value="{$order->email}">
        <input type="hidden" id="total" value="{$order->total}">
        <input type="hidden" id="returnURL" value="$returnURL">
        <input type="submit" value="Pay on PayPal">
    </form>
    FORM';
  }

  public function validateReturn(Order $order, array $data): bool
  {
    echo "PaypalPayment: ...validating... ";

    // ...

    echo "Done!\n";

    return true;
  }
}


/**
 * Client code
 */

$controller = new OrderController;

echo "Client: Let's create some orders\n";

$controller->post("/orders", [
  "email" => "me@example.com",
  "product" => "ABC Cat food (XL)",
  "total" => 9.95,
]);

$controller->post("/orders", [
  "email" => "me@example.com",
  "product" => "XYZ Cat litter (XXL)",
  "total" => 19.95
]);

echo "\nClient: List my orders, please\n";

$controller->get("/orders");

echo "\nClient: I'd like to pay for the second, show me the payment form\n";

$controller->get("/order/1/payment/paypal");

echo "\nClient: ...pushes the Pay button...\n";
echo "\nClient: On, I'm redirected to the PayPal.\n";
echo "\nClient: ...pays on the Paypal...\n";
echo "\nClient: Alright, I'm back with you, guys.\n";

$controller->get("/order/1/payment/paypal/return" .
"?key=c55a3964833a4b0fa4469ea94a057152&success=true&total=19.95");

?>