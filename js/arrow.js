'use strict';
(function () {
  var ACCPECT_RATIO_SVG = 0.323; // (svg height / svg width) - оригинальные размеры рисунка
  var vizualizationWrapper = document.querySelector('.visualization__numbers-wrapper');

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

  window.arrow = {
    setStrokeArc: setStrokeArc,
    addVizualizationNumber: addVizualizationNumber
  };
})();
