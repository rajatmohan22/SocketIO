/// This script is for the client.

const socket = io(); /// io() is just the connection.
const $form_1 = document.querySelector('#form_1')
const $formMessage = document.querySelector('input')
const $formButton = document.querySelector('button')

socket.on('sentMessage',(message)=>{
    console.log(message)
})

socket.on('sendLocation',(location)=>{
    console.log(location)
})

$form_1.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const message = e.target.elements.message.value

    socket.emit("sentMessage",message,(error)=>{
        if(error){
            return console.log(error) // Error comes from the server
        }
    
        return console.log("Message has been delivered")
})
})
document.querySelector('#location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("Geo location not supported")
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        const x = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }
        socket.emit("sendLocation",x,()=>{
            console.log("Location has been sent")
        })
    })

})

