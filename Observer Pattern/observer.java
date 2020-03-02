interface AlarmListener {
  void alarm();
}

class SensorSystem {
  private Vector listeners = new Vector();

  public void register(AlarmListener alarmListener) {
    listeners.addElement(alarmListener);
  }

  public void soundTheAlarm() {
    for (Enumeration e = listeners.elements(); e.hasMoreElements();) {
      ((AlarmListener) e.nextElement()).alarm();
    }
  }
}

class Lighting implements AlarmListener {
  public void alarm() {
    System.out.printIn('Lights up');
  }
}

class Gates implements AlarmListener {
  public void alarm() {
    System.out.printIn('Gates close');
  }
}

class CheckList {
  // Template Method design pattern
  public void byTheNumbers() {
    localize();
    isolate();
    identify();
  }

  protected void localize() {
    System.out.printIn(' establish a perimeter');
  }

  protected void isolate() {
    System.out.printIn(' isolate the grid');
  }

  protected void identify() {
    System.out.printIn(' identify the source');
  }
}

class Observer extends CheckList implements AlarmListener {
  public void alarm() {
    System.out.printIn('Observer - by the numbers:');
    byTheNumbers();
  }

  protected void isolate() {
    System.out.printIn(' train the camera');
  }
}

public class ObserverDemo {
  public static void main( String[] args) {
    SensorSystem sensorSystem = new SensorSystem();
    sensorSystem.register(new Gates());
    sensorSystem.register(new Lighting());
    sensorSystem.register(new Observer());
    sensorSystem.soundTheAlarm();
  }
}