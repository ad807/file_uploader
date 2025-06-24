const express = require('express')
const router = express.Router();
const {body,validationResult} = require('express-validator')
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get('/register',(req,res)=>{
res.render('register')
})

router.post('/register',
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min: 5}),
     body('username').trim().isLength({min: 3})
    ,async (req,res )=>{
  const errors =validationResult(req);

   if(!errors.isEmpty()){
    return res.status(400).json({
        errors : errors.array(),
        message: "invalid credentials"
    })
   }
   const {username , email , password}= req.body;

   const hashpassword = await bcrypt.hash(password,10);

 const newuser = await userModel.create({
username:username,
email:email,
password:hashpassword,
   }) 
   res.status(200).json({
    newuser,
    message:  "user registered successfully"
   })

})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.post('/login', 

    body('password').trim().isLength({min: 5}),
     body('username').trim().isLength({min: 3})
    ,async (req,res )=>{
  const errors =validationResult(req);

   if(!errors.isEmpty()){
    return res.status(400).json({
        errors : errors.array(),
        message: "invalid credentials"
    })
   }
   const {username , password}= req.body;

   

 const user = await userModel.findOne({
username:username,
   }) 

   if(!user){
    return res.status(400).json({
        
        message: "invalid credentials"
    })
   }

   const ismatch =await
   
   bcrypt.compare(password,user.password)

   if(!ismatch){
     return res.status(400).json({
        
        message: "invalid credentials"
    })
   }
   const token = jwt.sign({
    userId:user._id,
    email:user.email,
    username:user.username
   }  , process.env.JWT_SECRET,
)


res.cookie('token', token);

res.send('logged in')

})

module.exports = router