const moment = require('moment')

const messageFunc = (text)=>{
    return {
        text,
        createdAt: moment(new Date().getTime()).format('h:mm:ss a')
    }
}

module.exports = messageFunc

