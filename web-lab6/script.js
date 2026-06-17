document.addEventListener("DOMContentLoaded", () => {
    
    // Прив'язка подій до кнопок інтерфейсу
    document.getElementById('btn-lang-task').addEventListener('click', runLanguageTask);
    document.getElementById('btn-oop-task').addEventListener('click', runPowerGridTask);

    // ==========================================
    // ЗАВДАННЯ 1: Багатомовний календар (Об'єкти)
    // ==========================================
    
    // Єдиний об'єкт, який містить усю лінгвістичну інформацію
    const localizationData = {
        ua: {
            questionDay: "Введіть номер дня неділі від 1 до 7?",
            errorInput: "Неправильний ввід даних!",
            days: {
                1: "Понеділок",
                2: "Вівторок",
                3: "Середа",
                4: "Четвер",
                5: "П'ятниця",
                6: "Субота",
                7: "Неділя"
            }
        },
        en: {
            questionDay: "Enter the day number of the week (from 1 to 7)?",
            errorInput: "Incorrect data input!",
            days: {
                1: "Monday",
                2: "Tuesday",
                3: "Wednesday",
                4: "Thursday",
                5: "Friday",
                6: "Saturday",
                7: "Sunday"
            }
        }
    };

    function runLanguageTask() {
        let lang = "";
        
        // Цикл для вибору мови (працює, поки не введуть правильно)
        while (true) {
            let inputLang = prompt("Виберіть мову “ua” або “en”?");
            if (inputLang === null) return; // Скасування
            
            lang = inputLang.toLowerCase().trim();
            if (lang === "ua" || lang === "en") {
                break; // Мова правильна, виходимо з циклу
            }
            alert("Неправильний ввід даних! Спробуйте ще раз. / Incorrect input! Try again.");
        }

        const currentLangConfig = localizationData[lang];
        let dayNumber;

        // Цикл для вибору дня тижня
        while (true) {
            let inputDay = prompt(currentLangConfig.questionDay);
            if (inputDay === null) return; // Скасування

            dayNumber = parseInt(inputDay);
            if (!isNaN(dayNumber) && dayNumber >= 1 && dayNumber <= 7) {
                break; // Номер правильний
            }
            alert(currentLangConfig.errorInput);
        }

        // Отримання результату з об'єкта
        const resultDay = currentLangConfig.days[dayNumber];
        
        // Виведення результату
        alert(resultDay);
        document.getElementById('res-1').innerText = `Обрана мова: ${lang.toUpperCase()}\nНомер дня: ${dayNumber}\nРезультат: ${resultDay}`;
    }


    // ==========================================
    // ЗАВДАННЯ 2: Енергомережа міста (ООП підхід)
    // ==========================================

    // Базовий суперклас для всіх елементів мережі
    class GridElement {
        constructor(name) {
            this.name = name;
        }
        getOutputDay() { return 0; }   // Позитивне число - виробляє, негативне - споживає
        getOutputNight() { return 0; }
    }

    // 1. Електростанції
    class PowerPlant extends GridElement {
        constructor(name, powerMW) {
            super(name);
            // Валідація за умовою: від 1 до 100 МВт
            this.powerMW = Math.max(1, Math.min(100, powerMW));
        }
        getOutputDay() { return this.powerMW; }
        getOutputNight() { return this.powerMW; }
    }

    // 2. Сонячні панелі
    class SolarPanel extends GridElement {
        constructor(name, dayPowerMW) {
            super(name);
            // Валідація за умовою: від 1 до 5 МВт вдень
            this.dayPowerMW = Math.max(1, Math.min(5, dayPowerMW));
        }
        getOutputDay() { return this.dayPowerMW; }
        getOutputNight() { return 0; } // Вночі не генерують
    }

    // 3. Житлові будинки
    class ResidentialBuilding extends GridElement {
        constructor(name, apartmentsCount) {
            super(name);
            // Валідація за умовою: від 1 до 400 квартир
            this.apartmentsCount = Math.max(1, Math.min(400, apartmentsCount));
        }
        // Споживання переводимо з кВт у МВт (1 МВт = 1000 кВт)
        // Тому споживання повертаємо як від'ємне значення
        getOutputDay() {
            return -((this.apartmentsCount * 4) / 1000);
        }
        getOutputNight() {
            return -((this.apartmentsCount * 1) / 1000);
        }
    }

    // 4. Лінії електропередачі (ЛЕП) у інші міста
    class PowerLine {
        constructor(name, maxCapacityMW, pricePerMW) {
            this.name = name;
            this.maxCapacityMW = maxCapacityMW; // Скільки МВт максимум може пропустити
            this.pricePerMW = pricePerMW;       // Ціна за 1 МВт
        }
    }

    function runPowerGridTask() {
        // Створюємо список елементів нашого міста (набір тестових даних)
        const infrastructure = [
            new PowerPlant("ТЕС-1", 60),          // +60 МВт і вдень, і вночі
            new PowerPlant("ГЕС-2", 25),          // +25 МВт і вдень, і вночі
            new SolarPanel("СЕС Полісся", 4),     // +4 МВт вдень, 0 вночі
            new SolarPanel("СЕС Дачна", 2),       // +2 МВт вдень, 0 вночі
            new ResidentialBuilding("ЖК Центр", 300),  // День: -1.2 МВт, Ніч: -0.3 МВт
            new ResidentialBuilding("Мікрорайон 3", 400), // День: -1.6 МВт, Ніч: -0.4 МВт
            new ResidentialBuilding("Приватний сектор", 150) // День: -0.6 МВт, Ніч: -0.15 МВт
        ];

        // Доступні ЛЕП для закупівлі/продажу (відсортовані за вигодою)
        const powerLines = [
            new PowerLine("ЛЕП-Схід (Закупівля/Продаж)", 50, 1200), // 1200 грн за МВт
            new PowerLine("ЛЕП-Захід (Резервна)", 20, 1500)         // 1500 грн за МВт (дорожча)
        ];

        // 1. Рахуємо внутрішній баланс міста
        let totalDayBalance = 0;
        let totalNightBalance = 0;

        infrastructure.forEach(element => {
            totalDayBalance += element.getOutputDay();
            totalNightBalance += element.getOutputNight();
        });

        // Функція для розрахунку комерційної операції по ЛЕП
        function calculateTrade(balance, lines) {
            let remainingBalance = balance;
            let financialResult = 0;
            let logDetails = "";

            if (remainingBalance > 0) {
                logDetails += `   Надлишок енергії: +${remainingBalance.toFixed(2)} МВт. Намагаємось ПРОДАТИ.\n`;
                // Для продажу сортуємо ЛЕП від найдорожчої до найдешевшої (щоб продати дорожче)
                let exportLines = [...lines].sort((a, b) => b.pricePerMW - a.pricePerMW);
                
                for (let line of exportLines) {
                    if (remainingBalance <= 0) break;
                    let amountToExport = Math.min(remainingBalance, line.maxCapacityMW);
                    let profit = amountToExport * line.pricePerMW;
                    financialResult += profit;
                    remainingBalance -= amountToExport;
                    logDetails += `   -> Через [${line.name}] продано ${amountToExport.toFixed(2)} МВт по ${line.pricePerMW} грн/МВт. Прибуток: +${profit.toFixed(2)} грн.\n`;
                }
                if (remainingBalance > 0) {
                    logDetails += `   ⚠️ Увага: Не вдалося продати ще ${remainingBalance.toFixed(2)} МВт через обмежену потужність ЛЕП!\n`;
                }
            } else if (remainingBalance < 0) {
                let neededEnergy = Math.abs(remainingBalance);
                logDetails += `   Дефіцит енергії: -${neededEnergy.toFixed(2)} МВт. Необхідно ЗАКУПИТИ.\n`;
                // Для закупівлі сортуємо ЛЕП від найдешевшої до найдорожчої (щоб купити дешевше)
                let importLines = [...lines].sort((a, b) => a.pricePerMW - b.pricePerMW);

                for (let line of importLines) {
                    if (neededEnergy <= 0) break;
                    let amountToImport = Math.min(neededEnergy, line.maxCapacityMW);
                    let cost = amountToImport * line.pricePerMW;
                    financialResult -= cost; // витрати
                    neededEnergy -= amountToImport;
                    logDetails += `   -> Через [${line.name}] закуплено ${amountToImport.toFixed(2)} МВт по ${line.pricePerMW} грн/МВт. Витрати: ${cost.toFixed(2)} грн.\n`;
                }
                if (neededEnergy > 0) {
                    logDetails += `   🚨 КРИЗА: Не вистачило потужності ЛЕП для закупівлі ще ${neededEnergy.toFixed(2)} МВт! Місто знеструмлене!\n`;
                }
            } else {
                logDetails += "   Мережа в ідеальному балансі. Торгівля не потрібна.\n";
            }

            return { financialResult, logDetails, leftOver: remainingBalance };
        }

        // Розрахунок для дня і ночі
        const dayTrade = calculateTrade(totalDayBalance, powerLines);
        const nightTrade = calculateTrade(totalNightBalance, powerLines);

        // Формування фінального текстового звіту
        let report = `=== ЗВІТ ЕНЕРГОБАЛАНСУ МІСТА ===\n\n`;
        report += `☀️ ДЕННИЙ СТАН:\n`;
        report += `   Внутрішній баланс: ${totalDayBalance.toFixed(2)} МВт\n`;
        report += dayTrade.logDetails;
        report += `   Фінансовий підсумок дня: ${dayTrade.financialResult >= 0 ? '+' : ''}${dayTrade.financialResult.toFixed(2)} грн.\n\n`;

        report += `🌙 НІЧНИЙ СТАН:\n`;
        report += `   Внутрішній баланс: ${totalNightBalance.toFixed(2)} МВт\n`;
        report += nightTrade.logDetails;
        report += `   Фінансовий підсумок ночі: ${nightTrade.financialResult >= 0 ? '+' : ''}${nightTrade.financialResult.toFixed(2)} грн.\n\n`;
        
        let totalFinance = dayTrade.financialResult + nightTrade.financialResult;
        report += `📊 ЗАГАЛЬНИЙ ДОБОВИЙ БАЛАНС:\n`;
        report += `   Фінансовий результат доби: ${totalFinance >= 0 ? 'ПРИБУТОК' : 'ЗБИТОК/ВИТРАТИ'} ${totalFinance.toFixed(2)} грн.`;

        // Виведення в інтерфейс
        document.getElementById('res-2').innerText = report;
    }

});