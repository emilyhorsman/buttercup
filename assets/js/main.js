document.documentElement.className = document.documentElement.className.replace(/\bno\-js\b/, '');

$(function() {
  $.fn.lockAtThreshold = function(opts) {
    var c = (typeof opts.state === 'undefined') ? 'locked' : opts.state;

    if ($(window).scrollTop() > opts.threshold) {
      if (this.hasClass(c)) return;

      if (opts.bodyPadding) {
        $('body').css('padding-top', '+=' + opts.bodyPadding);
      }

      this.addClass(c);
    } else {
      if (!this.hasClass(c)) return;

      if (opts.bodyPadding) {
        $('body').css('padding-top', '-=' + opts.bodyPadding);
      }

      this.removeClass(c);
    }
  };

  function checkMenuCompactState() {
    var $a = $('header h1 a');
    $a.lockAtThreshold({
      threshold: $a.position().top + $a.outerHeight() + 8
    });

    var $header = $('header');
    var headerHeight = 200;
    $header.lockAtThreshold({
      threshold: headerHeight - $a.outerHeight(),
      bodyPadding: headerHeight
    });

    $header.lockAtThreshold({
      threshold: headerHeight,
      state: 'minimal'
    });
  }
  checkMenuCompactState();
  $(window).scroll(checkMenuCompactState);

  $(function() {
    $('a.content-jump').click(function(e) {
      e.preventDefault();
      $(window).stop(true).scrollTo(this.hash, { duration: 500, interrupt:true });
    });
  });
});
