const moment = require('moment')

module.exports = (user,locationString)=>{
    const {username} = user
    return {
        username,
        locationString:locationString,
        createdAt: moment(new Date().getTime()).format('h:mm:ss a')
    }
}