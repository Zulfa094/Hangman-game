const wordsWithHints = [
  { word: 'kangaroo', hint: 'A marsupial from Australia that hops' },
  { word: 'cheetah', hint: 'The fastest land animal' },

  {
    word: 'pizza',
    hint: 'An Italian dish with a round base topped with sauce and cheese'
  },

  { word: 'basketball', hint: 'A sport played by two teams of five players' },

  {
    word: 'piano',
    hint: ' keyboard instrument that produces sound by striking strings'
  }
]

/*-------------------------------- Constants --------------------------------*/

const maxWrongGuesses = 5
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

const messageEl = document.getElementById('message')
const restartBtn = document.getElementById('restart-btn')
const wordEl = document.getElementById('word')
const hintEl = document.getElementById('hint')
const keyboardEl = document.getElementById('keyboard')
const wrongGuessesCounterEl = document.getElementById('wrong-guesses')

/*-------------------------------- variables --------------------------------*/
let selectedWord = ''
let hint = ''
let guessedLetters = []
let wrongGuesses = 0
let currentWord = []

/*-------------------------------- Functions --------------------------------*/

const startGame = () => {
  resetGame()
  selectRandomWordAndHint()
  displayWord()
  displayHint()
  displayKeyboard()
  updateWrongGuessesCounter()
}

const resetGame = () => {
  guessedLetters = []
  wrongGuesses = 0
  currentWord = []
  messageEl.textContent = ''
  restartBtn
}

const selectRandomWordAndHint = () => {
  const randomIndex = Math.floor(Math.random() * wordsWithHints.length)
  selectedWord = wordsWithHints[randomIndex].word.toUpperCase()
  hint = wordsWithHints[randomIndex].hint
  currentWord = Array(selectedWord.length).fill('_')
}

const displayWord = () => {
  wordEl.textContent = currentWord.join(' ')
}

const displayHint = () => {
  hintEl.textContent = `Hint: ${hint}`
}

const updateWrongGuessesCounter = () => {
  wrongGuessesCounterEl.textContent = `Wrong Guesses: ${wrongGuesses} / ${maxWrongGuesses}`
}

const displayKeyboard = () => {
  keyboardEl.innerHTML = ''
  alphabet.forEach((letter) => {
    const button = document.createElement('button')
    button.textContent = letter
    button.addEventListener('click', handleGuess)
    keyboardEl.appendChild(button)
  })
}

const handleGuess = (event) => {
  const button = event.target
  const letter = button.textContent
  button.disabled = true
  if (guessedLetters) {
    guessedLetters.push(letter)

    checkLetterInWord(letter)
    displayWord()
    checkWin()
    checkLoss()
  }
}

const checkLetterInWord = (letter) => {
  let correctGuess = false
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      currentWord[i] = letter
      correctGuess = true
    }
  }
  if (!correctGuess) {
    if (wrongGuesses < maxWrongGuesses) {
      wrongGuesses++
      updateWrongGuessesCounter()
      checkLoss()
    }
  }
}

const checkWin = () => {
  if (!currentWord.includes('_')) {
    messageEl.textContent = 'You won! '
    disableKeyboard()
  }
}

const checkLoss = () => {
  if (wrongGuesses >= maxWrongGuesses) {
    messageEl.textContent = `You lost! The word is ${selectedWord}.`
    disableKeyboard()
  }
}

const disableKeyboard = () => {
  const buttons = document.querySelectorAll('#keyboard button')
  buttons.forEach((button) => {
    button.disabled = true
  })
}
/*----------------------------- Event Listeners -----------------------------*/

restartBtn.addEventListener('click', startGame)

document.addEventListener('keydown', (event) => {
  const letter = event.key.toUpperCase()
  if (alphabet.includes(letter) && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter)
    checkLetterInWord(letter)
    displayWord()
    checkWin()
    checkLoss()
  }
})

startGame()
