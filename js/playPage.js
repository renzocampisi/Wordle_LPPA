const gameContainer = document.querySelector('.game-container')
let currentRowNumber = 1
let targetWord = null
const COLUMNS = 5
const ROWS = 6

const getRandomWord = async () => {
  try {
    const wordsResponse = await fetch('../words.json')
    const wordsArray = await wordsResponse.json()

    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    targetWord = wordsArray[randomIndex]

    console.log(targetWord)
  } 
  
  catch(error) {
    console.log(error)
    return null
  }
}

const ableNextRow = (currentRowNumber) => {
  const currentRowElement = gameContainer.querySelector(`.try${currentRowNumber}`)
  const currentRowInputs = currentRowElement.querySelectorAll('.word-form__input')

  currentRowInputs.forEach(input => {
    input.setAttribute('disabled', true)
  })

  const nextRowElement = gameContainer.querySelector(`.try${currentRowNumber + 1}`)
  const nextRowInputs = nextRowElement.querySelectorAll('.word-form__input')

  nextRowInputs.forEach(input => {
    input.removeAttribute('disabled')
  })
}

const handleSubmitWord = (word) => {
  const normalizedWord = word.toLowerCase()
  const normalizedTargetWord = targetWord.toLowerCase()

  if (normalizedWord === normalizedTargetWord) {
    alert ('You won')
  } else {
    ableNextRow(currentRowNumber)
    currentRowNumber += 1
  }
}

const addSubmitListener = (formElement) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault()
  
    let wordResult = ''
    const formElementInputs = formElement.querySelectorAll('.word-form__input')
  
    for (let i = 0; i < formElementInputs.length; i++) {
      const currentCharacter = formElementInputs[i].value
  
      if (currentCharacter.trim().length === 0) {
        alert('Invalid word')
        return
      }
  
      wordResult = wordResult.concat(currentCharacter)
    }
  
    handleSubmitWord(wordResult)
  })
}

const renderGameGrid = () => {

  // RENDER ROWS
  for (let i = 0; i < ROWS; i++) {
    const buttonElement = document.createElement('button')
    buttonElement.classList.add('submit-button')

    const formElement = document.createElement('form')
    formElement.classList.add('word-form', `try${i + 1}`)
    
    formElement.appendChild(buttonElement)
    gameContainer.appendChild(formElement)

    addSubmitListener(formElement)

    // RENDER COLUMNS
    for (let k = 0; k < COLUMNS; k++) {
      const inputElement = document.createElement('input')
      inputElement.classList.add('word-form__input')
      inputElement.setAttribute('type', 'text')
      inputElement.setAttribute('maxlength', 1)

      // IF CURRENT ROW IS NOT THE FIRST, DISABLE ALL INPUTS
      if (i > 0) {
        inputElement.setAttribute('disabled', true)
      }

      formElement.appendChild(inputElement)
    }
  }
}

getRandomWord()
renderGameGrid()