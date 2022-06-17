import Card from './card.js';

// Global Variables.
const deck = document.querySelector('.deck');
let stars = 3
let cardFlipOne = null;
let cardFlipTwo = null;
let matches = 0;
let moves = 0;
let cards = [];
let baseEmojis = ['cherries', 'coconut', 'feather', 'ice', 'rabbit', 'star-struck', 'toothbrush', 'wood'];
let emojis = baseEmojis.concat(baseEmojis);


// Randomizes the emojis array order.
emojis.sort(() => Math.random() - 0.5);

// Creates a new card for each emoji.
emojis.forEach(emoji => {
  cards.push(new Card(emoji));
});

cards.forEach(card => {
  // Appends the cards to the deck.
  deck.appendChild(card.node);

  // Adding event listeners to all cards
  card.node.addEventListener('click', e => {
    if(!cardFlipOne) {
      cardFlipOne = card;

      if (!cardFlipOne.isMatched) {
        console.log('Flip!');
        cardFlipOne.flip();
      } else {
        cardFlipOne = null;
      }
    } else {
      cardFlipTwo = card;

      if (!cardFlipTwo.isMatched & cardFlipOne.node !== cardFlipTwo.node) {
        console.log('Flip!');
        cardFlipTwo.flip();
      } else {
        cardFlipTwo = null;
      }
    }

    // Card matching logic.
    if(cardFlipOne !== null && cardFlipTwo !== null && !cardFlipOne.isMatched && !cardFlipTwo.isMatched) {
      if(Card.checkMatch(cardFlipOne, cardFlipTwo)) {
        // If cards match...
        console.log(`cardFlipOne: ${cardFlipOne.emoji}\ncardFlipTwo: ${cardFlipTwo.emoji}`);

        cardFlipOne.match();
        cardFlipTwo.match();

        cardFlipOne = null;
        cardFlipTwo = null;

        matches++;
        console.log(`Cards match! Total matches: ${matches}`);
      } else {
        // If cards don't match
        console.log(`cardFlipOne: ${cardFlipOne.emoji}\ncardFlipTwo: ${cardFlipTwo.emoji}`);
        console.log("Cards don't match.");

        cardFlipOne.unFlip();
        cardFlipTwo.unFlip();

        cardFlipOne = null;
        cardFlipTwo = null;
      }

      moves++;
      updateMoves();
      updateStars();
    }

    if (matches === baseEmojis.length) {
      alert('YOU WIN!');
    }
  })
})

function updateStars() {
  const starsNodes = document.querySelectorAll('.score__star > img');

  if (moves >= 16 && moves < 26) {
    starsNodes[2].setAttribute('src', 'img/stars/black-star.svg');
    stars = 2;
  } else if (moves >= 26) {
    starsNodes[1].setAttribute('src', 'img/stars/black-star.svg');
    stars = 1;
  }
}

function updateMoves() {
  const movesNode = document.querySelector('.score__moves');
  movesNode.innerText = moves;
}