//* gナビ
$(window).on('load', function () {
  $('body').removeClass('nav_op');
});

var state = false;
var scrollpos;
$('.g_nav_toggle').on('click', function () {
  //    $('body').toggleClass('nav_op');
  // $(this).toggleClass('open');
  if (state == false) {
    scrollpos = $(window).scrollTop();
    $('body').addClass('nav_op').css({ top: -scrollpos });
    state = true;
  } else {
    $('body').removeClass('nav_op').css({ top: 0 });
    window.scrollTo(0, scrollpos);
    state = false;
  }
});

//ページ内リンクがある場合・ロゴリンクがある場合
$('.g_nav a[href*="#"], .header .logo a').on('click', function () {
  if ($('body').hasClass('nav_op')) {
    $('.g_nav_toggle').trigger('click');
  }
});

//* smooth scroller
$(function () {
  // smooth scroller
  $('a[href*="#"]').on('click', function () {
    var hash = this.hash;
    if (!hash || hash == '#') {
      return false;
    }
    var offset = $(hash).offset();
    if (!offset) {
      return true;
    }

    //メニュー除く
    var menu_height = 0;
    //        if ($('.job_menu.fixed').length){
    //            var menu_height = $('.job_menu.fixed').outerHeight();
    //        }

    $('body,html').animate({ scrollTop: offset.top - menu_height }, 800);
    return false;
  });
});

//* スクロール
$(function () {
  var _height = window.innerHeight;
  var b_height = $('body').height();

  $(window).on('scroll', function () {
    if ($(window).scrollTop() < _height * 0.5) {
      $('body').removeClass('scrolled');
    } else {
      $('body').addClass('scrolled');
    }
    if ($(window).scrollTop() > b_height - _height * 1.5) {
      $('body').addClass('scroll_end');
    } else {
      $('body').removeClass('scroll_end');
    }
  });
});

//slide
$(document).ready(function () {
  $('.slide').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
  });
});

// タッチデバイス
if ('ontouchstart' in window) {
  $(function () {
    $('html').addClass('touch');
  });
}
