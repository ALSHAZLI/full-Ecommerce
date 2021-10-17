const mongoose = require('mongoose');
const { MONGO_URL } = require('../conf');
const bcrybt =require('bcrypt');


mongoose.set('useCreateIndex', true);

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(()=>console.log('database conected'))
    .catch(err =>{console.log(err)});

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        unique: true,
        required: false
     },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});