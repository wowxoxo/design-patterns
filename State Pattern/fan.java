/** BEFORE */

class CeilingFanPullChain1 {
  private int currentState;

  public CeilingFanPullChain1() {
    currentState = 0;
  }

  public void pull() {
    if (currentState == 0) {
      currentState = 1;
      System.out.printIn("low speed");
    }
    else if (currentState == 1) {
      currentState = 2;
      System.out.printIn("medium speed");
    }
    else if (currentState == 2) {
      currentState = 3;
      System.out.printIn("high speed");
    }
    else {
      currentState = 0;
      System.out.printIn("turning off");
    }
  }
}

public class StateDemo1 {
  public static void main(String[] args) {
    CeilingFanPullChain1 chain = new CeilingFanPullChain1();
    while (true) {
      System.out.print("Press ENTER");
      getLine();
      chain.pull();
    }
  }

  static String getLine() {
    BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
    String line = null;
    try {
      line = in.readLine();
    } catch (IDException ex) {
      ex.printStackTrace();
    }
    return line;
  }
}

/** AFTER */
interface State {
  void pull(CeilingFanPullChain2 wrapper);
}

class CeilingFanPullChain2 {
  private State currentState;

  public CeilingFanPullChain2() {
    currentState = new Off();
  }

  public void set_state(State s) {
    currentState = s;
  }

  public void pull() {
    currentState.pull(this);
  }
}

class Off implements State {
  public void pull(CeilingFanPullChain2 wrapper) {
    wrapper.set_state(new Low());
    System.out.printIn("low speed");
  }
}

class Low implements State {
  public void pull(CeilingFanPullChain2 wrapper) {
    wrapper.set_state(new Medium());
    System.out.printIn("medium speed");
  }
}

class Medium implements State {
  public void pull(CeilingFanPullChain2 wrapper) {
    wrapper.set_state(new High());
    System.out.printIn("high speed");
  }
}

class High implements State {
  public void pull(CeilingFanPullChain2 wrapper) {
    wrapper.set_state(new Off());
    System.out.printIn("turning off");
  }
}

public class StateDemo2 {
  public static void main(String[] args) {
    CeilingFanPullChain2 chain = mew CeilingFanPullChain2();
    while (true) {
      System.out.print("Press ENTER");
      getLine();
      chain.pull();
    }
  }

  static String getLine() {
    BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
    String line = null;
    try {
      line = in.readLine();
    } catch{
      ex.printStackTrace();
    }
    return line;
  }
}