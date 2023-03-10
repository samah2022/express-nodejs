const mongoose=require('mongoose');
const Role= mongoose.model('Role',{
    name:{
        type: String
    }
})
module.exports = Role;