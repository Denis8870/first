document.getElementById("sendBtn").addEventListener("click", () => {
    const inputField = document.getElementById("numberInput");
    const resultBox = document.getElementById("result");
    const value = inputField.value;

    if (value === "") {
        resultBox.innerText = "Будь ласка, введіть число перед відправкою.";
        return;
    }

    resultBox.innerText = "Надсилання AJAX запиту на сервер...";

    // Формуємо дані для відправки на сервер у форматі JSON
    const dataToSend = JSON.stringify({ number: value });

    // Виконуємо асинхронний AJAX запит до нашого "сервера"
    window.fakeServerAPI(dataToSend)
        .then(responseRaw => {
            // Отримуємо відповідь від сервера та парсимо JSON
            const serverResponse = JSON.parse(responseRaw);

            if (serverResponse.status === "success") {
                // Виводимо текстову інформацію про квадрат числа на фронтенді
                resultBox.style.borderLeftColor = "#06b6d4";
                resultBox.innerText = serverResponse.message;
            } else {
                resultBox.style.borderLeftColor = "#ef4444";
                resultBox.innerText = serverResponse.message;
            }
        })
        .catch(error => {
            resultBox.style.borderLeftColor = "#ef4444";
            resultBox.innerText = "Помилка з'єднання з сервером.";
            console.error(error);
        });
});