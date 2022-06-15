export default class Card {
  constructor(emoji) {
    this.node = document.createElement('li')
    this.emoji = emoji;

    let img = document.createElement('img')
    img.setAttribute('src', `img/emojis/${this.emoji}.svg`)
    this.node.appendChild(img);

    this.node.classList.add('deck__card')
  }

  static checkMatch(cardOne, cardTwo) {
    if (cardTwo.emoji === cardOne.emoji && cardOne.node !== cardTwo.node) {
      return true;
    }
    
    return false;
  }
}