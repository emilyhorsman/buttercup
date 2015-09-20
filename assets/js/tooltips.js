(function() {
  'use strict';

  var $ = window.helpers;

  /*
   * This is progressive enhancement to ensure tooltips to not go off screen
   * on small devices.
   */

  function tooltips() {
    var elms = document.querySelectorAll('.tooltip');

    function adjustTooltip(elm) {
      var inner = elm.children[0];
      var rect = inner.getBoundingClientRect();
      var viewport = $.viewportWidth();
      if (rect.right > viewport) {
        inner.className += ' left';
      } else if (rect.left < 0) {
        inner.className += ' right';
      }
    }

    function removeAdjustment(elm) {
      var inner = elm.children[0];
      $.removeClass(inner, 'left');
      $.removeClass(inner, 'right');
    }

    $.each(elms, function(elm) {
      elm.addEventListener('mouseenter', function() {
        adjustTooltip(elm);
      }, false);

      elm.addEventListener('mouseleave', function() {
        removeAdjustment(elm);
      }, false);
    });
  }

  window.addEventListener('DOMContentLoaded', tooltips, false);
})();
