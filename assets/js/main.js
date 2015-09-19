(function() {
  'use strict';
  var $ = window.helpers;

  document.documentElement.className = document.documentElement.className.replace(/\bno\-js\b/, '');

  /*
   * Add a state class to an element with option padding to the body element
   * if our scrolling y pos has exceeded a given threshold. Remove the class
   * otherwise.
   */
  function lockAtThreshold(opts) {
    var cls = (typeof opts.cls === 'undefined') ? 'locked' : opts.cls;
    var body = document.body;
    if (opts.y > opts.threshold) {
      if ($.checkClass(opts.elm, cls)) return;
      if (opts.bodyPadding) {
        body.style.paddingTop = (parseInt(body.style.paddingTop || 0) + opts.bodyPadding) + 'px';
      }
      opts.elm.className += ' ' + cls;
      return;
    }

    if (!$.checkClass(opts.elm, cls)) return;

    if (opts.bodyPadding)
      body.style.paddingTop = (parseInt(body.style.paddingTop || 0) - opts.bodyPadding) + 'px';

    $.removeClass(opts.elm, cls);
  }

  function scrollStateMachine(e) {
    var y = $.scrollY();
    var header = document.getElementsByTagName('header')[0];
    var anchor = header.querySelectorAll('h1 a')[0];
    var anchorHeight = $.outerHeight(anchor);
    var headerHeight = header.offsetHeight;

    lockAtThreshold({
      y: y,
      elm: anchor,
      threshold: anchor.offsetTop + anchorHeight
    });

    lockAtThreshold({
      y: y,
      elm: header,
      threshold: headerHeight - anchorHeight,
      bodyPadding: headerHeight
    });

    lockAtThreshold({
      y: y,
      elm: header,
      threshold: headerHeight + 40,
      cls: 'minimal'
    });
  }
  window.addEventListener('scroll', scrollStateMachine, false);

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.content-jump')[0].style.display = 'block';
  }, false);
})();
