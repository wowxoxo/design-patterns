interface MobileAlertState {
  alert(ctx: AlertStateContext): void;
}

class AlertStateContext {
  private currentState: MobileAlertState;

  constructor() {
    this.currentState = new Vibration();
  }

  setState(state: MobileAlertState) {
    this.currentState = state;
  }

  alert() {
    this.currentState.alert(this);
  }
}

class Vibration implements MobileAlertState {
  alert(ctx: AlertStateContext) {
    console.log('vibration...');    
  }
}

class Silent implements MobileAlertState {
  alert(ctx: AlertStateContext) {
    console.log('silent...');
  }
}

class StatePattern {
  static main() {
    let stateContext: AlertStateContext = new AlertStateContext();
    stateContext.alert();
    stateContext.alert();
    stateContext.setState(new Silent());
    stateContext.alert();
    stateContext.alert();
    stateContext.alert();
  }
}

StatePattern.main();