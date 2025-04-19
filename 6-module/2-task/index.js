import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
    this.addEventListeners();
  }

  render() {
    const { name, price, image } = this.product;

    const card = createElement(`
      <div class='card'>
        <div class='card__top'>
        <img class='card__image' src='/assets/images/products/${image}' alt="product">
        <span class='card__price'>€${price.toFixed(2)}</span>
        </div>

        <div class='card__body'>
          <div class='card__title'>${name}</div>
          <button class='card__button' type='button'>
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `);

    return card;  

  }

  addEventListeners() {
    this.elem.querySelector('.card__button').addEventListener('click', () => {
      this.elem.dispatchEvent(new CustomEvent('product-add', {
        bubbles: true,
        detail: this.product.id
      }));
    });

  }

}