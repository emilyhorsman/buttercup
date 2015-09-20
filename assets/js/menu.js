(function() {
  'use strict';

  var $ = window.helpers;

  function menu() {
    var a = document.getElementById('open-hamburger');
    a.addEventListener('click', function(e) {
      e.preventDefault();

      var menu = document.querySelectorAll('header nav div')[0];
      if ($.hasClass(menu, 'show')) {
        $.removeClass(menu, 'show');
        return;
      }

      menu.className += ' show';
    }, false);
  }

  window.addEventListener('DOMContentLoaded', menu, false);
})();
