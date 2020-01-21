/**
 * The Command Interface declares a method for executing commands.
 */
interface Command {
  execute(): void;
}

/**
 * Some commands are able to perform simple operation on their own.
 */
class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
  }
}

/**
 * But there are commands that delegate more complex operations to other objects called "recipients"
 */
class ComplexCommand implements Command {
  private receiver: Receiver;

  /**
   * Context data needed to run the recipient methods
   */
  private a: string;

  private b: string;

  /**
   * Complex commands can take one or more object-receivers with any data
   */
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  /**
   * Commands can delegate execution to any recipient methods
   */
  public execute(): void {
    console.log('ComplexCommand: Complex stuff should be done by a receiver object');
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

/**
 * Receiver classes contains some important business logic. They can execute all types of operations, that linked with request execution. In fact, any class may be Receiver.
 */
class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on ${a}.`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on ${b}.`);
  }
}

/**
 * The Invoker is associated with one or more commands. It sends a request to the Command.
 */
class Invoker {
  private onStart: Command;

  private onFinish: Command;

  /**
   * Commands initialization
   */
  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  /**
   * The sender is independent of the classes of specific commands and recipients. The sender passes the request to the recipient indirectly by executing the command.
   */
  public doSomethingImportant(): void {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object): object is Command {
    return object.execute !== undefined;
  }
}

/**
 * Client code can parameterize the sender with any commands.
 */

 const invoker = new Invoker();
 invoker.setOnStart(new SimpleCommand('Say Hi!'));
 const receiver = new Receiver();
 invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

 invoker.doSomethingImportant();