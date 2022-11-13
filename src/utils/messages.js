const moment = require('moment')

const messageFunc = (user,text)=>{ /// user is an object
    const {username} = user
    // console.log(user,"This is coming from the messageFunc function")
    return {
        username,
        text,
        createdAt: moment(new Date().getTime()).format('h:mm:ss a')
    }
}

module.exports = messageFunc

