const express=require('express');
const RoleRoute=require("./routes/role")
const UserRoute=require("./routes/user")
//middleware
const auth = require('./middleware/auth');


require("./config/connect");

const app= express();
app.use(express.json());
//http://localhost:3000/role/create
app.use("/role",RoleRoute);
//http://localhost:3000/user/create
app.use("/user",UserRoute);
app.use("/getimage", express.static('./uploads'));

app.listen(4000, ()=>{
    console.log("server work")
});