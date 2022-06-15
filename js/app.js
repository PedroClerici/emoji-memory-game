import Card from './card.js';

// Global Variables.
const deck = document.querySelector('.deck');
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
    // TODO: add card flip system
    if(!cardFlipOne) {
      cardFlipOne = card;

      if (!cardFlipOne.isMatched) {
        console.log('Flip!');
      } else {
        cardFlipOne = null;
      }
    } else {
      cardFlipTwo = card;

      if (!cardFlipTwo.isMatched & cardFlipOne.node !== cardFlipTwo.node) {
        console.log('Flip!');
      } else {
        cardFlipTwo = null;
      }
    }

    // Card matching logic.
    if(cardFlipOne !== null && cardFlipTwo !== null && !cardFlipOne.isMatched && !cardFlipTwo.isMatched) {
      if(Card.checkMatch(cardFlipOne, cardFlipTwo)) {
        // If cards match...
        console.log(`cardFlipOne: ${cardFlipOne.emoji}\ncardFlipTwo: ${cardFlipTwo.emoji}`);

        cardFlipOne.isMatched = true
        cardFlipTwo.isMatched = true

        cardFlipOne.node.style.background = '#7be38f'
        cardFlipTwo.node.style.background = '#7be38f'

        cardFlipOne = null;
        cardFlipTwo = null;

        matches++;
        console.log(`Cards match! Total matches: ${matches}`);
      } else {
        // If cards don't match
        console.log(`cardFlipOne: ${cardFlipOne.emoji}\ncardFlipTwo: ${cardFlipTwo.emoji}`);
        cardFlipOne = null;
        cardFlipTwo = null;

        console.log("Cards don't match.");
      }

      moves++;
      if (matches === baseEmojis.length) {
        alert('YOU WIN!');
      }
    }
  })
})