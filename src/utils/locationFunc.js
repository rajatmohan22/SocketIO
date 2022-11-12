const moment = require('moment')

module.exports = (locationString)=>{
    return {
        locationString:locationString,
        createdAt: moment(new Date().getTime()).format('h:mm:ss a')
    }
}