const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
];

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    this.cards.push(card);
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[newIndex]] = [this.cards[newIndex], this.cards[i]];
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
}

function freshDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value);
    });
  });
}

const CARD_VALUE_MAP = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
  "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14
};

const player1CardSlot = document.querySelector(".player1-card-slot"); // Updated variable name
const player2CardSlot = document.querySelector(".player2-card-slot");
const player1DeckElement = document.querySelector(".player1-deck"); // Updated variable name
const player2DeckElement = document.querySelector(".player2-deck");
const text = document.querySelector(".text");

let player2Deck, player1Deck, inRound, stop; // Updated variable names

document.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();

function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  player2Deck = new Deck(deck.cards.slice(0, deckMidpoint));
  player1Deck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  player1CardSlot.innerHTML = ""; // Updated variable name
  player2CardSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function flipCards() {
    inRound = true;
  
    const player2Card = player2Deck.pop();
    const player1Card = player1Deck.pop();
  
    player2CardSlot.appendChild(player2Card.getHTML());
    player1CardSlot.appendChild(player1Card.getHTML());
  
    updateDeckCount();
  
    if (isRoundWinner(player2Card, player1Card)) {
      text.innerText = "Win";
      player2Deck.push(player2Card);
      player2Deck.push(player1Card);
    } else if (isRoundWinner(player1Card, player2Card)) {
      text.innerText = "Lose";
      player1Deck.push(player2Card);
      player1Deck.push(player1Card);
    } else {
      text.innerText = "War!";
      initiateWar();
    }
  
    if (isGameOver(player2Deck)) {
      text.innerText = "Player 1 Wins!!";
      stop = true;
    } else if (isGameOver(player1Deck)) {
      text.innerText = "Player 2 Wins!!";
      stop = true;
    }
  }
  
  function initiateWar() {
    const player2Cards = player2Deck.popMultiple(2);
    const player1Cards = player1Deck.popMultiple(2);
  
    player2Cards.forEach(card => player2CardSlot.appendChild(card.getHTML()));
    player1Cards.forEach(card => player1CardSlot.appendChild(card.getHTML()));
  
    const player2LastCard = player2Cards[player2Cards.length - 1];
    const player1LastCard = player1Cards[player1Cards.length - 1];
  
    if (player2LastCard && player1LastCard) {
      if (isRoundWinner(player2LastCard, player1LastCard)) {
        text.innerText = "Player 2 Wins the War!";
        player2Deck.push(...player2Cards);
        player2Deck.push(...player1Cards);
      } else if (isRoundWinner(player1LastCard, player2LastCard)) {
        text.innerText = "Player 1 Wins the War!";
        player1Deck.push(...player2Cards);
        player1Deck.push(...player1Cards);
      } else {
        text.innerText = "Another War!";
        initiateWar();
      }
    }
  }
  
  Deck.prototype.popMultiple = function (count) {
    return Array.from({ length: count }, () => this.pop()).filter(Boolean);
  };

function updateDeckCount() {
  player1DeckElement.innerText = player1Deck.numberOfCards; // Updated variable name
  player2DeckElement.innerText = player2Deck.numberOfCards;
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
