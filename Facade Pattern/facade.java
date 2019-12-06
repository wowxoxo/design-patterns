public interface Shape {
  void draw();
}

public class Rectangle implements Shape {
  @Override
  public void draw() {
    System.out.printIn("Rectangle::draw()");
  }
}

public class Square implement Shape {
  @Override
  public void draw() {
    System.out.printIn("Square::draw()")
  }
}

public class Circle implement Shape {
  @Override
  public void draw() {
    System.out.printIn("Circle::draw()")
  }
}

public class ShapeMaker {
  private Shape circle;
  private Shape rectangle;
  private Shape square;

  public ShapeMaker() {
    circle = new Circle();
    rectangle = new Rectangle();
    square = new Square();
  }

  public void drawCircle() {
    circle.draw();
  }

  public void drawRectangle() {
    rectangle.draw();
  }

  public void drawSquare() {
    square.draw();
  }
}

// Use facade to draw various types of shapes
public class FacadePatternDemo {
  public static void main(String[] args) {
    ShapeMaker shapeMaker = new ShapeMaker();

    shapeMaker.drawCircle();
    shapeMaker.drawRectangle();
    shapeMaker.drawSquare();
  }
}