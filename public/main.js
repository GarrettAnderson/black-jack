let faces = [
  { value: 2, face: 2 },
  { value: 3, face: 3 },
  { value: 4, face: 4 },
  { value: 5, face: 5 },
  { value: 6, face: 6 },
  { value: 7, face: 7 },
  { value: 8, face: 8 },
  { value: 9, face: 9 },
  { value: 10, face: 10 },
  { value: 10, face: 'jack' },
  { value: 10, face: 'queen' },
  { value: 10, face: 'king' },
  { value: 11, face: 'ace' }
]

let suits = [ 'hearts', 'diamonds', 'clubs', 'spades' ]
let deck = []
let dealerHand = []
let playerHand = []
let playerScore = []
let dealerScore = []
let players = new Array()
let currentPlayer = 0

const buildDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    console.log(suits[i])
    for (let j = 0; j < faces.length; j++) {
      // console.log(suits[i] + faces[j])
      // let cardDealt = document.createElement('li')
      // deck.push(faces[j] + ' of ' + suits[i])
      let card = {
        suit: suits[i],
        rank: faces[j].value,
        face: faces[j].face
      }
      deck.push(card)
    }
  }
  console.log(deck)
}

const shuffleDeck = () => {
  // for i from 53 - 1 down to 1 do:
  // j = random integer (where 0 <= j <= i)
  // swap items[i] with items[j]
  for (let i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))

    let cardAtPositionI = deck[i]
    let cardAtPositionJ = deck[j]

    // swap items[i] with items[j]
    deck[j] = cardAtPositionI
    deck[i] = cardAtPositionJ
  }
  console.log(deck)
}

// deal card to player
const dealInitialPlayerHand = () => {
  // click on card to display a single value of shuffleDeck array
  for (let i = 0; i < 2; i++) {
    // for (let j = 0; j < players.length; j++) {
    let dealtCard = deck.shift()
    playerHand.push(dealtCard)
    console.log(playerHand)
    let cardList = document.querySelector('.player-hand')
    _li = document.createElement('li')
    cardList.appendChild(_li)
    let targetPlayerHand = document.querySelector('.card-dealt-list')
    let image = document.createElement('img')
    image.src = '/images/' + dealtCard.rank + '_of_' + dealtCard.suit + '.svg'
    targetPlayerHand.appendChild(image)
  }
}

// Deal Card to dealer
const dealInitialDealerHand = () => {
  for (let i = 0; i < 2; i++) {
    let nextDealtCard = deck.shift()
    dealerHand.push(nextDealtCard)
    let targetDealerHand = document.querySelector('.card-2-dealt-list')
    let image = document.createElement('img')
    image.src = '/images/Card_back.svg'
    targetDealerHand.appendChild(image)
    console.log(dealerHand)
  }
}
const dealCardToPlayer = () => {
  let dealtCard = deck.shift()
  playerHand.push(dealtCard)
  console.log(playerHand)
  let cardList = document.querySelector('.player-hand')
  _li = document.createElement('li')
  cardList.appendChild(_li)
  let targetPlayerHand = document.querySelector('.card-dealt-list')
  let image = document.createElement('img')
  // image.className = 'player-card-reveal'
  image.src = '/images/' + dealtCard.rank + '_of_' + dealtCard.suit + '.svg'
  targetPlayerHand.appendChild(image)
}

const dealCardToDealer = () => {
  let nextDealtCard = deck.shift()
  dealerHand.push(nextDealtCard)
  let cardList = document.querySelector('.dealer-hand')
  _li = document.createElement('li')
  cardList.appendChild(_li)
  let targetDealerHand = document.querySelector('.card-2-dealt-list')
  let image = document.createElement('img')
  image.className = 'dealer-card-reveal'
  image.src = '/images/Card_back.svg'
  targetDealerHand.appendChild(image)
  console.log(dealerHand)
}

const countPlayerScore = () => {
  if (playerHand.length === 2) {
    playerScore = playerHand[0].rank + playerHand[1].rank
    document.querySelector('.player-1-score').textContent = playerScore
  } else if (playerHand.length === 3) {
    playerScore = playerHand[0].rank + playerHand[1].rank + playerHand[2]
    document.querySelector('.player-1-score').textContent = playerScore
  } else if (playerHand.length === 3) {
    playerScore = playerHand[0].rank + playerHand[1].rank + playerHand[2] + playerHand[3]
    document.querySelector('.player-1-score').textContent = playerScore
    console.log(playerScore)
    endPlay()
  }
}

// check who is the winner of the round
const determineWinner = () => {
  if (playerScore > dealerScore) {
    console.log('Player has won the game.')
  } else if (playerScore === dealerScore) {
    console.log('There is a tie. No one has won.')
  } else if (playerScore < dealerScore) {
    console.log('Dealer has won the game.')
  }
}

const playerStands = () => {
  let dealtCard = deck.shift()
  let cardList = document.querySelector('.dealer-hand')
  _li = document.createElement('li')
  cardList.appendChild(_li)
  let targetDealerHand = document.querySelector('.card-2-dealt-list')
  let image = document.createElement('img')
  image.className = 'dealer-card-reveal'
  image.src = '/images/' + dealtCard.rank + '_of_' + dealtCard.suit + '.svg'
  targetDealerHand.appendChild(image)
  console.log(dealerHand)
}

// function for the stay button or end the game
const endPlay = () => {
  console.log('stay button was pushed')
  // dealDealerHand()
  countDealerScore()
  if (dealerScore < 17) {
    endPlay()
  } else if (dealerScore >= 17 && dealerScore <= 21) {
    determineWinner()
  } else if (dealerScore > 21) {
    console.log('Dealer has busted')
  }
}

// add card to deck when hit me button is pressed
const hitMe = () => {
  console.log('Hit Me')
  dealCardToPlayer()
  console.log(dealerHand)
  // countPlayerScore()
  if (playerScore <= 21) {
    console.log('Hit or Stay')
  } else if (playerScore >= 21) {
    console.log('you busted')
  }
}

const dealAgainBothPlayers = () => {
  dealerHand = []
  playerHand = []
  playerScore = []
  dealerScore = []
  dealInitialPlayerHand()
  dealInitialDealerHand()
}

const main = () => {
  // create a card deck on page load
  buildDeck()
  // shuffle the deck on page load
  shuffleDeck()
  // deal a 2 card hand face up to player
  dealInitialPlayerHand()
  // deal 2 card hand face down to deal
  dealInitialDealerHand()
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-me-button').addEventListener('click', playerStands)
document.querySelector('.reset-button').addEventListener('click', dealAgainBothPlayers)
