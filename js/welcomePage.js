const usernameInput = document.querySelector('#username-input')
const startButton = document.querySelector('#start-button')

// Implements the button logic
startButton.addEventListener('click', (event) => {
  // 1-. Show input if it is 
  const isInputHidden = usernameInput.classList.contains('hidden')

  if (isInputHidden) {
    usernameInput.classList.remove('hidden')
  } 
  // 2-. Save username and navigate to play
  else {
    const username = usernameInput.value
    const isValidInput = username.trim().length > 0

    if (isValidInput) {
      localStorage.setItem('username', username)
      window.location.href = '../views/play.html'
    } else {
      alert('Invalid username')
    }
  }
})

/* 
  [
    {
      username: 'Renzo',
      score: 9,
      date: Date
    },
    
    {
      username: 'Alfredo',
      score: 7,
      date: Date
    },


    {
      username: 'Maria',
      score: 2,
      date: Date
    }
  ]
*/