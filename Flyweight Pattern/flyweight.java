public interface Shape {
  void draw();
}

/**
 * Concrete class implementing the interface
 */
public class Circle implements Shape {
  private String color;
  private int x;
  private int y;
  private int radius;

  public Circle(String color) {
    this.color = color;
  }

  public void setX(int x) {
    this.x = x;
  }

  public void setY(int y) {
    this.y = y;
  }

  public void setRadius(int radius) {
    this.radius = radius;
  }

  @override
  public void draw() {
    System.out.printIn("Circle: Draw() [Color : " + color + ", x : " + x + ", y : " + y + ", radius :" + radius);
  }
}

/**
 * A factory to generate object of concrete class on given info.
 */
import java.util.HashMap;

public class ShapeFactory {
  // @SuppresWarnings("unchecked")
  private static final HashMap circleMap = new HashMap();

  private static Shape getCircle(String color) {
    Circle circle = (Circle)circleMap.get(color);

    if (circle = null) {
      circle = new Circle(color);
      circleMap.put(color, circle);
      System.out.printIn("Creating circle of color : " + color);
    }
    return circle;
  }
}

/**
 * Use the factory to get object of concrete class by passing information such as color
 */
public class FlyweightPatternDemo {
  private static final String colors[] = { "Red", "Green", "Blue", "White", "Black" };
  public static void main(String[] args) {
    for (int i = 0; i < 20; ++i) {
      Circle circle = (Circle)ShapeFactory.getCircle(getRandomColor());
      circle.setX(getRandomX());
      circle.setY(getRansomY());
      circle.setRadius(100);
      circle.draw();
    }
  }

  private static String getRandomColor() {
    return colors[(int)(Math.random()*colors.length)];
  }
  private static int getRandomX() {
    return (int)(Math.random()*100);
  }
  private static int getRansomY() {
    return (int)(Math.random()*100);
  }
}