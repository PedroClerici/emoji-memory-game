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

  // Adding event listeners to all cards.
  card.node.addEventListener('click', e => {
    // Card flip logic.
    if (!cardFlipOne) {
      cardFlipOne = card;

      if (!cardFlipOne.isMatched) {
        cardFlipOne.flip();
      } else {
        cardFlipOne = null;
      }
    } else {
      cardFlipTwo = card;

      if (!cardFlipTwo.isMatched & cardFlipOne.node !== cardFlipTwo.node) {
        cardFlipTwo.flip();
      } else {
        cardFlipTwo = null;
      }
    }

    // Card matching logic.
    if (cardFlipOne !== null && cardFlipTwo !== null && !cardFlipOne.isMatched && !cardFlipTwo.isMatched) {
      if (Card.checkMatch(cardFlipOne, cardFlipTwo)) {
        // If cards match...
        cardFlipOne.match();
        cardFlipTwo.match();

        cardFlipOne = null;
        cardFlipTwo = null;

        matches++;
      } else {
        // If cards don't match...
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
      // Unhide popup.
      document.querySelector('.hide').style.display = 'flex';

      // Add popup title accordingly to quantity of stars.
      const popupTitle = document.querySelector('.popup__title');
      switch (stars) {
        case 1:
          popupTitle.innerHTML = `
            <h1 class="title__text">Too Much Moves...</h1>
          `;
          break;
        case 2:
          popupTitle.innerHTML = `
            <h1 class="title__text">Well Done!</h1>
            <img class="title__image" src="img/emojis/ok-hand.svg" alt="ok-hand">
          `;
          break;
        case 3:
          popupTitle.innerHTML = `
            <h1 class="title__text">Perfect!</h1>
            <img class="title__image" src="img/emojis/star-struck.svg" alt="star-struck">
          `;
          break;
      }
    }
  })
})

function updateStars() {
  const scoreStarsNodes = document.querySelectorAll('.score__star > img');
  const popupStarsNodes = document.querySelectorAll('.popup__star > img');

  if (moves >= 16 && moves < 26) {
    scoreStarsNodes[2].setAttribute('src', 'img/stars/black-star.svg');
    popupStarsNodes[2].setAttribute('src', 'img/stars/black-star.svg');
    stars = 2;
  } else if (moves >= 26) {
    scoreStarsNodes[1].setAttribute('src', 'img/stars/black-star.svg');
    popupStarsNodes[1].setAttribute('src', 'img/stars/black-star.svg');
    stars = 1;
  }
}

function updateMoves() {
  const movesNode = document.querySelector('.score__moves');
  movesNode.innerText = moves;
}
