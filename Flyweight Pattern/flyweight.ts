/**
 * Flyweight stores common state part (internal condition), that belongs several real business-objects.
 * Flyweight accept rest part (external condition, unique for each object) of state through method params.
 */
class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

/**
 * Flyweight Fabric create flyweight-objects and rule them. It provides correct flyweight separation. When client requests a flyweight, the fabric returns an existing instance or creates a new one.
 */
class FlyweightFactory {
  private flyweights: {[key: string]: Flyweight} = <any>{};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  /**
   * Return Flyweight string hash for current state.
   * @param state 
   */
  private getKey(state: string[]): string {
    return state.join('_');
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweight.');      
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);      
    }
  }
}

/**
 * Usually client code creates a lot of filled flyweights on app initial state.
 */
const factory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['Mercedes Benz', 'C500', 'red'],
  ['BMW', 'M5', 'red'],
  ['BMW', 'X6', 'white'],
  // ...
]);
factory.listFlyweights();

// ...

function addCarToPoliceDatabase(
  ff: FlyweightFactory, plate: string, owner: string,
  brand: string, model: string, color: string
) {
  console.log('\nClient: Adding a car to database.');
  const flyweight = ff.getFlyweight([brand, model, color]);
  
  // Client code saves or calculates external condition and passes them to flyweight's methods
  flyweight.operation([plate, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

factory.listFlyweights();