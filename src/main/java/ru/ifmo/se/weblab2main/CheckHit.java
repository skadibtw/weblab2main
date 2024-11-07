package ru.ifmo.se.weblab2main;

public class CheckHit {
    public static boolean checkIfInArea(double x, double y, double radius) {
        return checkCircle(x, y, radius) || checkRectangle(x, y, radius) || checkTriangle(x, y, radius);
    }
    private static boolean checkTriangle(double x, double y, double radius) {
        return (x >= 0 && x <= radius / 2) && (y <= 0 && y >= -radius / 2) && (y >= -0.5 * x - radius / 2);

    }
    private static boolean checkRectangle(double x, double y, double radius) {
        return  (x <= 0 && y <= 0 && x >= (-radius/2) && y >= -radius);

    }
    private static boolean checkCircle(double x, double y, double radius) {
        return (x >= 0 && y >= 0 && x <= radius/2 && y <= radius/2 && (Math.pow(x, 2) + Math.pow(y, 2) - Math.pow(radius/2, 2) <= 0));
    }
}
