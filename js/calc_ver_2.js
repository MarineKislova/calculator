window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // CALCULATOR
  let sign = ""; // знак операции
  let finish = false; // finish calculation

  const operator = ["*", "/", "+", "-", "%", "^", "="];
  const digit = ["0", "1", "2", "3", "4", "5", "6'", "7", "8", "9", "."];
  const displayScreen = document.querySelector("#displayscreen");
  const displayResult = document.querySelector("#displayresult");
  const numA = document.querySelector("#numA");
  const numB = document.querySelector("#numB");
  let digits = document.querySelectorAll("#digital");
  let op = document.querySelectorAll("#op");

  //   displayScreen.value = "start calculate";

  //сброс данный с экрана
  function clearDisplay() {
    // sign = "";
    finish = false;
    displayScreen.value = "";
    displayResult.value = "";
    numA.value = "";
    numB.value = "";
  }

  document.querySelector("#clearAll").onclick = clearDisplay;

  //очистка символов с экрана
  function backspace() {
    displayScreen.value = displayScreen.value.slice(0, -1);
    displayResult.value = displayResult.value.slice(0, -1);
  }
  document.querySelector("#backspace").addEventListener("click", backspace);

  // ввод данных на экран

  digits.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      //нажата кнопка калькулятора All Clear / C
      if (e.target.classList.contains("#clearAll")) return;

      let digitValue = +digits[i].value;
      console.log(digitValue);
      console.log(typeof digitValue);

      // operator.forEach((item) => {
      //   if (digitValue === item) {
      //     sign = item;
      //   }
      // });
      displayScreen.value += digitValue;
      //   e.preventDefault();
      if (numA.value !== 0 && sign === "") {
        numA.value = displayScreen.value;
      } else if (numA.value !== "" && sign !== "") {
        numB.value += digitValue;
      }
    });
  });

  op.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      if (operator.includes(item.value)) {
        sign = item.value;
        displayScreen.value += item.value;
        finish = true;
        console.log(sign);
      }
      if (sign === "%" && sign === "+") {
        // numA.value = +numA.value / 100;
        let a = +numB.value.slice(0, -1) / 100;
        console.log(a);
        
        result = +numA.value + a;
        // displayScreen.value += item.value;
        // finish = true;
        console.log(sign);
      }
    });
  });

  //выполнение вычислений
  let result;

  function calc() {
    switch (sign) {
      case "+":
        result = +numA.value + +numB.value;
        break;
      case "-":
        result = +numA.value - +numB.value;
        // console.log(result);
        break;
      case "*":
        result = +numA.value * +numB.value;
        // console.log(result);
        break;
      case "/":
        result = +numA.value / +numB.value;
        // console.log(result);
        break;
      case "^":
        result = Math.pow(+numA.value, +numB.value);
        // console.log(result);
        break;
      // case "%":
      // result = +numA.value % +numB.value;
      // console.log(result);
      // break;
    }
    console.log(result);
    displayResult.value = result;
    // numA.value = "";
    // numB.value = "";
    // displayScreen.value = result;
    console.log(typeof displayResult.value);
    finish = true;
  }

  document.querySelector(".calc").addEventListener("click", calc);

  // end DOMContentLoaded
});
