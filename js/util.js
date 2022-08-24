// Генерация случайного числа

function randomNumber(min, max){

  if (min > max) {
    throw new Error('Максимальное значение меньше минимального или они равны');
  }

  if (min < 0) {
    throw new Error('Максимальное значение меньше минимального или они равны');
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random()*(max-min+1) + min);
}

// Проверка длинны строки

function checkMaxLength (line = '', maxLength = 0) {
  line = String(line);

  const lineLength = line.length;

  if (lineLength > maxLength) {
    return false;
  }

  return true;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

// Сообщение с ошибкой

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

// Функция ожидания 500мс до ответа на действие
function debounce(func, wait) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout); // clearTimeout сбрасывает ожидание при каждом выполнении функции.
    timeout = setTimeout(() => { func.apply(context, args); }, wait); // Перезапускаем период ожидания debounce.
    timeout();
  };
}


export {randomNumber, checkMaxLength, isEscapeKey, showAlert, debounce};
