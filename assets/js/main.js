(function() {
  'use strict';

  var $ = window.helpers;
  $.removeClass(document.documentElement, 'no-js');

  function checkScroll() {
    var y = $.scrollY();
    var a = document.getElementById('scroll-to-top');
    if (y > 100) {
      if ($.hasClass(a, 'show')) return;
      a.className += ' show';
    } else {
      if (!$.hasClass(a, 'show')) return;
      $.removeClass(a, 'show');
    }
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
    window.location.hash = '#top';
  }

  function hashchange() {
    if (window.location.hash === '#top')
      scrollToTop();
  }

  window.addEventListener('hashchange', hashchange);
  window.addEventListener('scroll', checkScroll, false);

  window.load = function() {
    hashchange();
    document.getElementById('scroll-to-top').addEventListener('click', function(e) {
      e.preventDefault();
      scrollToTop();
    }, false);
  };
})();
