/*-------------------------------- Constants --------------------------------*/
const NUM_PLAYERS = 2
const CARDS_PER_PLAYER = 26
const CARD_VALUES = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
}
const GAME_MESSAGES = {
  WELCOME: 'Welcome to the game of War!',
  PLAYER_WIN: 'Player %d wins this round!',
  TIE: 'It\'s a tie! Prepare for WAR!',
  GAME_OVER: 'Game over. Player %d wins the game!'
}
const WAR_CONDITION = 3; // Number of cards drawn during a war (adjustable as per game rules)
const MAX_ROUNDS = 1000; // Maximum rounds to avoid infinite loops in case of stalemate




/*---------------------------- Variables (state) ----------------------------*/
let playerDeck1, playerDeck2, player1Card, player2Card, warPile, isGameRunning, currentRound, player1Score, player2Score, gameLog, isWar, winner, cardValues, selectedCard


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