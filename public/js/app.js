const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = 'Error:'
        messageTwo.textContent = data.error
      } else {
        console.log(data.forecast)
        messageOne.textContent = data.location
        messageTwo.textContent = `${data.forecast.summary} ${data.forecast.temperature} ${data.forecast.precipitation}`
      }
    })
})