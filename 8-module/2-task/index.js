import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
    this.renderProducts();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
      `);

    this.inner = this.elem.querySelector('.products-grid__inner');
  }


  renderProducts() {
    this.inner.innerHTML = '';

    let filteredProducts = this.products.filter(product => {

      let conditions = [
        !(this.filters.noNuts && product.nuts),
        !(this.filters.vegeterianOnly && !product.vegeterian),
        !(this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness),
        !(this.filters.category && product.category !== this.filters.category)
      ];

      return conditions.every(condition => condition);
    });

    for (let product of filteredProducts) {
      let card = new ProductCard(product);
      this.inner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderProducts();
  }

}
