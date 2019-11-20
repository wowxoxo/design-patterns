<?php
namespace RefactoringGuru\Builder\RealWorld;

interface SQLQueryBuilder
{
  public function select(string $table, array $fields): SQLQueryBuilder;

  public function where(string $field, string $value, string $operator = "="): SQLQueryBuilder;

  public function limit(int $start, int $offset): SQLQueryBuilder;

  public function getSQL(): string;
}

class MysqlQueryBuilder implements SQLQuerySelector
{
  protected $query;

  protected function reset(): void
  {
    $this->query = new \stdClass;
  }

  public function select(string $table, array $fields): SQLQueryBuilder
  {
    $this->reset();
    $this->query->base = "SELECT " . implode(", ", $fields) . " FROM " . $table;
    $this->query->type = "select";

    return $this;
  }

  public function where(string $field, string $value, string $operator = "="): SQLQueryBuilder
  {
    if (!in_array($this->query->type, ['select', 'update'])) {
      throw new \Exception('WHERE can only be added to SELECT OR UPDATE');
    }
    $this->query->where[] = "$field $operator '$value'";

    return $this;
  }

  public function limit(int $start, int $offset): SQLQueryBuilder
  {
    if (!in_array($this->query->type, ['select'])) {
      throw new \Exception("LIMIT can only be added to SELECT");
    }
    $this->query->limit = " LIMIT " . $start . ", " . $offset;

    return $this;
  }

  public function getSQL(): string {
    $query = $this->query;
    $sql = $query->base;
    if (!empty($query->where)) {
      $sql .= " WHERE " . implode(" AND ", $query->where);
    }
    if (isset($query->limit)) {
      $sql .= $query->limit;
    }
    $sql .= ";";
    return $sql;
  }
}

class PostgresQueryBuider extends MysqlQueryBuilder
{
  public function limit(int $start, int $offset): SQLQueryBuilder
  {
    parent::limit($start, $offset);

    $this->query->limit = " LIMIT " . $start . " OFFSET " . $offset;

    return $this;
  }
}

function clientCode(SQLQueryBuilder $queryBuilder)
{
  $query = $queryBuilder
    ->select("users", ["name", "email", "password"])
    ->where("age", 18, ">")
    ->where("age", 30, "<")
    ->limit(10, 20)
    ->getSQL();

  echo $query;
}

// if ($_ENV['database_type'] == 'postgres') {
//     $builder = new PostgresQueryBuilder(); } else {
//     $builder = new MysqlQueryBuilder; }
//
// clientCode($builder);

echo "Testing MySQL query builder:\n";
clientCode(new MysqlQueryBuilder);

echo "\n\n";

echo "Testing PostgresSQL query builder:\n";
clientCode(new PostgresQueryBuilder);

?>