import { html, render } from 'lit-html';
import './set-card';
import { generateDeck } from './helpers';

class SetDeck extends HTMLElement {
  set cards(value) {
    this._cards = value;
    this.update();
  }

  get cards() {
    return this._cards;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cards = generateDeck();
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
          background: #158ef5;
          color: #fff;
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
          text-align: center;
          font-size: 30px;
          cursor: pointer;
        }
      </style>
      <strong>${this.cards.length}</strong>
    `;
  }
}

window.customElements.define('set-deck', SetDeck);
