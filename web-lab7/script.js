document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById('btn-time').addEventListener('click', showFormattedTime);
    document.getElementById('btn-game').addEventListener('click', runGuessNumberGame);

    // ==========================================
    // ЗАВДАННЯ 1: Форматування дати та часу
    // ==========================================
    function getFormattedDate() {
        const now = new Date();

        // Отримуємо компоненти часу з додаванням ведучого нуля
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Масиви для української локалізації
        const daysOfWeek = [
            "неділя", "понеділок", "вівторок", "середа", 
            "четвер", "п'ятниця", "субота"
        ];
        
        const months = [
            "січня", "лютого", "березня", "квітня", "травня", "червня",
            "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
        ];

        const day = String(now.getDate()).padStart(2, '0');
        const dayName = daysOfWeek[now.getDay()];
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();

        // Склеюємо рядок за шаблоном: 09:15:56, середа , 06 травня 2025 року
        return `${hours}:${minutes}:${seconds}, ${dayName}, ${day} ${monthName} ${year} року`;
    }

    function showFormattedTime() {
        const formatted = getFormattedDate();
        console.log("Поточний час: " + formatted);
        document.getElementById('res-time').innerText = formatted;
    }


    // ==========================================
    // ЗАВДАННЯ 2: Гра "Вгадай число"
    // ==========================================
    
    // Допоміжна функція для отримання короткого штампу часу для логування спроб
    // Формат: ДД.ММ.РРРР ЧЧ:ММ:СС
    function getLogTimestamp() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Місяці починаються з 0
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    function runGuessNumberGame() {
        let playAgain = true;
        let gameSummary = "";

        console.clear();
        console.log("--- СТАРТ ГРИ: ВГАДАЙ ЧИСЛО ---");

        while (playAgain) {
            // Геренуємо випадкове число від 0 до 50 включно
            const targetNumber = Math.floor(Math.random() * 51);
            let attempts = 0;
            let guessedRight = false;
            
            // Тимчасовий лог для розробника (щоб знати загадане число під час тестів)
            console.log(`(Загадане число для цієї сесії: ${targetNumber})`);

            while (!guessedRight) {
                let userInput = prompt("Вгадайте число від 0 до 50:");
                
                // Якщо користувач натиснув "Скасувати" у вікні prompt
                if (userInput === null) {
                    alert("Гру перервано.");
                    document.getElementById('res-game').innerText = "Гру було скасовано користувачем.";
                    return;
                }

                let userNumber = parseInt(userInput.trim());

                // Перевірка на валідність введення
                if (isNaN(userNumber) || userNumber < 0 || userNumber > 50) {
                    alert("Будь ласка, введіть коректне число в діапазоні від 0 до 50!");
                    continue;
                }

                attempts++;

                if (userNumber === targetNumber) {
                    guessedRight = true;
                    const successMessage = `За ${attempts} спроб ви вгадали число ${targetNumber}.`;
                    alert(successMessage);
                    
                    gameSummary += `• Загадане число: ${targetNumber} (Вгадано за ${attempts} спроб)\n`;
                } else {
                    // Вираховуємо абсолютне відхилення від цілі
                    const difference = Math.abs(targetNumber - userNumber);
                    let hint = "";

                    // Визначаємо рівень відхилення за фразами
                    if (difference <= 3) {
                        hint = "гаряче";
                    } else if (difference <= 10) {
                        hint = "тепло";
                    } else {
                        hint = "холодно";
                    }

                    // Виводимо підказку користувачу
                    alert(`Не вгадали! Підказка: ${hint.toUpperCase()}`);

                    // Логування кожної спроби в консоль за шаблоном
                    console.log(`${getLogTimestamp()} Спроба ${attempts}: число ${userNumber} – не вірно (${hint})`);
                }
            }

            // Запитуємо про повтор гри
            playAgain = confirm("Бажаєте зіграти ще раз?");
        }

        console.log("--- ГРУ ЗАВЕРШЕНО ---");
        document.getElementById('res-game').innerText = `Історія ваших перемог у цій сесії:\n${gameSummary}`;
    }

});