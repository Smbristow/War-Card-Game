/*-------------------------------- Constants --------------------------------*/
const suits = ["♠", "♣", "♥", "♦"]
const values = [
  "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
];
/*---------------------------- Variables (state) ----------------------------*/
class deck {
  constructor(cards = freshDeck()) {
    this.card = cards
  }

  get numberOfCards() {
    return this.cards.length
  }

  pop() {
    return this.cards.shift()
  }

  push(card) {
    return this.cards.shift()
  }

  push(card) {
    this.cards.push(card)
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      [this.cards[i], this.cards[newIndex]] = [this.cards[newIndex], this.cards[i]]
    }
  }
}


class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

/*------------------------ Cached Element References ------------------------*/


/*----------------------------- Event Listeners -----------------------------*/

document.getElementById('play-round-btn').addEventListener('click', playRound);

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  player1Deck = createDeck()
  player2Deck = createDeck()
  player1Pile = []
  player2Pile = []
  shuffleDeck(player1Deck)
  shuffleDeck(player2Deck)
}

function createDeck() {
  const deck = []
  for (const card of cards) {
    for (const suit of suits) {
      deck.push(`${card} of ${suit}`)
    }
  }
  return deck
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

function playRound() {
  console.log('Play Round function executed')
  if (player1Deck.length === 0 || player2Deck.length === 0) {
    return  
  }
  const player1Card = player1Deck.pop()
  const player2Card = player2Deck.pop()
  
  player1Pile.unshift(player1Card)
  player2Pile.unshift(player2Card)
  
  compareCards(player1Card, player2Card)
}

function compareCards(card1, card2) {
  console.log('Compare Cards function executed')
  const values = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
  const value1 = values[card1.split('')[1]]
  const value2 = values[card2.split('')[1]]

  if (value1 > value2) {
    player1Deck.unshift(...player1Pile, ...player2Pile, card1, card2)
    player1Pile = []
    player2Pile = []
  } else if (value2 > value1) {
    player2Deck.unshift(...player1Pile, ...player2Pile, card1, card2)
    player1Pile = []
    player2Pile = []
  } else {
    if (player1Deck.length < 2 || player2Deck.length < 2) {
      return
    }
    for (let i = 0; i < 2; i++) {
      player1Pile.unshift(player1Deck.pop())
      player2Pile.unshift(player2Deck.pop())
    }
    playRound()
  }
}
