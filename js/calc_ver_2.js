window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // CALCULATOR
  let sign = ""; // знак операции
  let signOP = ""; //знак операции при вводе с клавиатуры
  let digitAdd = "";
  let percentValue = ""; // процентное значение
  let digitsValue = "";

  const operator = ["*", "/", "+", "-", "%", "^", "="];
  let per = "%";
  const digit = ["0", "1", "2", "3", "4", "5", "6'", "7", "8", "9", "."];
  const displayScreen = document.querySelector("#displayscreen");
  const displayResult = document.querySelector("#displayresult");

  const numA = document.querySelector("#numA");
  const numB = document.querySelector("#numB");
  const numC = document.querySelector("#numC");
  const screen = document.querySelector("#screen");
  const percentScreen = document.querySelector("#percentscreen");
  let digits = document.querySelectorAll("#digital");
  let op = document.querySelectorAll("#op");
  let dot = document.querySelector("#dot");

  //сброс данный с экрана
  function clearDisplay() {
    sign = "";
    // finish = false;
    displayScreen.value = "";
    displayResult.value = "";
    numA.value = "";
    numB.value = "";
    numC.value = "";
    // screen.value = "";
    percentScreen.value = "";
    displayScreen.style.display = "block";
    percentScreen.style.display = "none";
  }

  document.querySelector("#clearAll").onclick = clearDisplay;

  //очистка символов с экрана
  function backspace() {
    displayScreen.value = displayScreen.value.slice(0, -1);
    displayResult.value = displayResult.value.slice(0, -1);
    numA.value = "";
    numB.value = "";
    numC.value = "";
    // screen.value = "";
    percentScreen.value = "";

    // percentScreen.style.display = "none";
  }
  document.querySelector("#backspace").addEventListener("click", backspace);

  // ввод данных на экран

  digits.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      if (displayScreen.value.length >= 10) return; // ограничение на количество цифр в поле

      // if (displayScreen.value === "0" && digitsValue === "0") return; // если на экране 0 и нажата еще 0, то не выводить новую цифру

      digitsValue = digits[i].value;
      displayScreen.value += digitsValue;

      if (numA.value !== NaN && sign === "") {
        numA.value = displayScreen.value;
      } else if (numA.value !== NaN && sign !== "") {
        numB.value += digitsValue;
      }

      if (
        (numA.value !== NaN && numB.value !== NaN && sign === "+") ||
        sign === "-"
      ) {
        percentValue = +numA.value * +numB.value * 0.01;
        numC.value = percentValue;
      } else {
        percentValue = +numB.value * 0.01;
        numC.value = percentValue;
      }
    });
  });

  op.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      if (operator.includes(item.value)) {
        sign = item.value;
        displayScreen.value += item.value;
        console.log(sign);
      }
    });
  });

  displayScreen.addEventListener("input", (e) => {
    // if (e.target.value === "") {
    //   e.target.value = displayScreen.value;
    // }

    if (operator.includes(e.target.value)) {
      signOP = e.target.value;
      console.log(signOP);
    }

    if (digit.includes(e.target.value) && e.target.value !== ".") {
      digitAdd += +e.target.value;
      console.log(digitAdd);
    }

    if (e.target.value.includes("%")) {
      displayScreen.value = displayScreen.value.replace("%", "");
      displayScreen.value = displayScreen.value.replace(Number, "");
      percentScreen.value = displayScreen.value + "%";
      // displayResult.value = displayScreen.value;
    }
    if (numA.value !== NaN && signOP === "") {
      numA.value = displayScreen.value;
      console.log(+numA.value);
      console.log(typeof +numA.value);
    } else if (numA.value !== NaN && signOP !== "") {
      numB.value += +digitAdd;
    }
  });

  //отдельное вычисление после знака %
  let result;

  function percentOperation() {
    numB.value = +numC.value;
    percentScreen.value = displayScreen.value + "%";
    // displayResult.value = result.toFixed(2);

    if (numB.value === "" && sign !== "%") {
      percentScreen.style.display = "none";
      displayScreen.style.display = "block";
    } else {
      percentScreen.style.display = "block";
      percentScreen.value = displayScreen.value + "%";
      displayScreen.style.display = "none";
    }
  }

  document
    .querySelector(".percent")
    .addEventListener("click", percentOperation);

  //выполнение вычислений

  function calc() {
    if (
      (numA.value !== NaN && sign !== "" && numB.value === "") ||
      (numA.value === "" && sign !== "" && numB.value === "" && numC === "") ||
      (numA.value !== "" && sign === "" && numB.value === "")
    ) {
      displayResult.value = "Проверьте введенные данные";
      displayResult.style.color = "#4682B4";

      numA.value = "";
      numB.value = "";
      numC.value = "";
      sign = "";
      return;
    }
    switch (sign) {
      case "+":
        result = +numA.value + +numB.value;
        console.log(displayResult.value);

        break;
      case "-":
        result = +numA.value - +numB.value;
        break;
      case "*":
        result = (+numA.value * +numB.value).toFixed(3);
        break;
      case "/":
        if (numB.value === "0") {
          displayResult.value = "На ноль делить нельзя!";
          displayResult.style.color = "#CD5C5C";
          numA.value = "";
          numB.value = "";
          numC.value = "";
          sign = "";
          return;
        }
        result = (+numA.value / +numB.value).toFixed(3);
        break;
      case "^":
        result = Math.pow(+numA.value, +numB.value);
        break;

      default:
        break;
    }

    displayResult.value = parseFloat(result);

    numA.value = "";
    numB.value = "";
    numC.value = "";
    sign = "";
    // return;
  }

  document.querySelector(".calc").addEventListener("click", calc);

  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     calc();
  //   }
  //   if (e.key === "Backspace") {
  //     backspace();
  //   }
  //   if (e.key === "Escape") {
  //     clearDisplay();
  //   }
  //   // if (e.key === "16" && e.key === "53") {
  //   //   percentOperation();
  //   // }
  // });

  // end DOMContentLoaded
});
