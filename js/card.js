export default class Card {
  constructor(emoji) {
    this.node = document.createElement('li')
    this.emoji = emoji;
    this.isMatched = false;

    let img = document.createElement('img')
    img.setAttribute('src', `img/emojis/${this.emoji}.svg`)
    this.node.appendChild(img);

    this.node.classList.add('deck__card')
  }

  flip() {
    this.node.classList.add('deck__card--flipInY');
  }

  unFlip() {
    setTimeout(() => {
      this.node.classList.remove('deck__card--flipInY');
    }, 750);
  }

  match() {
    this.isMatched = true

    setTimeout(() => {
      this.node.style.background = 'var(--clr-green)'
    }, 750);
  }

  static checkMatch(cardOne, cardTwo) {
    if (cardTwo.emoji === cardOne.emoji && cardOne.node !== cardTwo.node) {
      return true;
    }
    
    return false;
  }
}