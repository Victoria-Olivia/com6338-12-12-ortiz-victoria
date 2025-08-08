const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)){
      return
    }
    if (this.word.includes(letter)) {
      this.correctLetters.push(letter)
      let newDisplayWord = ''
      for (let i = 0; i < this.word.length; i++) {
        let wordLetter = this.word[i]
        if (this.correctLetters.includes(wordLetter)) {
          newDisplayWord += wordLetter
        } else {
          newDisplayWord += '_'
        }
     }
      this.displayWord = newDisplayWord
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
   }
    

  // implement the updateScreen function:
  updateScreen() {
    document.getElementById('word-to-guess').textContent = this.displayWord
    document.getElementById('remaining-guesses').textContent = this.remainingGuesses
    document.getElementById('incorrect-letters').textContent = this.incorrectLetters.join(', ')
  }

  // implement the isGameOver function:
  isGameOver() {
    return this.remainingGuesses <= 0 || this.displayWord === this.word
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.displayWord === this.word) {
      return 'win'
    } else if (this.remainingGuesses <= 0) {
      return 'loss'
    }
    return null
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()