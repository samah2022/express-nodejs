const mongoose=require('mongoose');
const User= mongoose.model('User',{
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    image: {
        type: String
    },
    mail:{
        type: String
    },
    password: {
        type: String
    }
})
module.exports = User;