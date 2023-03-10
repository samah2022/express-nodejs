const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const multer=require('multer');
filename='';
const myStorage= multer.diskStorage({
  destination:'./uploads',
  filename:(req,file,redirect)=>{
    let date=Date.now();
    //mimetype => image/png
    let fl=date+'.'+file.mimetype.split("/")[1];
    redirect(null,fl);
    filename=fl;
  }
});
const upload= multer({storage: myStorage});
//Register
router.post('/register',async(req,res)=>{
  data=req.body;
  user=new User(data);
  const salt= bcrypt.genSaltSync(10);
  cryptedPass= await bcrypt.hashSync(data.password, salt);
  user.password= cryptedPass;
  console.log(cryptedPass);
  user.save()
  .then((saved)=>res.status(201).json(saved))
  .catch((error)=>res.status(400).json({error}))
})

//Login
router.post('/login',async(req,res)=>{
  data=req.body;
  user= await User.findOne({mail: data.mail});
  if(!user){
    res.status(401).json('mail ou mot passe invalide!')
  }
  else{
    validpass=bcrypt.compareSync(data.password,user.password);
    if(!validpass){
      res.status(401).json('mail ou mot passe invalide!')
    }
    //valid password and mail
    else{
     payload= {
      _id:user._id,
      mail:user.mail,
      firstname:user.firstname
     }
     token=jwt.sign(payload,'123456', { expiresIn: '24h' });
     res.status(200).json({mytoken:token})
    }
  }
})
//Method1 create
router.post('/add',(req, res) =>{
    data=req.body;
    console.log(data);
    user= new User(data);
    user.save()
        .then((savedUser)=>{
           res.send(savedUser);
        })
        .catch((err)=>{
          res.send(err)
        });
});
//Method2 create
router.post('/create', upload.any('image'), async(req,res)=>{
    try{
        data=req.body;
        user=new User(data);
        //user.image= filename;
        savedUser= await user.save();
        filename='';
        res.status(200).send(savedUser);
    }
    catch(err){
      res.send(err)
    }
});
//Method 1 get
router.get('/getall',(req,res)=>{
  User.find()
    .then(
        (users)=>{
      res.send(users);
      console.log("getall work");
    })
    .catch((err)=>{
        res.send(err)
      })
});
// Method 2 get
router.get('/all',async(req,res)=>{
    try{
     users=await User.find({"name":"Manager"});
     res.send(users);
    }
    catch(err){
      res.send(err);
    }
});
// Method 2 Get By id
router.get("/getbyid/:id",async(req,res)=>{
try{
    user_id=req.params.id;
    user=await User.findById({_id:user_id})
    res.send(user);
}
catch(err){
    res.send(err)
}
});
router.put('/update/:id',async(req,res)=>{
    try{
        id=req.params.id;
        newUser=req.body;
        updated=await User.findByIdAndUpdate({_id:id},newUser);
        res.status(200).send(updated);
        console.log("update work")
    }
    catch(err){
      res.state(400).send(err)
    }
});
router.delete('/delete/:id',async(req,res)=>{
    try{
        id=req.params.id;
        users=await User.findOneAndDelete({_id:id});
        res.send(users);
        console.log('delete work')
    }
    catch(err){
      res.send(err)
    }
});
module.exports = router