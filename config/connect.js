const mongoose=require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/testdb")
        .then( ()=>{
           console.log('connected db')
        })
        .catch(
            (err)=>{
               console.log(err)
        });
module.exports=mongoose