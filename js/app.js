/*-------------------------------- Constants --------------------------------*/
const numPlayers = 2
const cardsPerPlayer = 26

const gameMessages = {
  welcome: 'Welcome to the game of War!',
  roundWinner: 'Player %d wins this round!',
  tie: 'It\'s a tie! Prepare for WAR!',
  gameOver: 'Game over. Player %d wins the game!'
}
const warCondition = 2; // Number of cards drawn during a war (adjustable as per game rules)
const maxRounds = 1000; // Maximum rounds to avoid infinite loops in case of stalemate




/*---------------------------- Variables (state) ----------------------------*/
let playerDeck1, playerDeck2, player1Card, player2Card, warPile, isGameRunning, currentRound, player1Score, player2Score, gameLog, isWar, winner, selectedCard


/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']


let deck = []
for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(rank + suit)
    }
  }

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1))
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }
  shuffleDeck(deck)
}



function dealCards(){
  return deck.pop()
}

let player1 = []
let player2 = []

for(let i = 0; i < 26; i++) {
  player1.push(dealCards())
  player2.push(dealCards())
}

console.log(player1)
console.log(player2)

function compareCards(card1, card2) {
  const rank1 = ranks.indexOf(card1.slice(0, -1))
  const rank2 = ranks.indexOf(card2.slice(0, -1))
  if (rank1 > rank2) {
    return 'player1'
  } else if (rank1 < rank2) {
    return 'player2'
  } else {
    return 'tie'
  }
}

for (let i = 0; i < 26; i++) {
 const card1 = player1[i]
 const card2 = player2[i]
}

