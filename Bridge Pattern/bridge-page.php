<?php
namespace RefactoringGuru\Bridge\RealWorld;

// abstraction
abstract class Page
{
  protected $renderer;

  public function __construct(Renderer $renderer)
  {
    $this->renderer = $renderer;
  }

  public function changeRenderer(Renderer $renderer)
  {
    $this->renderer = $renderer;
  }

  abstract public function view(): string;
}

// concrete abstraction
class SimplePage extends Page
{
  protected $title;
  protected $content;

  public function __construct(Renderer $renderer, string $title, string $content)
  {
    parent::__construct($renderer);
    $this->title = $title;
    $this->content = $content;
  }

  public function view(): string
  {
    return $this->renderer->renderParts([
      $this->renderer->renderHeader(),
      $this->renderer->renderTitle($this->title),
      $this->renderer->renderTextBlock($this->content),
      $this->renderer->renderFooter()
    ]);
  }
}

class ProductPage extends Page
{
  protected $product;

  public function __construct(Renderer $renderer, Product $product)
  {
    parent::__construct($renderer);
    $this->product = $product;
  }

  public function view(): string
  {
    return $this->renderer->renderParts([
      $this->renderer->renderHeader(),
      $this->renderer->renderTitle($this->product->getTitle()),
      $this->renderer->renderTextBlock($this->product->getDescription()),
      $this->renderer->renderImage($this->product->getImage()),
      $this->renderer->renderLink("/cart/add/" . $this->product->getId(), "Add to cart"),
      $this->renderer->renderFooter
    ]);
  }
}

class Product
{
  private $id, $title, $description, $image, $price;

  public function __construct(
    string $id,
    string $title,
    string $description,
    string $image,
    float $price
  ) {
    $this->id = $id;
    $this->title = $title;
    $this->description = $description;
    $this->image = $image;
    $this->price = $price;
  }

  public function getId(): string {  }
}

?>