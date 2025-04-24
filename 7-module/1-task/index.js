import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
    this.#ribbonScroll();
    this.#ribbonSelect();
  }

  #render() {
    const ribbon = createElement(`
      <div class='ribbon'>
        <button  class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.categories.map(({ id, name }, index) => `
            <a href="#" class="ribbon__item${index === 0 ? ' ribbon__item_active' : ''}" data-id="${id}">${name}</a>
          `).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
      
      `);

    this.ribbonInner = ribbon.querySelector('.ribbon__inner');
    this.arrowLeft = ribbon.querySelector('.ribbon__arrow_left');
    this.arrowRight = ribbon.querySelector('.ribbon__arrow_right');

    return ribbon;
  }

  #ribbonScroll() {
    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = this.ribbonInner.scrollLeft;
      const scrollWidth = this.ribbonInner.scrollWidth;
      const clientWidth = this.ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;
      
      if (scrollLeft === 0) {
        this.arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        this.arrowLeft.classList.add('ribbon__arrow_visible');
      }


      if (scrollRight < 1) {
        this.arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        this.arrowRight.classList.add('ribbon__arrow_visible');
      }
    });

  }

  #ribbonSelect() {
    this.elem.addEventListener('click', (event) => {
      if (!event.target.classList.contains('ribbon__item')) return;

      event.preventDefault();

      const active = this.elem.querySelector('.ribbon__item_active');
      if (active) active.classList.remove('.ribbon__item_active');

      event.target.classList.add('.ribbon__item_active');

      const categoryId = event.target.dataset.id;

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: categoryId,
        bubbles: true,
      }));
    });
  }
}
