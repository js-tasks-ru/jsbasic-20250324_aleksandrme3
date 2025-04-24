import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();

    this.#activeStep(value);
    this.#updateSlider();
    this.#eventListeners();
  }

  #render() {
    return createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${Array.from({ length: this.steps }).map(() => '<span></span>').join('')}
        </div>
      </div>
      `);
  }

  #activeStep(value) {
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps[value].classList.add('slider__step-active');
  }

  #updateSlider() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const percents = (this.value / (this.steps - 1)) * 100;

    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;

  }

  #eventListeners() {
    this.elem.addEventListener('click', (event) => this.#onClick(event));

  }

  #onClick(event) {
    const clickCoord = event.clientX - this.elem.getBoundingClientRect().left;

    const leftRelative = clickCoord / this.elem.offsetWidth;
    const roundValue = Math.round(leftRelative * (this.steps - 1));

    this.value = roundValue;
    this.#activeStep(roundValue);
    this.#updateSlider();

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }
}
