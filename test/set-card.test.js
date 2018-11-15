/* eslint-disable no-unused-expressions */
import {
  html,
  fixture,
  litFixture,
  expect,
} from '@open-wc/testing';

import '../set-card';
import '../set-deck';

describe('Card', () => {
  it('has 4 properties', async () => {
    const el = await fixture('<set-card></set-card>');
    expect(el.quantity).to.equal('none');
    expect(el.color).to.equal('');
    expect(el.shape).to.equal('none');
    expect(el.filling).to.equal('none');
  });

  it('accepts only red|green|blue for color', async () => {
    const el = await fixture('<set-card></set-card>');
    el.color = 'red';
    expect(el.color).to.equal('red');

    el.color = 'green';
    expect(el.color).to.equal('green');

    el.color = 'blue';
    expect(el.color).to.equal('blue');

    el.color = 'something';
    expect(el.color).to.equal('');
  });

  it('is not selected', async () => {
    const el = await fixture('<set-card></set-card>');
    expect(el.selected).to.be.false;
    expect(Array.from(el.classList)).to.not.contain('set-card--selected');
  });

  it('can be selected', async () => {
    const el = await litFixture(html`
      <set-card .selected=${true}></set-card>
    `);
    expect(el.selected).to.be.true;
    expect(Array.from(el.classList)).to.contain('set-card--selected');
  });
});

describe('Deck', () => {
  it('consists of 81 cards', async () => {
    const el = await fixture('<set-deck></set-deck>');
    expect(el.cards.length).to.equal(81);
  });
});
