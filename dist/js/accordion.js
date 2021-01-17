// Accordion - Анимации для выпадающих элементов
export default class Accordion {
  constructor(el, titleSelector, contentSelector) {
    this.el = el;
    this.summary = el.querySelector(titleSelector);
    this.content = el.querySelector(contentSelector);
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.closeTime = 400, this.openTime = 400;
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  setSpeedDoubleTime(openTime, closeTime) {
    if(!closeTime) throw "One of the arguments is missing!"
    this.openTime = openTime;
    this.closeTime = closeTime;
  }

  setSpeed(time) {
    this.closeTime = time;
    this.openTime = time;
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    if (this.animation) this.animation.cancel();
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: this.closeTime,
      easing: 'ease-out'
    });
    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    if (this.animation) this.animation.cancel();
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: this.openTime,
      easing: 'ease-out'
    });
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}