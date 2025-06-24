const express = require('express')
const userRouter = require('./routes/user.routes');
const connectedtoDB = require('./config/db');
require('dotenv').config();
const cookieparser= require('cookie-parser');
const indexrouter = require('./routes/index.routes')
connectedtoDB();

const app =express();


app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.set('view engine','ejs' );

app.use('/' , indexrouter);
app.use('/user',userRouter);
app.listen(3000,(req,res)=>{
    console.log('server is listening to port 3000');
})

