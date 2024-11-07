<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="ru.ifmo.se.weblab2main.ResultsBean" %>
<!DOCTYPE html>
<html lang="ru-RU">

<head>
    <meta charset="UTF-8">
    <title>Результаты проверки</title>
    <link rel="stylesheet" href="static/index.css">
    <link rel="icon" type="image/jpg" href="static/media/icon.png">
</head>

<body>
<div class="content-container">
    <header class="header">
        <div class="header-container">
            <div>Хачатрян Геворк Артурович P3217</div>
            <div></div>
            <div>Вариант 51499</div>
        </div>
    </header>

    <main class="main">
        <div class="table-container">
            <h2>Результаты последней проверки</h2>
            <table id="result-table_2">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Текущее время</th>
                    <th>Время выполнения</th>
                </tr>
                </thead>
                <tbody>
                <%
                    // Получаем ResultsBean из сессии
                    ResultsBean resultsBean = (ResultsBean) session.getAttribute("resultsBean");
                    if (resultsBean != null && !resultsBean.getResults().isEmpty()) {
                        // Получаем последний результат
                        ResultsBean.Result latestResult = resultsBean.getResults().get(resultsBean.getResults().size() - 1);
                %>
                <tr>
                    <td><%= latestResult.getX() %></td>
                    <td><%= latestResult.getY() %></td>
                    <td><%= latestResult.getRadius() %></td>
                    <td><%= latestResult.isInArea() ? "Попадание" : "Не попал" %></td>
                    <td><%= new java.util.Date(latestResult.getTimestamp()) %></td>
                    <td><%= latestResult.getExecutionTime() %> ms</td>
                </tr>
                <%
                } else {
                %>
                <tr>
                    <td colspan="6">Результаты не найдены</td>
                </tr>
                <%
                    }
                %>
                </tbody>
            </table>

<%--            <h2>Предыдущие результаты</h2>
            <table id="result-table">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Текущее время</th>
                    <th>Время выполнения</th>
                </tr>
                </thead>
                <tbody>
                <%
                    if (resultsBean != null && resultsBean.getResults().size() > 1) {
                        for (ResultsBean.Result result : resultsBean.getResults()) {
                %>
                <tr>
                    <td><%= result.getX() %></td>
                    <td><%= result.getY() %></td>
                    <td><%= result.getRadius() %></td>
                    <td><%= result.isInArea() ? "Попадание" : "Не попал" %></td>
                    <td><%= new java.util.Date(result.getTimestamp()) %></td>
                    <td><%= result.getExecutionTime() %> ms</td>
                </tr>
                <%
                        }
                    }
                %>
                </tbody>
            </table>--%>

            <div class="navigation">
                <a href="index.jsp">Назад к форме</a>
            </div>
        </div>
    </main>
</div>
</body>
</html>
