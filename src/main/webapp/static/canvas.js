let dots = [];
window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let selectedR = null; // Переменная для хранения выбранного значения R

    // Функция рисования осей и меток
    function drawAxes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const axisScale = 200; // Масштаб для осей (расширили разметку)
        const figureScale = selectedR ? selectedR * 80 : 80; // Масштаб для фигур зависит от R или начального значения

        // Circle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, figureScale / 2, 3 * Math.PI / 2, 0, false);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();

        // Rect
        ctx.beginPath();
        ctx.rect(centerX - figureScale / 2, centerY, figureScale / 2, figureScale);
        ctx.fillStyle = 'blue';
        ctx.fill();

        // Triangle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + figureScale / 2, centerY);
        ctx.lineTo(centerX, centerY + figureScale / 2);
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();

        // Text and ticks for the fixed scale
        ctx.fillStyle = 'black';
        ctx.font = '14px sans-serif';

        // Отображение меток от -3 до 3 с шагом 0.5
        for (let i = -3; i <= 3; i += 0.5) {
            const pos = i * axisScale / 3;
            if (i !== 0) {
                // X axis ticks
                ctx.fillText(i.toFixed(1), centerX + pos - 5, centerY + 20);
                ctx.beginPath();
                ctx.moveTo(centerX + pos, centerY - 5);
                ctx.lineTo(centerX + pos, centerY + 5);
                ctx.stroke();

                // Y axis ticks
                ctx.fillText(i.toFixed(1), centerX - 30, centerY - pos + 5);
                ctx.beginPath();
                ctx.moveTo(centerX - 5, centerY - pos);
                ctx.lineTo(centerX + 5, centerY - pos);
                ctx.stroke();
            }
        }

        // Центр графика
        ctx.fillText('0', centerX + 5, centerY - 5);

        // X axis
        ctx.beginPath();
        ctx.moveTo(20, centerY); // Сдвинули начало оси к краю
        ctx.lineTo(canvas.width - 20, centerY); // Сдвинули конец оси к краю
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // X-axis arrow
        ctx.beginPath();
        ctx.moveTo(canvas.width - 25, centerY - 5);
        ctx.lineTo(canvas.width - 15, centerY);
        ctx.lineTo(canvas.width - 25, centerY + 5);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Y axis
        ctx.beginPath();
        ctx.moveTo(centerX, 20); // Сдвинули начало оси к верху
        ctx.lineTo(centerX, canvas.height - 20); // Сдвинули конец оси к низу
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Y-axis arrow
        ctx.beginPath();
        ctx.moveTo(centerX - 5, 25);
        ctx.lineTo(centerX, 15);
        ctx.lineTo(centerX + 5, 25);
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    // Функция для рисования точки
    function drawPoint(x, y) {
        ctx.beginPath();
        ctx.arc(centerX + x, centerY - y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
    }

    // Функция для отрисовки всех точек
    function drawAllPoints() {
        dots.forEach(function(dot) {
            drawPoint(dot.x, dot.y);
        });
    }

    // Обработчик клика по канвасу
    canvas.addEventListener('click', function(event) {
        if (document.querySelector('input[name="radius"]:checked') === null) {
            showToast("Пожалуйста, выберите значение R перед нажатием на канвас.");
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const clickX = (event.clientX - rect.left - centerX) / 0.83035712;
        const clickY = (centerY - (event.clientY - rect.top)) / 0.85714293;

        const R = selectedR;
        const x = (clickX / (R * 80)) * R; // Увеличили масштаб для точек
        const y = (clickY / (R * 80)) * R;

        // Сохраняем точку в массив
        dots.push({x: clickX, y: clickY});

        // Перерисовываем оси и все точки
        drawAxes();
        drawAllPoints();

        window.location.href = `controller?x=${x.toFixed(8)}&y=${y.toFixed(8)}&radius=${selectedR}`;
    });

    // Обработчик выбора R
    document.querySelectorAll('input[name="radius"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            selectedR = parseFloat(event.target.value);
            drawAxes(); // Перерисовать график с новым значением R
            drawAllPoints(); // Перерисовать все точки
        });
    });

    // Инициализация начальной оси
    drawAxes();
};
