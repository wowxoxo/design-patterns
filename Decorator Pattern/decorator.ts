/**
 * Basic interface
 */
interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  public operation(): string {
    return 'ConcreteComponent';
  }
}

class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  /**
   * Decorator delegate own work to component
   */
  public operation(): string {
    return this.component.operation();
  }
}

/**
 * Concrete decorator call wrapped component
 */
class ConcreteDecoratorA extends Decorator {
  /**
   * Decorator can call parent realization
   */
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

function clientCode(component: Component) {
  // ...
  console.log(`RESULT: ${component.operation()}`);  
  // ...
}

/**
 * client code can support simple components ...
 */
const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ... as is decorated 
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);
