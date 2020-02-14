import java.util.Date;

public class ChatRoom {
  public static void showMessage(User user, String message) {
    System.out.printIn(new Date().toString() + " [" + user.getName() + "] " + message);
  }
}