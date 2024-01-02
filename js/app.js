/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
let player1Deck, player2Deck 
let player1Pile, player2Pile


/*------------------------ Cached Element References ------------------------*/
const player1CardDiv = document.getElementById('player1Card')
const player2CardDiv = document.getElementById('player2Card')
const playButton = document.getElementById('playButton')
const resultDisplay = document.getElementById('result')


/*----------------------------- Event Listeners -----------------------------*/

// playButton.addEventListener('click', playRound)

/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  player1Deck = createDeck()
  player2Deck = createDeck()
  player1Pile = []
  player2Pile = []
  shuffleDeck(player1Deck)
  shuffleDeck(player2Deck)
  resultDisplay.innerHTML = ''
}

function createDeck () {
  const deck = []
  for (const card of cards) {
    for (const suit of suits) {
      deck.push(`${card} of${suit}`)
    }
  }
  return deck
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j] = deck[j], deck[i]]
  }
} 

function playRound() {
  if (player1Deck.length === 0 || player2Deck.length === 0) {
    endGame()
    return  
  }
  const player1Card = player1Deck.pop()
  const player2Card = player2Deck.pop()
  
  player1Pile.unshift(player1Card)
  player2Pile.unshift(player2Card)
  
  player1CardDiv.innerHTML = `Player 1: ${player1Card}`
  player2CardDiv.innerHTML = `Player 2: ${player2Card}`

  compareCards(player1Card, player2Card)
}

function compareCards(card1, card2) {
  const cardValue1 = cards.indexOf(card1.split(' ')[0])
  const cardValue2 = cards.indexOf(card2.split(' ')[0])

  if (cardValue1 > cardValue2) {
    resultDisplay.innerHTML = `Player 1 wins!`
    player1Deck = player1Deck.concat(player1Pile, player2Pile)
    player1Pile = []
    player2Pile = []
  } else if (cardValue2 > cardValue1) {
    resultDisplay.innerHTML = `Player 2 wins!`
    player1Deck = player1Deck.concat(player1Pile, player2Pile)
    player1Pile = []
    player2Pile = []
    } else {
      resultDisplay.innerHTML = 'War declared!'
      if (player1Deck.length < 4 || player2Deck < 4) {
        endGame()
        return
      }
      for (let i = 0; i < 4; i++) {
        player1Pile.unshift(player1Deck.pop())
        player2Pile.unshift(player2Deck.pop())
      }
      playRound()
    }
}


//  function createDeck() {
//   const suits = ['hearts' , 'Diamonds' , 'Clubs' , 'Spades']
//   const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
//   const deck = []

//   for (const suit of suits) {
//     for (const rank of ranks) {
//       deck.push({ suit, rank })
//     }
//   }
//   return deck
//  }
  

// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))
//     [deck[i], deck[j]] = [deck[j], deck[i]]
//     shuffleDeck(deck)
//   }
// }


// function dealCards(deck, player1Deck, player2Deck) {
//   for (let i = 0; i < 26; i++) {
//   player1Deck.push(deck.pop())
//   player2Deck.push(deck.pop())
//   }
// }







