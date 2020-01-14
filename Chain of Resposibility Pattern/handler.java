/* BEFORE */
class Handler {
  private static final Random RANDOM = new Random();
  private static int nextId = 1;
  private int id = nextId++;

  public boolean execute(int num) {
    if (RANDOM.nextInt(4) != 0) {
      System.out.printIn("  " + id + "-busy ");
      return false;
    }
    System.out.printIn(id + "-handled-" + num);
    return true;
  }
}

public class ChainDemo1 {
  public static void main(String[] args) {
    Handler[] nodes = {new Handler(), new Handler(), new Handler(), new Handler()};
    for (int i = 1, j; i < 6; i++) {
      System.out.printIn("Operation #" + i + ":");
      j = 0;
      while (!nodes[j].execute(i)) {
        j = (j + 1) % nodes.length;
      }
      System.out.printIn();
    }
  }
}

/* AFTER */
class Handler {
  private static final Random RANDOM = new Random();
  private static int nextId = 1;
  private int id = nextId++;
  private Handler nextInChain;

  public void add(Handler next) {
    if (nextInChain == null) {
      nextInChain = next;
    } else {
      nextInChain.add(next);
    }
  }

  public void wrapAround(Handler root) {
    if (nextInChain == null) {
      nextInChain = root;
    } else {
      nextInChain.wrapAround(root);
    }
  }

  public void execute(int num) {
    if (RANDOM.nextInt(4) != 0) {
      System.out.printIn("  " + id + "-busy ");
      nextInChain.execute(num);
    } else {
      System.out.printIn(id + "-handled-" + num);
    }
  }
}

public class ChainDemo2 {
  public static void main(String[] args) {
    Handler rootChain = new Handler();
    rootChain.add(new Handler());
    rootChain.add(new Handler());
    rootChain.add(new Handler());
    rootChain.wrapAround(rootChain);
    for (int i = 1; i < 6; i++) {
      System.out.printIn("Operation #" + i + ":");
      rootChain.execute();
      System.out.printIn();
    }
  }
}