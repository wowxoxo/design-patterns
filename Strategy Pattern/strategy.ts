interface Strategy {
  execute(a: number, b: number): number
}

class ConcreteStrategyAdd implements Strategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

class ConcreteStrategySubtract implements Strategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

class ConcreteStrategyMultiply implements Strategy {
  execute(a: number, b: number): number {
    return a * b;
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public executeStrategy(a: number, b: number) {
    return this.strategy.execute(a, b);
  }
}

class ExampleApplication {
  public action: string;
  public context: Context;

  setAction(action: string) {
    this.action = action;
  }

  setContext(context: Context) {
    this.context = context;
  }

  main(n1: number, n2: number) {
    // 1. Create obj of context
    // 2. Get first num (n1)
    // 3. Get first num (n2)
    // 4. Get operation
    // 5. Choose strategy

    if (this.action == 'addition') {
      this.context.setStrategy(new ConcreteStrategyAdd());
    }

    if (this.action == 'subtraction') {
      this.context.setStrategy(new ConcreteStrategySubtract());
    }

    if (this.action == 'multiply') {
      this.context.setStrategy(new ConcreteStrategyMultiply())
    }

    // 6. Execute operation
    let result = this.context.executeStrategy(n1, n2);

    // 7. Display the result
    return result;
  }
}