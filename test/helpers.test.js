/* eslint-disable no-unused-expressions */
import { expect } from '@open-wc/testing';

import {
  checkSet,
  markSets,
  isSameCard,
  generateDeck,
  generateCard,
  getSetCount,
  findCard,
} from '../helpers';

describe('isSameCard', () => {
  it('will be the same card', async () => {
    const card1 = generateCard({
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    });
    const card2 = { ...card1, color: 'green' };
    expect(isSameCard(card1, card1)).to.be.true;
    expect(isSameCard(card1, card2)).to.be.false;
  });
});

describe('checkSet', () => {
  it('only checks sets of 3', async () => {
    expect(checkSet([])).to.be.false;
    expect(checkSet([1, 2, 3, 4])).to.be.false;
  });

  it('checks for all the same', async () => {
    const card1 = generateCard({
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    });
    let card2 = { ...card1, color: 'green' };
    let card3 = { ...card1, color: 'blue' };
    expect(checkSet([card1, card2, card3])).to.be.true;

    card2 = { ...card1, quantity: 2 };
    card3 = { ...card1, quantity: 3 };
    expect(checkSet([card1, card2, card3])).to.be.true;

    card2 = { ...card1, quantity: 2, color: 'green' };
    card3 = { ...card1, quantity: 3, color: 'blue' };
    expect(checkSet([card1, card2, card3])).to.be.true;

    card2 = { ...card1, shape: 'oval', filling: 'striped' };
    card3 = { ...card1, shape: 'skewed', filling: 'full' };
    expect(checkSet([card1, card2, card3])).to.be.true;
  });
});

describe('findSets', () => {
  it('searches for sets', async () => {
    const card1 = generateCard({
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    });
    const card2 = { ...card1, color: 'green' };
    const card3 = { ...card1, color: 'blue' };

    const stack1 = markSets([card1, card2, card3]);
    expect(getSetCount(stack1)).to.equal(1);

    const card4 = { ...card1, quantity: 2, color: 'blue' };
    const stack2 = markSets([card1, card2, card4, card3]);
    expect(getSetCount(stack2)).to.equal(1);

    const card5 = { ...card1, quantity: 3, color: 'blue' };
    const stack3 = markSets([card1, card2, card3, card4, card5]);
    expect(getSetCount(stack3)).to.equal(2);

    const setCard1 = generateCard({
      quantity: 2,
      color: 'green',
      shape: 'bar',
      filling: 'empty',
    });
    const setCard2 = {
      ...setCard1,
      quantity: 1,
      shape: 'skewed',
      filling: 'full',
    };
    const setCard3 = {
      ...setCard1,
      quantity: 3,
      shape: 'oval',
      filling: 'striped',
    };
    const stack4 = markSets([setCard1, card1, setCard2, card2, card4, setCard3]);
    expect(getSetCount(stack4)).to.equal(1);
  });

  it('can find cards by card or by id', async () => {
    const card1 = generateCard({
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    });
    const card2 = { ...card1, color: 'green' };
    const card3 = { ...card1, color: 'blue', id: 'foo' };
    const stack = [card1, card2, card3];

    expect(findCard(stack, card2)).to.deep.equal(card2);
    expect(findCard(stack, 'foo')).to.deep.equal(card3);
  });
});

describe('generateDeck', () => {
  it('can generate a card object', async () => {
    const card1 = generateCard({
      id: 'fixedId',
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    });
    expect(card1).to.deep.equal({
      id: 'fixedId',
      selected: false,
      sets: [],
      quantity: 1,
      color: 'red',
      shape: 'bar',
      filling: 'empty',
    });
  });

  it('generates ordered cards with an id', async () => {
    const cards = generateDeck(false);
    cards.forEach((card, i) => {
      expect(card.quantity).to.be.not.undefined;
      expect(card.color).to.be.not.undefined;
      expect(card.shape).to.be.not.undefined;
      expect(card.filling).to.be.not.undefined;
      expect(card.selected).to.be.false;
      expect(card.id).to.equal(`card${i}`);
    });
  });
});
