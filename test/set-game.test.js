/* eslint-disable no-unused-expressions */
import {
  html,
  fixture,
  litFixture,
  expect,
} from '@open-wc/testing';

import '../set-game';

describe('Game', () => {
  it('starts with at least 3 cards', async () => {
    const el = await fixture('<set-game></set-game>');
    expect(el.cards.length).to.least(3);
  });

  it('starts with 0 selected cards', async () => {
    const el = await fixture('<set-game></set-game>');
    expect(el.selectedCards.length).to.equal(0);
  });

  it('can toggle a card selection', async () => {
    const el = await fixture('<set-game></set-game>');
    el.toggleCard(el.cards[0]);
    expect(el.selectedCards[0]).to.equal(el.cards[0]);
    el.toggleCard(el.cards[0]);
    expect(el.selectedCards.length).to.equal(0);
  });

  it('will add every selected card to selectedCards', async () => {
    const el = await fixture('<set-game></set-game>');
    el.toggleCard(el.cards[0]);
    expect(el.selectedCards).to.deep.equal([el.cards[0]]);

    el.toggleCard(el.cards[1]);
    expect(el.selectedCards).to.deep.equal([el.cards[0], el.cards[1]]);
  });

  it('will remove cards once a set is selected', async () => {
    const card1 = {
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    };
    const card2 = { ...card1, color: 'green' };
    const card3 = { ...card1, color: 'blue' };
    const card4 = { ...card1, shape: 'oval' };

    const el = await litFixture(html`<set-game .cards=${[card1, card2, card3, card4]}></set-game>`);

    el.toggleCard(card1);
    el.toggleCard(card2);
    expect(el.selectedCards).to.deep.equal([card1, card2]);
    el.toggleCard(card3);
    expect(el.selectedCards).to.deep.equal([]);

    expect(el.cards).to.not.contain(card1);
    expect(el.cards).to.not.contain(card2);
    expect(el.cards).to.not.contain(card3);
  });
});
