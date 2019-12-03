const order = {
  lineItems: [
    {
      price: 100,
      quantity: 2
    },
    {
      price: 200,
      quantity: 3
    }
  ],
  country: "US"
}

class Shop {
  public getOrderTotal(order) {
    let total = 0;
    order.lineItems.forEach(item => {
      return total += item.price * item.quantity
    });

    if (order.country == "US") {
      total += total * 0.07
    } else if (order.country == "EU") {
      total += total * 0.2
    }

    return total;
  }
}

class Shop2 {
  public getOrderTotal(order) {
    let total = 0;
    order.lineItems.forEach(item => {
      return total += item.price * item.quantity
    });

    total += total * this.getTaxMount(order.country)

    return total;
  }

  private getTaxMount(country) {
    switch (country) {
      case "US":
        return 0.07;

      case "EU":
        return 0.2;
    
      default:
        return 0;
    }
  }
}

const shop = new Shop();
const test = shop.getOrderTotal(order);
console.log(test);


// example 2
class Designer {
  public designArchitecture() {}
}

class Programmer {
  public writeCode() {}
}

class Tester {
  public testSoftware() {}
}

class Company {
  public createSoftware() {
    const d: Designer = new Designer();
    d.designArchitecture();
    const p: Programmer = new Programmer();
    p.writeCode();
    const t: Tester = new Tester();
    t.testSoftware();
  }
}

// polymorphism
interface Employee {
  doWork(): void
}

class Designer1 implements Employee {
  public doWork(): void {
    console.log('Do designer work');    
  }
}

class Programmer1 implements Employee {
  public doWork(): void {
    console.log('Do programmer work');    
  }
}

class Tester1 implements Employee {
  public doWork(): void {
    console.log('Do Tester work');    
  }
}

class Company1 {
  public createSoftware() {
    let employees = [
      new Designer1(),
      new Programmer1(),
      new Tester1()
    ]
    employees.forEach((e: Employee) => {
      e.doWork()
    });
  }
}