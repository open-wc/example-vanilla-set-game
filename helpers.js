const gameCardProperties = ['quantity', 'color', 'shape', 'filling'];

export const isSameCard = (cardA, cardB) => {
  for (let i = 0; i < gameCardProperties.length; i += 1) {
    const property = gameCardProperties[i];
    if (cardA[property] !== cardB[property]) {
      return false;
    }
  }
  return true;
};

export const checkSet = (cards) => {
  if (cards.length !== 3) {
    return false;
  }

  const result = {
    quantity: false,
    color: false,
    shape: false,
    filling: false,
  };
  ['quantity', 'color', 'shape', 'filling'].forEach((property) => {
    if (
      cards[0][property] === cards[1][property]
      && cards[0][property] === cards[2][property]
    ) {
      result[property] = true;
    }
    if (
      cards[0][property] !== cards[1][property]
      && cards[0][property] !== cards[2][property]
      && cards[1][property] !== cards[2][property]
    ) {
      result[property] = true;
    }
  });

  return result.quantity && result.color && result.shape && result.filling;
};

export const markSets = (_cards) => {
  const cards = _cards;
  let setCounter = 0;
  const cardCount = cards.length;
  if (cards.length < 3) {
    return [];
  }
  // reset sets for every card
  cards.forEach((card) => { card.sets = []; }); // eslint-disable-line no-param-reassign

  let start = 0;
  do {
    let i = start + 1;
    do {
      let j = i + 1;
      do {
        const possibleSet = [cards[start], cards[i], cards[j]];
        if (checkSet(possibleSet)) {
          cards[start].sets.push(`set${setCounter}`);
          cards[i].sets.push(`set${setCounter}`);
          cards[j].sets.push(`set${setCounter}`);
          setCounter += 1;
        }
        j += 1;
      } while (j < cardCount);
      i += 1;
    } while (i < (cardCount - 1));
    start += 1;
  } while (start + 2 < cardCount);

  return cards;
};

export const getSetCount = (cards) => {
  const uniqueSets = new Set();
  cards.forEach((card) => {
    card.sets.forEach(set => uniqueSets.add(set));
  });
  return uniqueSets.size;
};

export const removeCard = (cards, removeMe) => cards.filter(el => !isSameCard(el, removeMe));

export const removeCards = (cards, cardsToRemove) => {
  let returnCards = cards;
  cardsToRemove.forEach((cardToRemove) => {
    returnCards = removeCard(returnCards, cardToRemove);
  });
  return returnCards;
};

export const findCard = (cards, card) => {
  if (typeof card === 'string') {
    for (let i = 0; i < cards.length; i += 1) {
      if (cards[i].id === card) {
        return cards[i];
      }
    }
  }

  for (let i = 0; i < cards.length; i += 1) {
    if (isSameCard(cards[i], card)) {
      return cards[i];
    }
  }
  return false;
};

/**
 * Copy from  https://bost.ocks.org/mike/shuffle/
 */
function shuffle(array) {
  let m = array.length;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    const i = Math.floor(Math.random() * (m -= 1));

    // And swap it with the current element.
    const t = array[m];
    array[m] = array[i]; // eslint-disable-line no-param-reassign
    array[i] = t; // eslint-disable-line no-param-reassign
  }
  return array;
}

let cardId = 0;
export const generateCard = (options) => {
  cardId += 1;
  return {
    id: `card${cardId}`,
    selected: false,
    sets: [],
    ...options,
  };
};

export const generateDeck = (doShuffle = true) => {
  const data = [];
  let i = 0;
  [1, 2, 3].forEach((quantity) => {
    ['red', 'green', 'blue'].forEach((color) => {
      ['oval', 'bar', 'skewed'].forEach((shape) => {
        ['empty', 'striped', 'full'].forEach((filling) => {
          data.push(generateCard({
            id: `card${i}`,
            quantity,
            color,
            shape,
            filling,
          }));
          i += 1;
        });
      });
    });
  });
  if (doShuffle) {
    shuffle(data);
  }
  return data;
};
