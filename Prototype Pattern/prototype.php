<?php
namespace RefactoringGuru\Prototype\RealWorld;

class Page
{
  private $title;

  private $body;

  private $author;

  private $comments = [];

  private $date;

  public function __construct(string $title, string $body, Author $author)
  {
    $this->title = $title;
    $this->body = $body;
    $this->author = $author;
    $this->author->addToPage($this);
    $this->date = new DateTime;
  }

  public function addComment(string $comment): void
  {
    $this->comments[] = $comment;
  }

  /**
   * Вы можете контролировать, какие данные вы хотите перенести в
   * клонированный объект.
   *
   * Например, при клонировании страницы:
   * - Она получает новый заголовок «Копия ...».
   * - Автор страницы остаётся прежним. Поэтому мы оставляем ссылку на
   * существующий объект, добавляя клонированную страницу в список страниц
   * автора.
   * - Мы не переносим комментарии со старой страницы.
   * - Мы также прикрепляем к странице новый объект даты.
   */
  public function __clone()
  {
    $this->title = "Copy of " . $this->title;
    $this->author->addToPage($this);
    $this->comments = [];
    $this->date = new DateTime;
  }
}

class Author
{
  private $name;

  private $pages = [];

  public function __construct(string $name)
  {
    $this->name = $name;
  }

  public function addToPage(Page $page): void
  {
    $this->pages[] = $page;
  }
}

function clientCode()
{
  $author = new Author("John Smith");
  $page = new Page("Tip of the day", "Keep calm & carry on.", $author);

  $page->addComment("Nice tip, thanks!");

  $draft = clone $page;
  echo "Dump of the clone. Note that the author is now referencing two objects.\n\n";
  print_r($draft);
}

clientCode();
?> 