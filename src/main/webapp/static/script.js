function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
        toast.textContent = "";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-1");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Отменяет стандартное поведение формы

        // Получаем все отмеченные значения X
        const selectedX = Array.from(document.querySelectorAll('input[name="x"]:checked')).map(input => input.value);
        if (selectedX.length === 0) {
            showToast("Выберите хотя бы одно значение X.");
            return;
        }

        // Получаем значение Y
        const yInput = document.getElementById("y-input").value.replace(",", ".");
        if (!isValidY(yInput)) {
            showToast("Неверное значение Y. Оно должно быть числом от -3 до 3, а число знаков после запятой не должно превышать 10.");
            return;
        }

        // Получаем все отмеченные значения R
        const selectedR = Array.from(document.querySelectorAll('input[name="radius"]:checked')).map(input => input.value);
        if (selectedR.length === 0) {
            showToast("Выберите хотя бы одно значение R.");
            return;
        }

        selectedX.forEach(x => {
            selectedR.forEach(radius => {
                window.open( `controller?x=${x}&y=${parseFloat(yInput)}&radius=${radius}`, '_blank');
            })
        })
    })


    function isValidY(value) {
        const y = parseFloat(value);
        return !isNaN(y) && y >= -3 && y <= 3;
    }
    document.getElementById("clear").addEventListener("click", function(event) {
        localStorage.clear();
    })

    });
