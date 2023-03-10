const express=require('express');
const router=express.Router();
const Role=require('../models/role');
//Method1 create
router.post('/add',(req, res) =>{
    data=req.body;
    role= new Role(data);
    role.save()
        .then((savedRole)=>{
          res.send(savedRole);
        })
        .catch((err)=>{
          res.send(err)
        });
});
//Method2 create
router.post('/create',async(req,res)=>{
    try{
        data=req.body;
        role=new Role(data);
        savedRole= await role.save();
        res.send(savedRole)
    }
    catch(err){
      res.send(err)
    }
});
//Method 1 get
router.get('/getall',(req,res)=>{
    Role.find()
    .then(
        (roles)=>{
      res.send(roles);
      console.log("getall work");
    })
    .catch((err)=>{
        res.send(err)
      })
});
// Method 2 get
router.get('/all',async(req,res)=>{
    try{
     roles=await Role.find({"name":"Manager"});
     res.send(roles);
    }
    catch(err){
      res.send(err);
    }
});
// Method 2 Get By id
router.get("/:id",async(req,res)=>{
try{
    role_id=req.params.id;
    role=await Role.findById({_id:role_id})
    res.send(role);
}
catch(err){
    res.send(err)
}
});
router.put('/update/:id',async(req,res)=>{
    try{
        id=req.params.id;
        newRole=req.body;
        updated=await Role.findByIdAndUpdate({_id:id},newRole);
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
        roles=await Role.findOneAndDelete({_id:id});
        res.send(roles);
        console.log('delete work')
    }
    catch(err){
      res.send(err)
    }
});
module.exports = router