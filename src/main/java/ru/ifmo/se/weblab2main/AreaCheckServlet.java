package ru.ifmo.se.weblab2main;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

import static ru.ifmo.se.weblab2main.CheckHit.checkIfInArea;

@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.currentTimeMillis();
        try {
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double radius = Double.parseDouble(request.getParameter("radius"));

            // Проверка попадания точки в область
            boolean isInArea = checkIfInArea(x, y, radius);

            // Получаем или создаем ResultsBean в сессии
            HttpSession session = request.getSession();
            ResultsBean resultsBean = (ResultsBean) session.getAttribute("resultsBean");
            if (resultsBean == null) {
                resultsBean = new ResultsBean();
                session.setAttribute("resultsBean", resultsBean);
            }

            // Добавляем результат в ResultsBean
            long executionTime = System.currentTimeMillis() - startTime;
            resultsBean.addResult(x, y, radius, isInArea, executionTime);

            // Устанавливаем атрибуты для отображения результата на странице
            request.setAttribute("x", x);
            request.setAttribute("y", y);
            request.setAttribute("radius", radius);
            request.setAttribute("isInArea", isInArea);
            request.setAttribute("executionTime", executionTime);

            // Перенаправляем на result.jsp для отображения результата
            request.getRequestDispatcher("/result.jsp").forward(request, response);

        } catch (NumberFormatException e) {
            // В случае неверных параметров перенаправляем на страницу ввода данных
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Повторяем логику для метода POST
        doGet(request, response);
    }
}