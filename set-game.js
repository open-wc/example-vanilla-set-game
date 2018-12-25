import { html, render } from 'lit-html';

import { checkSet, removeCards, markSets, generateDeck, findCard, getSetCount } from './helpers';

import './set-card';
import './set-deck';

export default class SetGame extends HTMLElement {
  set cards(cards) {
    this.__cards = cards;
    this.update();
  }

  get cards() {
    return this.__cards;
  }

  get selectedCards() {
    return this.cards.filter(el => el.selected === true);
  }

  get cardNodes() {
    return this.shadowRoot.querySelectorAll('set-card');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.header = 'SET';
    this.cards = [];
    this.deckCards = generateDeck();
  }

  connectedCallback() {
    this.connected = true;
    this.deal();
    this.update();
  }

  deal(force = false) {
    if (this.deckCards.length < 3) {
      alert('you won'); // eslint-disable-line no-alert
      this.deckCards = generateDeck();
    }

    let addCards = !!force;
    do {
      if (addCards) {
        this.cards.push(this.deckCards.pop());
        this.cards.push(this.deckCards.pop());
        this.cards.push(this.deckCards.pop());
        this.deckCards = Array.from(this.deckCards);
      }
      this.cards = markSets(this.cards);
      this.foundSetsCount = getSetCount(this.cards);
      addCards = true;
    } while (this.foundSetsCount < 1 || (this.cards.length < 9 && this.deckCards.length >= 3));
    this.update();
  }

  update() {
    if (this.connected && this.shadowRoot) {
      render(this.renderShadowDom(), this.shadowRoot);
    }
  }

  toggleCard(_card) {
    const card = findCard(this.cards, _card);
    if (!card) {
      return;
    }

    if (!card.selected) {
      if (this.selectedCards.length < 3) {
        card.selected = true;
        this.update();
      }

      if (this.selectedCards.length === 3) {
        if (checkSet(this.selectedCards)) {
          this.cards = removeCards(this.cards, this.selectedCards);
          this.deal();
        }
      }
    } else {
      card.selected = false;
      this.update();
    }
  }

  cheat(setName = 'set0') {
    this.cardNodes.forEach(cardNode => {
      if (cardNode.sets.includes(setName)) {
        cardNode.style.borderColor = 'red'; // eslint-disable-line no-param-reassign
        setTimeout(() => {
          cardNode.style.borderColor = '#ddd'; // eslint-disable-line no-param-reassign
        }, 500);
      }
    });
  }

  renderShadowDom() {
    return html`
      <style>
        :host {
          display: block;
        }

        h1 {
          margin-bottom: 0;
          text-align: center;
          font-family: Impact, Charcoal, sans-serif;
          color: #178ef5;
          font-weight: 300;
          letter-spacing: 5px;
        }

        .table {
          display: flex;
        }

        .table__cards {
          display: flex;
          flex-wrap: wrap;
        }

        .table__side {
          text-align: center;
        }

        .table__side button {
          opacity: 0.3;
        }

        set-card {
          cursor: pointer;
        }
      </style>

      <h1>${this.header}</h1>
      <div class="table">
        <div class="table__side">
          <set-deck .cards=${this.deckCards} @click=${() => this.deal(true)}></set-deck>
          <p>Sets on table: ${this.foundSetsCount}</p>
          <button @click=${() => this.cheat()}>Cheat</button>
        </div>
        <div class="table__cards">
          ${
            this.cards.map(
              card => html`
                <set-card
                  .id=${card.id}
                  .selected=${card.selected}
                  .sets=${card.sets}
                  .quantity=${card.quantity}
                  .color=${card.color}
                  .shape=${card.shape}
                  .filling=${card.filling}
                  @click=${ev => this.toggleCard(ev.target.id)}
                ></set-card>
              `,
            )
          }
        </div>
      </div>
    `;
  }
}

window.customElements.define('set-game', SetGame);
