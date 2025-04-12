function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  const slideCount = document.querySelectorAll('.carousel__slide').length;
  const slideWidth = carouselInner.offsetWidth;

  let currentSlide = 0;

  arrowLeft.style.display = 'none';

  arrowRight.addEventListener('click', () => {
    currentSlide += 1;

    carouselInner.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    arrowLeft.style.display = '';

    if (currentSlide === slideCount - 1) {
      arrowRight.style.display = 'none';
    }
  });


  arrowLeft.addEventListener('click', () => {
    currentSlide -= 1;

    carouselInner.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
    arrowRight.style.display = '';

    if (currentSlide === 0) {
      arrowLeft.style.display = 'none';
    }
  });
}
