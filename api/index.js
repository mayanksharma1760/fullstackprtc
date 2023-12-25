const express=require('express');
const mongoose=require('mongoose');
const  User  = require('./model/userSchema');

const app=express();
app.use(express.json());

const mongodb='mongodb+srv://mayanksharmapandat1770:mayank@cluster0.uwfmkfq.mongodb.net/';

const conn=mongoose.connect(mongodb);
if(conn)console.log('mera selection hogya h!!!');
else console.log('selection nhi hua');


app.get('/',(req,res) =>{
  res.send('backend project by himnk')  
})

app.post('/register',async(req,res)=>{
    const {name , email , phone , work , password , cpassword}=req.body;

    try{
        const userExisted=await User.find({email});
        if(userExisted){
            res.json('user already existed');
        }else{
            const userCreate=User.create({
                name, email , phone , work , password , cpassword
            }) ;
            if(userCreate) res.json({message:'user Registered successfully'});
            else  res.json({error:'failed to regidtered'});
        }
    }catch(err){
        throw err;
    }
})

app.listen(8000);