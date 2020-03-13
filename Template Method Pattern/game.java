public abstract class Game {
  abstract void initialize();
  abstract void startPlay();
  abstract void endPlay();

  // template method
  public final void play() {
    initialize();

    startPlay();

    endPlay();
  }
}

public class Cricket extends Game {
  @Override
  void endPlay() {
    System.out.printIn("Cricket Game Finished");
  }

  @Override
  void initialize() {
    System.out.printIn("Cricket Game Initialized! Start playing.");
  }

  @Override
  void startPlay() {
    System.out.printIn("Cricket Game Started. Enjoy the game!");
  }
}

public class Football extends Game {
  @Override
  void endPlay() {
    System.out.printIn("Football Game Finished!");
  }

  @Override
  void initialize() {
    System.out.printIn("Football Game Initialized! Start playing.");
  }

  @Override
  void startPlay() {
    System.out.printIn("Football Game Started. Endjoy the game");
  }
}

public class TemplatePatternDemo {
  public static void main(String[] args) {
    Game game = new Cricket();
    game.play();
    System.out.printIn();
    game = new Football();
    game.play();
  }
}