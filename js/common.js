// ---------- タッチデバイス
if ('ontouchstart' in window) {
  $(function () {
    $('html').addClass('touch');
  });
}

// ---------- gナビ
$(window).on('load', function () {
  $('body').removeClass('nav_op');
});

let state = false;
let scrollpos;
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

// ---------- smooth scroller
$(function () {
  // smooth scroller
  $('a[href*="#"]').on('click', function () {
    const hash = this.hash;
    if (!hash || hash == '#') {
      return false;
    }
    const offset = $(hash).offset();
    if (!offset) {
      return true;
    }

    let menu_height = 0;
    // メニューのの高さ除く場合
    //        if ($('.header.fixed').length){
    //            menu_height = $('.header.fixed').outerHeight();
    //        }

    $('body,html').animate({ scrollTop: offset.top - menu_height }, 800);
    return false;
  });
});

// ---------- スクロール
$(function () {
  const _height = window.innerHeight;
  const b_height = $('body').height();

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

// ---------- slide
$(function () {
  $('.slide').slick({
    dots: true,
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: true,
  });
  // 待ってからスタートする場合
  setTimeout(function () {
    $('.slide').slick('play');
  }, 2500);
});

// ---------- 文字
$(function () {
  if ($('.catch').length) {
    // wordList($('.catch'), 100);
    wordList($('.catch'), 1500);
  }
  function wordList(parent, delay) {
    parent.css({ opacity: 0 });
    parent
      .children()
      .addBack()
      .contents()
      .each(function () {
        if (this.nodeType == 3) {
          $(this).replaceWith(
            $(this).text().replace(/(\S)/g, '<span>$&</span>')
          );
        }
      });

    const word = parent.find('span').css({ opacity: 0 });
    parent.css({ opacity: 1 });

    word.each(function (idx, elem) {
      $(this)
        .delay(idx * 60 + delay)
        .animate({ opacity: 1 }, 1100);
    });
  }
});
