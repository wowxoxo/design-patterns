class Program
{
  static void Main(string[] args)
  {
    Hero elf = new Hero(new ElfFactory());
    elf.Hit();
    elf.Run();

    Hero warrior = new Hero(new WarriorFactory());
    warrior.Hit();
    warrior.Run();

    Console.ReadLine(); // ?
  }
}

class Program1
{
  static void Main(string[] args)
  {
    Hero elf = MyHeroFactory<ElfFactory>.Create();
    elf.Hit();
    elf.Move();

    Hero warrior = MyHeroFactory<WarriorFactory>.Create();
    warrior.Hit();
    warrior.Run();

    Console.ReadLine();
  }
}

abstract class Weapon
{
  public abstract void Hit();
}

abstract class Movement
{
  public abstract void Move();
}

class Arbalet : Weapon
{
  public override void Hit()
  {
    Console.WriteLine("Arbalet shot");
  }
}

class Sword : Weapon
{
  public override void Hit()
  {
    Console.WriteLine("Sword hit");
  }
}

class FlyMovement : Movement
{
  public override void Move()
  {
    Console.WriteLine("Fly");
  }
}

class RunMovement: Movement
{
  public override void Move()
  {
    Console.WriteLine("Run");
  }
}

abstract class HeroFactory
{
  public abstract Movement CreateMovement();
  public abstract Weapon CreateWeapon();
}

class ElfFactory: HeroFactory
{
  public override Movement CreateMovement()
  {
    return new FlyMovement();
  }

  public override Weapon CreateWeapon()
  {
    return new Arbalet();
  }
}

class WarriorFactory: HeroFactory
{
  public override Movement CreateMovement()
  {
    return new RunMovement();
  }

  public override Weapon CreateWeapon()
  {
    return new Sword();
  }
}

class Hero
{
  private Weapon weapon;
  private Movement movement;
  public Hero(HeroFactory factory)
  {
    weapon = HeroFactory.CreateWeapon();
    movement = HeroFactory.CreateMovement();
  }

  public void Run()
  {
    movement.Move();
  }

  public void Hit()
  {
    movement.Hit();
  }
}

internal class MyHeroFactory<T> where T : HeroFactory, new()
{
  internal static Hero Create()
  {
    // T t = new T();
    // t.CreateMovement();
    // t.CreateWeapon();
    // return new Hero(t);
    
    return new Hero(new T());
  }
}