import Card from './card.js';

let deck = document.querySelector('.deck');
let cards = [];
let baseEmojis = ['cherries', 'coconut', 'feather', 'ice', 'rabbit', 'star-struck', 'toothbrush', 'wood'];
let emojis = baseEmojis.concat(baseEmojis);

// Randomizes the emojis array order.
emojis.sort(() => Math.random() - 0.5);

// Creates a new card for each emoji.
emojis.forEach(emoji => {
  cards.push(new Card(emoji));
});

// Appends the cards to the deck.
cards.forEach(card => {
  deck.appendChild(card.node);
})