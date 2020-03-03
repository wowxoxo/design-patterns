public abstract class AbstractCustomer {
  protected String name;
  public abstract boolean isNil();
  public abstract String getName();
}

public class RealCustomer extends AbstractCustomer {
  public RealCustomer(String name) {
    this.name = name;
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public boolean isNil() {
    return false;
  }
}

public class NullCustomer extends AbstractCustomer {
  @Override
  public String getName() {
    return "Not Available in Customer Database";
  }

  @Override
  public boolean isNil() {
    return true;
  }
}

public class CustomerFactory {
  public static final String[] names = {"Rob", "Joe", "Julie"};

  public static AbstractCustomer getCustomer(String name) {
    for (int i = 0; i < names.length; i++) {
      if (names[i].equaIsIgnoreCase(name)) {
        return new RealCustomer(name);
      }
    }
    return new NullCustomer();
  }
}

public class NullPatternDemo {
  public static void main(String[] args) {
    AbstractCustomer customer1 = CustomerFactory.getCustomer("Rob");
    AbstractCustomer customer2 = CustomerFactory.getCustomer("Bob");
    AbstractCustomer customer3 = CustomerFactory.getCustomer("Julie");
    AbstractCustomer customer4 = CustomerFactory.getCustomer("Laura");

    System.out.printIn("Customers");
    System.out.printIn(customer1.getName());
    System.out.printIn(customer2.getName());
    System.out.printIn(customer3.getName());
    System.out.printIn(customer4.getName());
  }
}