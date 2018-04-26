'use strict';
(function () {
  var SEGMENT_WIDTH = 39;
  var STARTING_SHIFT = 2;
  var START_COORDS = 0;
  var SECOND_SHIFT = 1;

  var templateArrow = document.querySelector('template');
  var widthA = window.initData.numberA * SEGMENT_WIDTH + STARTING_SHIFT;
  var widthB = window.initData.numberB * SEGMENT_WIDTH + SECOND_SHIFT;
  var arrowNumberBCoordX = widthA - SECOND_SHIFT;


  var containerNumberA = document.querySelector('#number-a');
  var containerNumberB = document.querySelector('#number-b');

  var inputAnswer = document.querySelector('.answer__input');
  var answerValue = document.querySelector('.answer__value');

  function NumberObject(number, container, width, cb, startX) {
    this.number = number;
    this.containerNumber = container;
    this.wrapperArrow = templateArrow.content.querySelector('.visualization__number').cloneNode(true);
    this.widthArrow = width;
    this.input = this.wrapperArrow.querySelector('.number-input__input');
    this.inputNumber = this.wrapperArrow.querySelector('.number-input__value');
    this.cb = cb;
    this.startX = startX;
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

  // обработчик события input для чисел
  NumberObject.prototype.onInputNumberInput = function () {
    var isInputValid = validationInput(this.input, this.number);
    if (isInputValid) {
      this.containerNumber.classList.remove('number--error');
      this.inputNumber.textContent = this.number;
      this.cb();
    } else {
      this.containerNumber.classList.add('number--error');
    }
  };

  // добавляет элементы со стрелкой и инпутом
  NumberObject.prototype.initVizualizationNumber = function () {
    var obj = this;
    window.arrow.addVizualizationNumber(obj.wrapperArrow, obj.widthArrow, obj.startX);
    obj.input.focus();
    obj.input.addEventListener('input', obj.onInputNumberInput.bind(obj));
  };

  var objB = new NumberObject(window.initData.numberB, containerNumberB, widthB, initInputAnswer, arrowNumberBCoordX);
  var objA = new NumberObject(window.initData.numberA, containerNumberA, widthA, objB.initVizualizationNumber.bind(objB), START_COORDS);

  function onInputAnswerInput() {
    var isInputValid = validationInput(inputAnswer, window.initData.answer);
    if (isInputValid) {
      answerValue.textContent = window.initData.answer;
    }
  }

  function initInputAnswer() {
    answerValue.textContent = '';
    inputAnswer.value = '';
    inputAnswer.classList.remove('answer__input--disabled');
    inputAnswer.focus();
    inputAnswer.addEventListener('input', onInputAnswerInput);
  }

  setTimeout(objA.initVizualizationNumber.bind(objA), 1000);
})();
