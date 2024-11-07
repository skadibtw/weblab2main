<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru-RU">

<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа №2</title>
    <link rel="stylesheet" href="static/index.css">
    <link rel="icon" type="image/jpg" href="static/media/icon.png">
</head>

<body>
<script src="static/script.js"></script>
<script src="static/canvas.js"></script>
<div class="content-container">
    <header class="header">
        <div class="header-container">
            <div>Хачатрян Геворк Артурович P3217</div>
            <div></div>
            <div>Вариант 51499</div>
        </div>
    </header>
    <main class="main">
        <div id="toast" class="toast"></div>
        <div class="main__left-column">
            <form id="form-1" action="${pageContext.request.contextPath}/controller" method="get" >
                <div class="main__block">
                    <canvas id="canvas" width="500" height="500"></canvas>
                </div>
                <div class="main__block">
                    <div class="row">Параметры</div>
                    <div class="row">
                        <div>Выберите X:</div>
                        <div><input type="checkbox" name="x" value="-5">-5</div>
                        <div><input type="checkbox" name="x" value="-4">-4</div>
                        <div><input type="checkbox" name="x" value="-3">-3</div>
                        <div><input type="checkbox" name="x" value="-2">-2</div>
                        <div><input type="checkbox" name="x" value="-1">-1</div>
                        <div><input type="checkbox" name="x" value="0">0</div>
                        <div><input type="checkbox" name="x" value="1">1</div>
                        <div><input type="checkbox" name="x" value="2">2</div>
                        <div><input type="checkbox" name="x" value="3">3</div>
                    </div>
                    <div class="row">
                        <div>Введите Y (от -3 до 3):</div>
                        <input name="y" id="y-input" type="text" placeholder="значение от -3 до 3" maxlength="12">
                    </div>
                    <div class="row">
                        <div>Выберите R:</div>
                        <div><input type="checkbox" name="radius" value="1" onchange="updateRadius(1)">1</div>
                        <div><input type="checkbox" name="radius" value="1.5" onchange="updateRadius(1.5)">1.5</div>
                        <div><input type="checkbox" name="radius" value="2" onchange="updateRadius(2)">2</div>
                        <div><input type="checkbox" name="radius" value="2.5" onchange="updateRadius(2.5)">2.5</div>
                        <div><input type="checkbox" name="radius" value="3" onchange="updateRadius(3)">3</div>
                    </div>
                </div>
                <button class="main__block submit_button" type="submit" id="submit_button">Проверить</button>
            </form>
        </div>

        <div class="table-container">
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
                <tbody id="result-body">
                <%
                    // Получение списка результатов из Bean-компонента
                    ru.ifmo.se.weblab2main.ResultsBean resultsBean = (ru.ifmo.se.weblab2main.ResultsBean) session.getAttribute("resultsBean");
                    if (resultsBean != null) {
                        for (ru.ifmo.se.weblab2main.ResultsBean.Result result : resultsBean.getResults()) {
                %>
                <tr>
                    <td><%= result.getX() %></td>
                    <td><%= result.getY() %></td>
                    <td><%= result.getRadius() %></td>
                    <td><%= result.isInArea() ? "Попадание" : "Не попал" %></td>
                    <td><%= new java.util.Date() %></td>
                    <td><%= result.getExecutionTime() %> ms</td>
                </tr>
                <%
                        }
                    }
                %>
                </tbody>
            </table>
        </div>
    </main>
</div>

</body>
</html>