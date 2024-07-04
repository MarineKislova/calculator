window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // CALCULATOR
  let bsc = ""; // second number for screen
  let sign = ""; // знак операции
  let finish = false; // finish calculation

  const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const operator = ["+", "-", "*", "/"];
  const displayScreen = document.querySelector("#displayscreen");
  const displayResult = document.querySelector("#displayresult");
  let digits = document.querySelectorAll("#digital");

  // displayScreen.value = "start calculate";
  // console.log(display.value);

  function clearAll() {
    sign = "";
    finish = false;
    displayScreen.value = "";
    displayResult.value = "";
    // screen.textContent = "0"; // для div
  }

  document.querySelector("#clearAll").onclick = clearAll;

  function backspace() {
    displayScreen.value = displayScreen.value.slice(0, -1);
    displayResult.value = displayResult.value.slice(0, -1);
    
  }

  document.querySelector("#backspace").addEventListener("click", backspace);

  function calc() {
    let result = eval(displayScreen.value);

    displayResult.value = result;
    if (result === Infinity) {
      displayResult.value = "На ноль делить нельзя!";
      displayResult.style = "color: red;";
    }
    if (result === NaN) {
      displayResult.value = "Ошибка!";
    }
    if (result === undefined) {
      displayResult.value = "Ошибка!";
    }
    console.log(displayResult.value);
  }

  document.querySelector(".calc").addEventListener("click", calc);

  digits.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      //нажата кнопка калькулятора All Clear / C
      if (e.target.classList.contains("#clearAll")) return;

      // очищаем display
      // displayScreen.value = "";

      let digitValue = digits[i].value;

      // operator.forEach((item) => {
      //   if (digitValue === item) {
      //     sign = item;
      //   }
      // });
      displayScreen.value += digitValue;
      displayResult.value += digitValue;

      

      console.log(digitValue);
    });
  });

  window.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "Backspace") {
      backspace();
    }
    if (e.key === "Enter") {
      calc();
    }
    if (e.key === "Escape") {
      clearAll();
    }
  });

  //end DOMContentLoaded
});
