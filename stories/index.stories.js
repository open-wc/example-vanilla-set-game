import {
  storiesOf,
  html,
} from '@open-wc/storybook';

import '../set-game.js';
import { generateDeck, generateCard } from '../helpers';

storiesOf('Set Game', module)
  .add('Welcome', () => html`
    <h1>Welcome the Set Game</h1>
    <p>It's a demo project showing everything <a href="http://open-wc.org" target="_blank">open-wc</a> has to offer</p>
    <p>Using open-wc's generators and guidelines creating something like this should be a peace of cake</p>
    <p>This includes:</p>
    <ul>
      <li>Code Quality</li>
      <li>Testing</li>
      <li>Automatic testing</li>
      <li>Automatic deployment</li>
    </ul>
    <p>Enough said - check the rules and enjoy the game</p>
  `)
  .add('Rules', () => html`
    <style>
      .row {
        display: flex;
      }
    </style>
    <h1>Game Rules</h1>
    <p>This game as 81 cards and each one of them is different an unique</p>
    <p>Your goal is to find all the sets</p>
    <h2>What is a set?</h2>
    <p>Each card has 4 properties</p>
    <ul>
      <li>Quantity: 1, 2 or 3</li>
      <li>Color: red, green or blue</li>
      <li>Shape: bar, skewed, oval</li>
      <li>Filling: empty, striped, full</li>
    </ul>

    <p>A set consists of <strong>3</strong> cards and each of the properties for itself needs to be <strong>either</strong> the same or different</p>

    <h2>Set examples</h2>
    <div class="row">
      <set-card .quantity=${1} .color=${'red'} .shape=${'bar'} .filling=${'striped'}></set-card>
      <set-card .quantity=${2} .color=${'red'} .shape=${'bar'} .filling=${'striped'}></set-card>
      <set-card .quantity=${3} .color=${'red'} .shape=${'bar'} .filling=${'striped'}></set-card>
    </div>
    <ul>
      <li>Quantity: different 1, 2, 3 ✓</li>
      <li>Color: same - all red ✓</li>
      <li>Shape: same - all bar ✓</li>
      <li>Filling: same - all striped ✓</li>
    </ul>

    <hr>
    <div class="row">
      <set-card .quantity=${3} .color=${'red'} .shape=${'bar'} .filling=${'full'}></set-card>
      <set-card .quantity=${3} .color=${'green'} .shape=${'bar'} .filling=${'empty'}></set-card>
      <set-card .quantity=${3} .color=${'blue'} .shape=${'bar'} .filling=${'striped'}></set-card>
    </div>
    <ul>
      <li>Quantity: same - all 3 ✓</li>
      <li>Color: different - red, green, blue ✓</li>
      <li>Shape: same - all bar ✓</li>
      <li>Filling: different - full, empty, striped ✓</li>
    </ul>

    <hr>
    <div class="row">
      <set-card .quantity=${3} .color=${'red'} .shape=${'bar'} .filling=${'striped'}></set-card>
      <set-card .quantity=${1} .color=${'green'} .shape=${'skewed'} .filling=${'full'}></set-card>
      <set-card .quantity=${2} .color=${'blue'} .shape=${'oval'} .filling=${'empty'}></set-card>
    </div>
    <ul>
      <li>Quantity: different - 3, 1, 2 ✓</li>
      <li>Color: different - red, green, blue ✓</li>
      <li>Shape: different - bar, skewed, oval ✓</li>
      <li>Filling: different - striped, full, empty ✓</li>
    </ul>

    <h2>NOT Set examples</h2>
    <div class="row">
      <set-card .quantity=${3} .color=${'red'} .shape=${'bar'} .filling=${'striped'}></set-card>
      <set-card .quantity=${3} .color=${'red'} .shape=${'bar'} .filling=${'full'}></set-card>
      <set-card .quantity=${3} .color=${'red'} .shape=${'bar'} .filling=${'striped'}></set-card>
    </div>
    <ul>
      <li>Quantity: same - all 3 ✓</li>
      <li>Color: same - all red ✓</li>
      <li>Shape: same - all bar ✓</li>
      <li>Filling: striped, full, striped ✗</li>
    </ul>

    <hr>
    <div class="row">
      <set-card .quantity=${2} .color=${'red'} .shape=${'skewed'} .filling=${'empty'}></set-card>
      <set-card .quantity=${2} .color=${'green'} .shape=${'skewed'} .filling=${'full'}></set-card>
      <set-card .quantity=${3} .color=${'blue'} .shape=${'skewed'} .filling=${'striped'}></set-card>
    </div>
    <ul>
      <li>Quantity: 2, 2, 3 ✗</li>
      <li>Color: different - red, green, blue ✓</li>
      <li>Shape: same- all skewed ✓</li>
      <li>Filling: different - empty, full, striped ✓</li>
    </ul>

  `)
  .add('Game', () => html`
    <set-game></set-game>
  `);

storiesOf('Game Parts', module)
  .add('Rigged Game', () => {
    const data = {
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    };
    const card1 = generateCard(data);
    const card2 = generateCard({ ...data, color: 'green' });
    const card3 = generateCard({ ...data, color: 'blue' });
    return html`
      <set-game .deckCards=${[card1, card2, card3]}></set-game>
    `;
  })
  .add('Card', () => html`
    <div style="display: flex;">
      <set-card .quantity=${3} .color=${'red'} .shape=${'bar'} .filling=${'full'}></set-card>
      <set-card .quantity=${2} .color=${'green'} .shape=${'skewed'} .filling=${'striped'}></set-card>
      <set-card .quantity=${1} .color=${'blue'} .shape=${'oval'} .filling=${'empty'}></set-card>
      <set-card .selected=${true} .quantity=${1} .color=${'blue'} .shape=${'oval'} .filling=${'empty'}></set-card>
    </div>
  `)
  .add('All Cards', () => {
    const cards = generateDeck(false);
    return html`
      <style>
        div {
          display: flex;
          flex-wrap: wrap;
        }
      </style>
      ${cards.map(card => html`
        <set-card .quantity=${card.quantity} .color=${card.color} .shape=${card.shape} .filling=${card.filling}></set-card>
      `)}
    `;
  })
  .add('Deck', () => html`
    <set-deck></set-deck>
  `);
