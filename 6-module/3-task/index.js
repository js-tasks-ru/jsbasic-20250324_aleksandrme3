import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;

    this.render();
    this.showHideArrows();
    this.addEventListeners();
  }

  render () {
    this.elem = createElement(`
      <div class='carousel'>
        <div class='carousel__arrow carousel__arrow_right'>
         <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class='carousel__inner'>
          ${this.slides.map(slide => `
            <div class='carousel__slide' data-id='${slide.id}'>
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class='carousel__caption'>
                <span class='carousel__price'>€${slide.price.toFixed(2)}</span>
                <div class='carousel__title'>${slide.name}</div>
                <button class='carousel__button' type='button'>
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
            `).join('')}
        </div>
      </div>
    `);

    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
  }


  showHideArrows() {
    this.arrowLeft.style.display = this.currentSlideIndex === 0 ? 'none' : '';
    this.arrowRight.style.display = this.currentSlideIndex === this.slides.length - 1 ? 'none' : '';
  }

  changeSlide(direction) {
    const slideWidth = this.carouselInner.offsetWidth;
    this.currentSlideIndex += direction;

    this.carouselInner.style.transform = `translateX(-${slideWidth * this.currentSlideIndex}px)`;

    this.showHideArrows();
  }


  addEventListeners() {
    //arrows
    this.arrowLeft.addEventListener('click', () => this.changeSlide(-1));
    this.arrowRight.addEventListener('click', () => this.changeSlide(1));
  
    //plus
    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (!button) return;

      const slide = event.target.closest('.carousel__slide');
      if (!slide) return;

      const slideId = slide.dataset.id;

      const customEvent = new CustomEvent('product-add', {
        detail: slideId,
        bubbles: true
      });

      this.elem.dispatchEvent(customEvent);
    });
  
  }

}

