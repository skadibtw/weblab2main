window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const R = 200; // Радиус
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Функция рисования осей и меток
    function drawAxes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистим канвас
        // Circle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, R / 2, 3 * Math.PI / 2, 0, false); // Круговая дуга
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();

        // Rect
        ctx.beginPath();
        ctx.rect(centerX - R / 2, centerY, R / 2, R);
        ctx.fillStyle = 'blue';
        ctx.fill();

        // Triangle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY); // Начальная точка (центр)
        ctx.lineTo(centerX + R / 2, centerY); // Правая точка
        ctx.lineTo(centerX, centerY + R / 2); // Верхняя точка
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();

        // Text (R, R/2)
        ctx.fillStyle = 'black';
        ctx.font = '16px sans-serif';

        // R on graph
        ctx.fillText('R', centerX + R, centerY - 5);
        ctx.fillText('R', centerX - 15, centerY - R);
        ctx.fillText('-R', centerX - R - 15, centerY - 5);
        ctx.fillText('-R', centerX - 15, centerY + R + 5);

        // R / 2 on graph
        ctx.fillText('R/2', centerX + R / 2, centerY - 5);
        ctx.fillText('R/2', centerX - 15, centerY - R / 2);
        ctx.fillText('-R/2', centerX - R / 2 - 20, centerY - 5);
        ctx.fillText('-R/2', centerX - 15, centerY + R / 2 + 5);

        // X axis
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Y axis
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center point
        ctx.fillText('0', centerX + 5, centerY - 5);
    }

    // Функция рисования точки
    function drawPoint(x, y) {
        ctx.beginPath();
        ctx.arc(centerX + x, centerY - y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'green'; // Цвет точки
        ctx.fill();
    }

    // Обработчик клика по канвасу
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect(); // Получаем координаты канваса
        const x = event.clientX - rect.left - centerX; // Разница между координатами клика и центром
        const y = event.clientY - rect.top - centerY;  // Разница между координатами клика и центром

        // Отправка GET запроса на сервер
        window.location.href=`controller?x=${x}&y=${y}&radius=${R}`
    });

    // Рисуем оси и фигуры при загрузке страницы
    drawAxes();
};
