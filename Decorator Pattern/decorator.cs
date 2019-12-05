abstract class Pizza
{
  public Pizza(string n)
  {
    this.Name = n;
  }
  public string Name {get; protected set;}
  public abstract int GetCost();
}

class ItalianPizza : Pizza
{
  public ItalianPizza() : base("Italian pizza") { }
  public override int GetCost() => 10;
}

class BulgerianPizza : Pizza
{
  public BulgerianPizza() : base("Bulgerian pizza") { }
  public override int GetCost() => 8;
}

abstract class PizzaDecorator : Pizza
{
  protected Pizza pizza;
  public PizzaDecorator(string n, Pizza pizza) : base(n)
  {
    this.pizza = pizza;
  }
}

class TomatoPizza : PizzaDecorator
{
  public TomatoPizza(Pizza p)
    : base(p.Name + ", with tomatoes", p)
  { }

  public override int GetCost()
  {
    return pizza.GetCost() + 3;
  }
}

class CheesePizza : PizzaDecorator
{
  public CheesePizza(Pizza p)
    : base(p.Name + ", with cheese", p)
  { }

  public override int GetCost()
  {
    return pizza.GetCost() + 5;
  }
}

class Program
{
  static void Main(string[] args)
  {
    Pizza pizza1 = new ItalianPizza();
    pizza1 = new TomatoPizza(pizza1); // italian pizza with tomatoes
    Console.WriteLine("Name: {0}", pizza1.Name);
    Console.WriteLine("Price: {0}", pizza1.GetCost());

    Pizza pizza2 = new ItalianPizza();
    pizza2 = new CheesePizza(pizza2); // italian pizza with cheese
    Console.WriteLine("Name: {0}", pizza2.Name);
    Console.WriteLine("Price: {0}", pizza2.GetCost());

    Pizza pizza3 = new BulgerianPizza();
    pizza3 = new TomatoPizza(pizza3);
    pizza3 = new CheesePizza(pizza3); // bulgerian pizza with tomatoes and cheese
    Console.WriteLine("Name: {0}", pizza3.Name);
    Console.WriteLine("Price: {0}", pizza3.GetCost());

    Console.ReadLine();
  }
}