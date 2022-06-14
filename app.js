let flipOne = null;
let flipTwo = null;
let matches = 0;
let deck = document.querySelector('.deck');
let baseEmojis = ['cherries', 'coconut', 'feather', 'ice', 'rabbit', 'star-struck', 'toothbrush', 'wood'];
let emojis = baseEmojis.concat(baseEmojis);

// Randomizes the emojis array order.
emojis.sort(() => Math.random() - 0.5);

emojis.forEach(emoji => {
  // Create a card for each emoji
  let li = document.createElement('li')
  li.classList.add('deck__card')

  let img = document.createElement('img');
  img.setAttribute('src', `img/emojis/${emoji}.svg`)
  
  deck.appendChild(li);
  li.appendChild(img)
})

