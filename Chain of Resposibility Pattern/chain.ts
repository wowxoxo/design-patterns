/**
 * The interface declares a method for constructing a chain of handlers.
 */
interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string;
}

/**
 * The default chain can be implemented inside the base class.
 */
abstract class AbstractHandler implements Handler
{
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    // Returning the handler from here will allow the handlers to be linked in a simple way, like this:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Banana') {
      return `Monkey: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}
class DoglHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'MeatBull') {
      return `Dog: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}

/**
 * Usually the client code works with one handler. In most cases the client doesn't now about that the handler is the part of chain.
 */
function clientCode(handler: Handler) {
  const foods = ['Nut', 'Banana', 'Cup of coffee'];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`${result}`);
    } else {
      console.log(`${food} was left untouched.`);
    }
  }
}

/**
 * Other part of client code creates the chain.
 */
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DoglHandler();

monkey.setNext(squirrel).setNext(dog);

/**
 * Client should be able to send a request to any handler, not just the first in the chain.
 */
console.log('Chain: Monkey > Squirrel > Dog\n');
clientCode(monkey);
console.log('');

console.log('Subchain: Squirrel > Dog\n');
clientCode(squirrel);