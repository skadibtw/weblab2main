package ru.ifmo.se.weblab2main;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String xParam = request.getParameter("x");
        String yParam = request.getParameter("y");
        String radiusParam = request.getParameter("radius");

        if (xParam != null && yParam != null && radiusParam != null) {
            request.getRequestDispatcher("/areaCheck").forward(request, response);
        } else {
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
}
