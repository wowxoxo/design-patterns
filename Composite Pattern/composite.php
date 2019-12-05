<?php
namespace RefactoringGuru\Composite\RealWorld;

abstract class FormElement
{
  protected $name;
  protected $title;
  protected $data;

  public function __construct(string $name, string $title)
  {
    $this->name = $name;
    $this->title = $title;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function setData($data): void
  {
    $this->data = $data;
  }

  public function getData(): array
  {
    return $this->data;
  }

  abstract public function render(): string;
}

// leaf
class Input extends FormElement
{
  private $type;

  public function __construct(string $name, string $title, string $type)
  {
    parent::__construct($name, $title);
    $this->type = $type;
  }

  public function render(): string
  {
    return "<label for=\"{$this->name}\">{$this->title}</label>\n" . "<input name=\"{$this->name}\" type=\"{$this->type}\" value=\"{$this->data}\">\n";
  }
}

abstract class FieldComposite extends FormElement
{
  /**
   * @var FormElement[]
   */
  protected $fields = [];

  /**
   * Methods for add/delete subobjects
   */
  public function add(FormElement $field): void
  {
    $name = $field->getName();
    $this->fields[$name] = $field;
  }

  public function remove(FormElement $component): void
  {
    $this->fields = array_filter($this->filelds, function ($child) use ($component) {
      return $child != $component;
    });
  }

  /**
   * @param array $data
   */
  public function setData($data): void
  {
    foreach ($this->fields as $name => $field) {
      if (isset($data[$name])) {
        $field->setData($data[$name]);
      }
    }
  }

  public function getData(): array
  {
    $data = [];

    foreach ($this->fields as $name => $field) {
      $data[$name] = $field->getData();
    }

    return $data;
  }

  /**
   * This method concat results from child elements
   */
  public function render(): string
  {
    $output = "";

    foreach ($this->fields as $name => $field) {
      $output .= $field->render();
    }

    return $output;
  }
}

/**
 * Concrete container
 */
class Fieldset extends FieldComposite
{
  public function render(): string
  {
    $output = parent::render();

    return "<fieldset><legend>{$this->title}</legend></fieldset>\n";
  }
}

/**
 * Concrete container too
 */
class Form extends FieldComposite
{
  protected $url;

  public function __construct(string $name, string $title, string $url)
  {
    parent::__construct($name, $title);
    $this->url = $url;
  }

  public function render(): string
  {
    $output = parent::render();
    return "<form action=\"{$this->url}\">\n<h3>{$this->title}</h3>\n{$output}</form>\n";
  }
}

/**
 * Now we've useful interface for create difficult tree structures
 */
function getProductForm(): FormElement
{
  $form = new Form('product', "Add product", "/product/add");
  $form->add(new Input('name', "Name", 'text'));
  $form->add(new Input('description', "Description", "text"));

  $picture = new Fieldset('photo', "Product photo");
  $picture->add(new Input('caption', "Caption", 'text'));
  $picture->add(new Input('image', "Image", 'file'));
  $form->add($picture);

  return $form;
}

function loadProductData(FormElement $form)
{
  $data = [
    'name' => 'Apple MacBook',
    'description' => 'A decent laptop.',
    'photo' => [
      'caption' => 'Front photo',
      'image' => 'photo1.png'
    ]
    ];

    $form->setData($data);
}

/** Now client code can work with form elements via abstract interface */
function renderProduct(FormElement $form)
{
  echo $form->render();
}

$form = getProductForm();
loadProductData($form);
renderProduct($form);

?>