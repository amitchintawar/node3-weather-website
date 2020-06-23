console.log('client side js file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(search.value) {
        messageOne.textContent = 'Loading...'
        fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                    console.log(data.error)
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                    console.log(data.location)
                    console.log(data.forecast)
                }
            })
        })
    } else {
        console.log('You must enter a location')
    }
 
})