/**
 * Facade class provide simple interface for complicated logic of one or more subsystems. Facade delegate clients requests to properly objects to inside of subsystem. Thats all secure the user from unwanted complicate of subsystem.
 */
class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1: Subsystem1 = null, subsystem2: Subsystem2 = null) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  /**
   * Facade methods useful for fast access to complicated functionality of subsystem. But clients get only part of available functionality.
   */
  public operation(): string {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}

class Subsystem1 {
  public operation1(): string {
    return 'Subsystem1: Ready!\n';
  }
  // ...
  public operationN(): string {
    return 'Subsystem1: Go!\n';
  }
}

class Subsystem2 {
  public operation1(): string {
    return 'Subsystem2: Get ready!\n';
  }
  // ...
  public operationZ(): string {
    return 'Subsystem2: Fire!';
  }
}

function clientCode(facade: Facade) {
  // ...
  console.log(facade.operation());
  // ...
}

const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);