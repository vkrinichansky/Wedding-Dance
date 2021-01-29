let burger = document.querySelector('.topbar__burger');
let menu = document.querySelector('.navigation');
let body = document.querySelector('.body');
let navItems = document.querySelectorAll('.navigation > a');

let animatedItems = document.querySelectorAll('.wow');

//* ANIMATION INIT
let wow = new WOW({
  mobile: false,
});
wow.init();

//* SHOWING/HIDING MOBILE MENU
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  body.classList.toggle('lock');
});

//* CLOSING MENU AFTER CLICK ON MOBILE MENU LINK
navItems.forEach((currentItem) => {
  currentItem.addEventListener('click', () => {
    burger.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('lock');
  });
});

//* FIRST SLIDER
let CardSwiper = new Swiper('.card-item-container', {
  slidesPerView: 1,
  spaceBetween: 50,
  simulateTouch: false,
  watchOverflow: true,
  pagination: {
    el: '.card-item-pagination',
    clickable: true,
  },

  breakpoints: {
    375: {
      slidesPerView: 1.3,
    },

    576: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

//* SECOND SLIDER
let coachSwiper = new Swiper('.coach-card-container', {
  slidesPerView: 1,
  spaceBetween: 50,
  simulateTouch: false,
  watchOverflow: true,
  pagination: {
    type: 'bullets',
    el: '.coach-card-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    resize: function () {
      navRender();
    },
  },
  breakpoints: {
    320: {
      pagination: {
        type: 'bullets',
        spaceBetween: 30,
      },
    },
    375: {
      slidesPerView: 1.2,
      pagination: {
        type: 'bullets',
      },
      spaceBetween: 30,
    },

    576: {
      slidesPerView: 1.5,
      pagination: {
        type: 'bullets',
      },
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      pagination: {
        type: 'bullets',
      },
    },
    1024: {
      slidesPerView: 2,
      pagination: {
        type: 'fraction',
      },
    },
  },
});

//* GETTING NAV ARROWS
let swiperPrev = document.querySelector('.swiper-button-prev');
let swiperNext = document.querySelector('.swiper-button-next');

//* NAV RE-RENDER FUNC
function navRender() {
  coachSwiper.pagination.destroy();
  coachSwiper.pagination.init();
  coachSwiper.pagination.render();
  coachSwiper.pagination.update();
}

//* RESIZE LISTENER
window.addEventListener(
  'resize',
  () => {
    navRender();

    //+ HIDING MOBILE MENU ON RESIZING
    if (document.documentElement.clientWidth > 768) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('lock');
    }

    //+ FORCE RE-RENDER PAGINATION ON BREAKPOINT AND HIDE/SHOW ARROWS

    if (document.documentElement.clientWidth >= 1024) {
      swiperPrev.classList.remove('hide');
      swiperNext.classList.remove('hide');
      navRender();
    }
    if (document.documentElement.clientWidth < 1024) {
      swiperPrev.classList.add('hide');
      swiperNext.classList.add('hide');
      navRender();
    }
  },
  false
);

if (document.documentElement.clientWidth < 1024) {
  swiperPrev.classList.add('hide');
  swiperNext.classList.add('hide');
}
