'use strict';
(function () {
  var CONSTRAINTS_A = {
    min: 6,
    max: 9
  };

  var CONSTRAINTS_AMOUNT = {
    min: 11,
    max: 14
  };

  var containerNumberA = document.querySelector('#number-a');
  var containerNumberB = document.querySelector('#number-b');
  var numberA;
  var numberB;
  var answer;

  // получает случайное число от min до max
  function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getInitialData() {
    numberA = getNumber(CONSTRAINTS_A.min, CONSTRAINTS_A.max);
    var contstraintsB = {
      min: CONSTRAINTS_AMOUNT.min - numberA,
      max: CONSTRAINTS_AMOUNT.max - numberA
    };
    numberB = getNumber(contstraintsB.min, contstraintsB.max);
    answer = numberA + numberB;
    containerNumberA.textContent = numberA;
    containerNumberB.textContent = numberB;
  }

  getInitialData();

  window.initData = {
    numberA: numberA,
    numberB: numberB,
    answer: answer
  };
})();
