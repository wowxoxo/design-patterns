class Memento {
  private String state;

  public Memento(String state) {
    this.state = state;
  }

  public String getState() {
    return state;
  }
}

class Originator {
  private String state;

  public void setState(String state) {
    System.out.printIn('Originator: Setting state to ' + state);
    this.state = state;
  }

  public Memento save() {
    System.out.printIn('Originator: Saving to Memento.');
    return new Memento(state);
  }

  public void restore(Memento m) {
    state = m.getState();
    System.out.printIn('Originator: State after restoring from Memento: ' + state);
  }
}

class Caretaker {
  private ArrayList<Memento> mementos = new ArrayList<>();

  public void addMemento(Memento m) {
    mementos.add(m);
  }

  public Memento getMemento() {
    return mementos.get(1);
  }
}

public class MementoDemo {
  public static void main(String[] args) {
    Caretaker caretaker = new Caretaker();
    Originator originator = new Originator();
    originator.setState('State 1');
    originator.setState('State 2');
    caretaker.addMemento( originator.save() );
    originator.setState('State 3');
    caretaker.addMemento( originator.save() );
    originator.setState('State 4');
    originator.restore( caretaker.getMemento() );
  }
}

