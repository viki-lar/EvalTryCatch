// создана функция, которая принимает тип и множество значений
const filterByType = (type, ...values) =>
    //создается новый массив из значений, которые соответствуют выбранному типу
    values.filter((value) => typeof value === type),
  // создана функция, которая создает массив из элементов с результатами
  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );

    // каждый элемент массива скрывается
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  //создана функция, которая принимает блок, сообщение и span
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //скрывается блок с результатами
    hideAllResponseBlocks();
    // переданный в функцию блок становится выдимым
    document.querySelector(blockSelector).style.display = "block";
    // если существует переданный в функцию span с id, то в текстконтент передается сообщение
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  // функция вывода сообщения принимает текст
  showError = (msgText) =>
    //функция ищет блок с классом ...error и в span с id #error передает сообщение
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  //функция ищет блок с классом ...ok и в span с id #ok передает сообщение
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  //функция ищет блок с классом и не выводит сообщение
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  // создана функция, которая принимает тип и значение
  tryFilterByType = (type, values) => {
    try {
      //создан массив из значений,которые соответствуют выбранному типу и превращен в строку
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");

      //если строка существует,  то вывод сообщения о типе данных и их значения
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : // если не передана, то сообщение об остутствии данных такого типа
          `Отсутствуют данные типа ${type}`;
      // вывод сообщения об успехе
      showResults(alertMsg);
    } catch (e) {
      //вывод сообщения об ошибке
      showError(`Ошибка: ${e}`);
    }
  };

// поиск кнопкт по id
const filterButton = document.querySelector("#filter-btn");

//на кнопку повешен слушатель по клику
filterButton.addEventListener("click", (e) => {
  // получен select по id
  const typeInput = document.querySelector("#type");
  // получен input по id
  const dataInput = document.querySelector("#data");

  // если пустой ввод, выходит сообщение об ошибке
  if (dataInput.value === "") {
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    //результаты не показываются
    showNoResults();
  }
  // если есть данные, то сообщение об ошибке не выходит
  else {
    dataInput.setCustomValidity("");
    //стандартное поведение прерывается
    e.preventDefault();
    //вызов функции, и удаление лишних пробелов у аргументов
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
