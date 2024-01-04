/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
let player1Deck, player2Deck 
let player1Pile, player2Pile


/*------------------------ Cached Element References ------------------------*/
const player1CardDiv = document.getElementById('player1Card')
const player2CardDiv = document.getElementById('player2Card')
const playButton = document.getElementById('playButton')
const resultDisplay = document.getElementById('result')


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
