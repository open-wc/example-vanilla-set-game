import { html, render } from 'lit-html';

class SetCard extends HTMLElement {
  set selected(value) {
    this.__selected = !!value;
    this.classList[this.__selected ? 'add' : 'remove']('set-card--selected');
  }

  get selected() {
    return this.__selected;
  }

  set color(color) {
    switch (color) {
      case 'red':
        this.__color = color;
        this._cssColor = '#ed3f3c';
        break;
      case 'green':
        this.__color = color;
        this._cssColor = '#71be47';
        break;
      case 'blue':
        this.__color = color;
        this._cssColor = '#21409a';
        break;
      default:
        this.__color = '';
        this._cssColor = '';
    }
    // filling depends on color so we need ot update it as well
    this.filling = this.filling;
  }

  get color() {
    return this.__color;
  }

  set filling(filling) {
    switch (filling) {
      case 'full':
        this.__filling = filling;
        this._cssFilling = `background: ${this._cssColor};`;
        break;
      case 'striped':
        this.__filling = filling;
        this._cssFilling = `
          background: repeating-linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.2) 10px,
            rgba(0, 0, 0, 0.6) 10px,
            rgba(0, 0, 0, 0.6) 20px
          ),
          ${this._cssColor};
        `;
        break;
      case 'empty':
        this.__filling = filling;
        this._cssFilling = 'background: none';
        break;
      default:
        this.__filling = filling;
        this._cssFilling = '';
    }
  }

  get filling() {
    return this.__filling;
  }

  set shape(shape) {
    switch (shape) {
      case 'oval':
        this.__shape = shape;
        this._cssShape = 'div { border-radius: 48%; }';
        break;
      case 'bar':
        this.__shape = shape;
        this._cssShape = '';
        break;
      case 'skewed':
        this.__shape = shape;
        this._cssShape = `
          div {
            transform: skew(40deg);
            width: 80%;
            left: 10%;
            height: 25px;
          }
        `;
        break;
      default:
        this.__shape = shape;
        this._cssShape = '';
    }
  }

  get shape() {
    return this.__shape;
  }

  set sets(value) {
    this.__sets = value;
    this.update();
  }

  get sets() {
    return this.__sets;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.selected = false;
    this.quantity = 'none';
    this.color = '';
    this.shape = 'none';
    this.filling = 'none';
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  connectedCallback() {
    this.update();
  }

  update() {
    render(this.renderShadowDom(), this.shadowRoot);
  }

  renderShadowDom() {
    return html`
      <style>
        :host {
          background: #f7f7f7;
          width: 130px;
          height: 200px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: #eeeeee 2px 3px 6px 1px;
          display: flex;
          align-content: center;
          flex-direction: column;
          justify-content: space-evenly;
          padding: 30px 15px;
          box-sizing: border-box;
          margin: 20px;
          position: relative;
          transition : border 250ms ease-out;
        }

        :host(.set-card--selected) {
          box-shadow: #f1e22a 0px 0 8px 2px;
        }

        :host(.set-card--selected)::after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 235, 0, 0.3);
          left: 0;
        }

        div {
          height: 30px;
          border: 1px solid ${this._cssColor};
          position: relative;
          ${this._cssFilling}
        }
        ${this._cssShape}
      </style>
      ${Array.from(new Array(this.quantity)).map(() => html`<div></div>`)}
    `;
  }
}

// TODO investigate why this is needed for karma tests
if (!window.customElements.get('set-card')) {
  window.customElements.define('set-card', SetCard);
}
