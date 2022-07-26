const try1Form = document.querySelector('#try1')
const try2Form = document.querySelector('#try2')
const try3Form = document.querySelector('#try3')
const try4Form = document.querySelector('#try4')
const try5Form = document.querySelector('#try5')

try1Form.addEventListener('submit', (event) => {
  event.preventDefault()

  let wordResult = ''
  const try1FormInputs = try1Form.querySelectorAll('.word-form__input')

  for (let i = 0; i < try1FormInputs.length; i++) {
    const currentCharacter = try1FormInputs[i].value

    if (currentCharacter.trim().length === 0) {
      alert('Invalid word')
      return
    }

    wordResult = wordResult.concat(currentCharacter)
  }

  console.log(wordResult)
})
