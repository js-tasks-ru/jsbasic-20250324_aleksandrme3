import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.#render();
    this.keyDownEvent = this.#onKeyDown;
  }

  #render() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay">
        </div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', this.keyDownEvent);
  }

  close() {
    if (this.elem) {
      this.elem.remove();
    }

    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.keyDownEvent);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const bodyElem = this.elem.querySelector('.modal__body');
    bodyElem.innerHTML = '';
    bodyElem.append(node);
  }

  #onKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
