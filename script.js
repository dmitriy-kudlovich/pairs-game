const input = document.querySelector("#input");
const buttonCreate = document.querySelector("#buttonCreate");
const pairs = document.querySelector("#pairs");
const figures = []; // Массив чисел, каждое из которых будет записано в квадрат на игровом поле
const win = document.querySelector("#win");
let arr = []; // массив для проверки совпадений
let countResult = 0; // счётчик правильно отгаданных пар

// Функция для распределения элементов массива в случайном порядке
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Создаём игровое поле
function create(count) {
  let countFigure = 0; // переменная для индекса массива figures; нужна, чтобы в каждый квадрат записать значение из массива figures.
  let countIndex = 0; // переменная для data-атрибута, который будет присвоен каждому квадрату на игровом поле, чтобы  нажатие на один и тот же квадрат игра не определяла, как совпадение.

  // Записываем в массив figures числа, которые потом запишем в квадраты на игровом поле
  for (let i = 1; i <= count * (count / 2); i++) {
    figures.push(i, i);
  }
  shuffle(figures); // перемешиваем элементы массива figures в случайном порядке по функции Фишера-Йетса

  // Отрисовка игрового поля
  let pairsContainer = document.createElement("div");
  pairsContainer.className = "pairsContainer";

  for (let i = 0; i < count; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let k = 0; k < count; k++) {
      let pairUnit = document.createElement("div");
      pairUnit.className = "pair__unit";
      pairUnit.innerHTML = figures[countFigure];
      pairUnit.setAttribute("data-index", countIndex);

      pairUnit.addEventListener("click", () => {
        check(pairUnit);
      });

      countFigure++;
      countIndex++;
      row.append(pairUnit);
    }
    pairsContainer.append(row);
  }
  //-- Отрисовка игрового поля

  return pairsContainer;
}

// Функция для проверки пар при нажатии на квадраты
function check(elem) {
  elem.classList.add("pair__unit--active--temp");

  arr.push(elem);

  if (
    arr.length == 2 &&
    arr[0].innerHTML == arr[1].innerHTML &&
    arr[0].getAttribute("data-index") != arr[1].getAttribute("data-index")
  ) {
    countResult++;
    arr[0].classList.add("pair__unit--active");
    arr[1].classList.add("pair__unit--active");
    arr[0].classList.remove("pair__unit--active--temp");
    arr[1].classList.remove("pair__unit--active--temp");
    arr = [];
  } else if (arr.length > 2) {
    let pair__unit = document.querySelectorAll(".pair__unit");
    pair__unit.forEach((item) => {
      item.classList.remove("pair__unit--active--temp");
    });
    arr = [];
  }

  if (countResult == figures.length / 2) {
    win.classList.add("active");
  }
}

// Функция для старта игры
function start() {
  pairs.innerHTML = "";
  figures.length = 0;
  countResult = 0;
  arr = []; // очищаем массив для проверки совпадений
  let val = +input.value; // Значение из инпута
  win.classList.remove("active");
  if (val % 2 == 0 && val >= 2 && val <= 10) {
    pairs.append(create(val));
  } else {
    pairs.append(create(4));
  }

  input.value = "";
}

// Кнопка для старта игры
buttonCreate.addEventListener("click", () => {
  buttonCreate.innerHTML = "Играть снова";
  start();
});
