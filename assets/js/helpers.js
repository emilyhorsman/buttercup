(function() {
  'use strict';

  window.helpers = {
  each: function(array, fn) {
    for (var i = 0; i < array.length; i++)
      fn(array[i], i);
  },

  outerHeight: function(elm) {
    var height = elm.offsetHeight;
    var style = getComputedStyle(elm);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  },

  removeClass: function(elm, cls) {
    elm.className = elm.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },

  hasClass: function(elm, cls) {
    return (' ' + elm.className + ' ').indexOf(' ' + cls + ' ') > -1;
  },

  viewportWidth: function() {
    return document.documentElement.clientWidth;
  },

  scrollY: function() { return window.pageYOffset || document.documentElement.scrollTop; }
  };
})();
