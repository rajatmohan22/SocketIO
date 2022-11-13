const users = []

/// Provides 4 functions.

/// addUser - To add users
/// removeUser - To remove users
/// getUser - Get a user based off the id
/// getUsersInRoom - Get a user based off the chat_room nameS

const addUser = ({id,username,chat_room})=>{

    username = username.trim().toLowerCase()
    chat_room = chat_room.trim().toLowerCase()

    if(!username||!chat_room) return {
        error: "Username and Room both are required"
    }

    const existingUser = users.find((user)=>{
        return user.chat_room === chat_room && user.username === username
    }) /// Will return true if there is a user already like that in our users array

    if(existingUser){
        return {
            error: 'Username already taken'
        }
    }

    const newUser = {id,username,chat_room}
    users.push(newUser)

    return {newUser}
}

const removeUser = (id)=>{
    
    const index = users.findIndex((user)=>{
        return id === user.id
    })

    console.log(index)
    const rUser =  users.splice(index,1)[0] //rUser - Removed User.
    if(rUser) {; console.log(rUser);return rUser}
    else return -1

}

const getUser = id=> users.find(user=>user.id === id)


const getUsersInRoom = (room_name)=>{
    room_name = room_name.toLowerCase()
    return users.filter(user=> user.chat_room === room_name)  
}

// const a = addUser({
//     id: 1,
//     username: 'RAjat',
//     chat_room: 'boston'
// })

// const b = addUser({
//     id: 3,
//     username: 'Deepthi',
//     chat_room: 'Houston'
// })

// const c  = addUser({
//     id: 5,
//     username: 'Johnny',
//     chat_room: 'Boston'
// })

// // const {removedUser,error} = removeUser(3);
// console.log('Removed user',removeUser(3))
// console.log(users)

// console.log(users)
// const gotUser = getUsersInRoom('Boston')
// console.log(gotUser)

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}