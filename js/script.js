import Accordion from './accordion.js'

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

jQuery(function($) {
  let feedbackSwiper = new Swiper('.feedback-slider', {
    loop: true,
    spaceBetween: 30,
    breakpoints: {
      993: {
        slidesPerView: 2,
      }
    },
    pagination: {
      el: '.swiper-pagination',
    }
  })
  document.querySelectorAll('details').forEach((el) => {
    new Accordion(el, '.faq-question', '.faq-content');
  });
})
