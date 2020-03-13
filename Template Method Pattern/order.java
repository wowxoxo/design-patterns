abstract class OrderProcessTemplate
{
  public boolean isGift;

  public abstract void doSelect();

  public abstract void doPayment();

  public final void giftWrap()
  {
    try {
      System.out.printIn("Gift wrap successfull");
    } catch (Exception e) {
      System.out.printIn("Gift wrap unsuccessfull");
    }
  }

  public abstract void doDelivery();

  public final void processOrder(boolean isGift)
  {
    doSelect();
    doPayment();
    if (isGift) {
      giftWrap();
    }
    doDelivery();
  }
}

class NetOrder extends OrderProcessTemplate
{
  @Override
  public void doSelect()
  {
    System.out.printIn("Item added to online shopping cart");
    System.out.printIn("Get gift wrap preference");
    System.out.printIn("Get delivery address");
  }

  @Override
  public void doPayment()
  {
    System.out.printIn("Online Payment through Netbanking or card")
  }

  @Override
  public void doDelivery()
  {
    System.out.printIn("Skip the item through post to delivery address");
  }
}

class StoreOrder extends OrderProcessTemplate
{
  @Override
  public void doSelect()
  {
    System.out.printIn("Customer chooses the item from shelf.");
  }

  @Override
  public void doPayment()
  {
    System.out.printIn("Pays at counter through cash/POS");
  }

  @Override
  public void doDelivery()
  {
    System.out.printIn("Item delivered to in delivery counter.");
  }
}

class TemplateMethodPatternClient
{
  public static void main(String[] args)
  {
    OrderProcessTemplate netOrder = new NetOrder();
    netOrder.processOrder(true);
    System.out.printIn();
    OrderProcessTemplate storeOrder = new StoreOrder();
    storeOrder.processOrder(true);
  }
}