/// This script is for the client.

const socket = io(); /// io() is just the connection.
const $form_1 = document.querySelector('#form_1')
const $formMessage = document.querySelector('input')
const $formButton = document.querySelector('button')
const $locationShare = document.querySelector('#location') // This is a button.
const $messages = document.querySelector('#messages')
// const $locations_share = document.querySelector('#location-share')
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML
console.log(document.querySelector('#sidebar-template'))
const $sideBarTemplate = document.querySelector('#sidebar-template').innerHTML
console.log($sideBarTemplate)
const {username,chat_room} = Qs.parse(location.search,{ignoreQueryPrefix:true})
// console.log(username,chat_room)


socket.on('sentMessage',(message)=>{

    const {username,text,createdAt} = message
    const html = Mustache.render($messageTemplate,{
        username:username,
        message: text,
        createdAt
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('sendLocation',(location)=>{
    console.log(location)
    const lochtml = Mustache.render($locationTemplate,location)
    $messages.insertAdjacentHTML('beforeend',lochtml)
})

socket.on('roomData',({room,roomUsers})=>{
    console.log(room,roomUsers)
    const roomhtml = Mustache.render($sideBarTemplate,{
        room,
        roomUsers
    })
    document.querySelector('#sidebar').innerHTML = roomhtml

})

$form_1.addEventListener('submit',(e)=>{
    e.preventDefault()
    $formButton.disabled = true // Disable the button after it has sent a message once.
    const message = e.target.elements.message.value
    console.log(message,'For the last time')


    socket.emit("sentMessage",message,(error)=>{
        console.log(socket.id,'From client')
        $formButton.disabled = false // Enable the button again once the message has been delivered/ or not. The main motive here is to prevent double submission
        if(error){
            return alert(error) // Error comes from the server
        }
        console.log("Message has been delivered")
        $formMessage.value = ""
        $formMessage.focus()
})
})

$locationShare.addEventListener('click',()=>{
    $locationShare.disabled = true
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
            $locationShare.disabled = false
            

        })
    })

})

socket.emit('join',{username,chat_room},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})

