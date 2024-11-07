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
    event.preventDefault(); // Отменяет стандартное поведение кнопки

        // Get X
        const xSelect = document.querySelector('input[name="x"]:checked');
        if (!xSelect) {
            showToast("Выберите значение X.");
            return; // Если не выбрано X, прерываем выполнение
        }

        // Get Y
        const yInput = document.getElementById("y-input").value.replace(",", ".");

        // Get R
        const rSelect = document.querySelector('input[name="radius"]:checked');
        if (!rSelect) {
            showToast("Выберите значение R.");
            return; // Если не выбрано R, прерываем выполнение
        }

        // Validate Y
        if (!isValidY(yInput)) {
            showToast("Неверное значение Y. Оно должно быть числом от -3 до 3, а число знаков после запятой не должно превышать 10.");
            return; // Если Y неверное, прерываем выполнение
        }

        event.target.submit();
    });

    function isValidY(value) {
        const y = parseFloat(value);
        return !isNaN(y) && y >= -3 && y <= 3;
    }
});
