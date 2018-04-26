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

  var SEGMENT_WIDTH = 39;
  var STARTING_SHIFT = 2;
  var START_COORDS = 0;
  var SECOND_SHIFT = 1;
  var ACCPECT_RATIO_SVG = 0.323; // (svg height / svg width) оригинальные - размеры рисунка
  var vizualizationWrapper = document.querySelector('.visualization__numbers-wrapper');
  var templateArrow = document.querySelector('template');

  var wrapperArrowNumberA = templateArrow.content.querySelector('.visualization__number').cloneNode(true);
  var widthArrowNumberA = numberA * SEGMENT_WIDTH + STARTING_SHIFT;


  var wrapperArrowNumberB = templateArrow.content.querySelector('.visualization__number').cloneNode(true);
  var widthArrowNumberB = numberB * SEGMENT_WIDTH + SECOND_SHIFT;
  var arrowNumberBCoordX = widthArrowNumberA - SECOND_SHIFT;

  var inputA = wrapperArrowNumberA.querySelector('.number-input__input');
  var numberAValue = wrapperArrowNumberA.querySelector('.number-input__value');

  var inputB = wrapperArrowNumberB.querySelector('.number-input__input');
  var numberBValue = wrapperArrowNumberB.querySelector('.number-input__value');

  var inputAnswer = document.querySelector('.answer__input');
  var answerValue = document.querySelector('.answer__value');

  // редактирует толщину стрелки от ее ширины
  function setStrokeArc(width, arrowSvg) {
    var strokeStyle;

    if (width <= 125) {
      strokeStyle = '2px';
    } else if (width > 125 && width <= 160) {
      strokeStyle = '1.5px';
    } else if (width > 160 && width <= 280) {
      strokeStyle = '';
    } else if (width > 280) {
      strokeStyle = '1%';
    }

    arrowSvg.style.strokeWidth = strokeStyle;
  }

  // добавляет элемент с инпутом и стрелкой
  function addVizualizationNumber(element, width, xCoord) {
    var arrow = element.querySelector('.arrow-image');
    vizualizationWrapper.appendChild(element);
    element.style.width = width + 'px';
    element.style.left = xCoord + 'px';
    arrow.style.height = (width * ACCPECT_RATIO_SVG) + 'px';
    setStrokeArc(width, arrow);
  }

  // проверяет введенное число
  function validationInput(input, number) {
    var errorMesage = input.parentNode.parentNode.querySelector('.error-message');

    if (!Number(input.value) && input.value !== '') {
      errorMesage.textContent = 'Ответ должен быть числом';
      input.classList.add('input-error');
      return false;
    }
    errorMesage.textContent = '';
    if (Number(input.value) !== number) {
      input.classList.add('input-error');
      return false;
    } else {
      input.classList.remove('input-error');
      input.classList.add('input-susses');
      return true;
    }
  }

  // ввод данных в инпут числа A
  function onInputAInput() {
    var isInputValid = validationInput(inputA, numberA);
    if (isInputValid) {
      containerNumberA.classList.remove('number--error');
      numberAValue.textContent = numberA;
      initVizualizationNumberB();
    } else {
      containerNumberA.classList.add('number--error');
    }
  }

  // ввод данных в инпут числа B
  function onInputBInput() {
    var isInputValid = validationInput(inputB, numberB);
    if (isInputValid) {
      containerNumberB.classList.remove('number--error');
      numberBValue.textContent = numberB;
      initInputAnswer();
    } else {
      containerNumberB.classList.add('number--error');
    }
  }

  function onInputAnswerInput() {
    var isInputValid = validationInput(inputAnswer, answer);
    if (isInputValid) {
      answerValue.textContent = answer;
    }
  }

  function initVizualizationNumberA() {
    addVizualizationNumber(wrapperArrowNumberA, widthArrowNumberA, START_COORDS);
    inputA.focus();
    inputA.addEventListener('input', onInputAInput);
  }

  function initVizualizationNumberB() {
    addVizualizationNumber(wrapperArrowNumberB, widthArrowNumberB, arrowNumberBCoordX);
    inputB.focus();
    inputB.addEventListener('input', onInputBInput);
  }

  function initInputAnswer() {
    answerValue.textContent = '';
    inputAnswer.value = '';
    inputAnswer.classList.remove('answer__input--disabled');
    inputAnswer.focus();
    inputAnswer.addEventListener('input', onInputAnswerInput);
  }

  setTimeout(initVizualizationNumberA, 1000);
})();
