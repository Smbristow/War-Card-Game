/*-------------------------------- Constants --------------------------------*/
const numPlayers = 2
const cardsPerPlayer = 26
const cardValues = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
}
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
function createDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
  const deck = []

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank })
    }
  }
  return deck
}

function shuffleDeck (deck) {
  for (let i = deck.length - 1; i > 0; i--){
    const j = math.floor(math.random() * (i + 1))
    [deck[i], deck [j] = deck[j], deck[i]]
  }
}

function dealCards(deck, numPlayers, cardsPerPlayer) {
  const players = []
  for (let i = 0; i < numPlayers; i++) {
    players.push([])
  }
  
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numPlayers; j++) {
      players[j].push(deck.pop())
    }
  }

  return players; 

}

function startGame(numPlayers, cardsPerPlayer) {
  const deck = createDeck()
  shuffleDeck(deck)
  const players = dealCards(deck, numPlayers, cardsPerPlayer)

  return players
}
