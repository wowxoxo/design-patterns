//// 1 single responsibility
// before
class Employee1 {
  private name;

  public getName() {}

  public printTimeSheetReport() {}
}
// after
class TimeSheetReport {
  public print(employee) {}
}

class Employee2 {
  private name;

  public getName() {}
}

//// 2 open/closed
// before
class Order {
  private lineItems;
  private shipping;

  public getTotal(): number {
    return 101
  }
  public getTotalWeight(): number {
    return 1
  }
  public setShippingType(st) {}
  public getShippingCost() {
    if (this.shipping == "ground") {
      // free for big orders
      if (this.getTotal() > 100) {
        return 0
      }
      // $1.5 for each kilo, but not less $10
      return Math.max(10, this.getTotalWeight() * 1.5)
    }
  }
  public getShippingDate() {}
}

// after
interface Shipping {
  getCost(order): void
  getDate(order): void
}

class Ground implements Shipping {
  getCost(order) {
    if (order.getTotal() > 100) {
      return 0
    }
    // $1.5 for each kilo, but not less $10
    return Math.max(10, order.getTotalWeight() * 1.5)
  }
  getDate(order) {}
}

class Air implements Shipping {
  getCost(order) {}
  getDate(order) {}
}

class Order1 {
  private lineItems;
  private shipping: Shipping;
  public getTotal() {};
  public getTotalWeight() {};
  public setShippingType(shipping) {};
  public setShippingCost() {
    return this.shipping.getCost(this);
  };
  public setShippingDate() {};
}

//// 3 Liskov
// before
class Document1 {
  private data;
  private filename;
  public open() {};
  public save() {};
}

class ReadOnlyDocument extends Document1 {
  public save() {
    throw new Error('!!!!!jazka!!!!')
  }
}

class Project {
  private documents
  public openAll() {
    this.documents.forEach(doc => {
      doc.open()
    });
  }
  public saveAll() {
    this.documents.forEach(doc => {
      if (doc instanceof ReadOnlyDocument) {
        doc.save()
      }
    });
  }
}

// after
class Document2 {
  private data;
  private filename;
  public open() {};
}

class WritableDocument extends Document2 {
  public save() {}
}

class Project2 {
  private allDocs;
  private writableDocs;
  public openAll() {
    this.allDocs.forEach(doc => {
      doc.open()
    });
  }
  public saveAll() {
    this.writableDocs.forEach(doc => {
      doc.save()
    });
  }
}