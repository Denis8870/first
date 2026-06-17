/**
 * Імітація серверної сторони (Backend API)
 * Приймає запит, дістає число, обраховує квадрат і повертає JSON відповідь
 */
window.fakeServerAPI = function(jsonData) {
    return new Promise((resolve, reject) => {
        // Імітуємо затримку мережі в 600 мілісекунд (як у реального сервера)
        setTimeout(() => {
            try {
                const requestData = JSON.parse(jsonData);
                const number = parseFloat(requestData.number);

                if (isNaN(number)) {
                    resolve(JSON.stringify({
                        status: "error",
                        message: "Сервер: Надіслані дані не є числом!"
                    }));
                } else {
                    // Серверна сторона: обчислення квадрату числа
                    const squareResult = number * number;
                    
                    resolve(JSON.stringify({
                        status: "success",
                        inputNumber: number,
                        result: squareResult,
                        message: `Сервер успішно порахував: квадрат числа ${number} дорівнює ${squareResult}`
                    }));
                }
            } catch (e) {
                reject(JSON.stringify({ status: "error", message: "Помилка сервера" }));
            }
        }, 600);
    });
};