interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Handling request.');
  }
}

// same interface
class ProxySubject implements Subject {
  private realSubject: RealSubject;

  /**
   * Proxy stores link to object of class RealSubject.
   */
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAdress()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  public checkAdress(): boolean {
    console.log('Proxy: Checking access prior to firing a real request.');
    return true;    
  }

  public logAccess(): void {
    console.log('Proxy: Logging the time of request.');    
  }
 }

 function clientCode1(subject: Subject) {
   // ...
   subject.request();
   // ...
 }

 console.log('Client: Executing the client code with a real subject:');
 const realSubject = new RealSubject();
 clientCode1(realSubject);

 console.log('');
 
 console.log('Client: Executing the same client code with a proxy:');
 const proxy = new ProxySubject(realSubject);
 clientCode1(proxy);
  