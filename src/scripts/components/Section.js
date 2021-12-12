/** Класс Section для вставки элементов на страницу **/

export default class Section {
  constructor(items, renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._items = items;

  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(item =>{
      this._renderer(item);
    })

  }
}
