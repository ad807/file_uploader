const mongoose = require('mongoose');

function connectedtoDB(){
   mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database');
   });
}

module.exports = connectedtoDB;