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
    const slider = createElement(`
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

    slider.querySelector('.slider__thumb').ondragstart = () => false;

    return slider;
  }

  #activeStep(value) {
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach(span => span.classList.remove('slider__step-active'));
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
    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', (event) => this.#onPointerDown(event))


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

  #onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    const onPointerMove = (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      leftRelative = Math.max(0, Math.min(1, leftRelative));

      const value = Math.round(leftRelative * (this.steps - 1));
     

      this.value = value;
      this.#activeStep(value);
      this.elem.querySelector('.slider__value').textContent = value;

      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');

      thumb.style.left = `${leftRelative * 100}%`;
      progress.style.width = `${leftRelative * 100}%`;

    };

    const onPointerUp = () => {
      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

      this.#updateSlider();

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    };
  
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  
  }  
}
