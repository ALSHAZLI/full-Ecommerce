const mongoose = require('mongoose');
const { MONGO_URL } = require('../conf');


mongoose.set('useCreateIndex', true);

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(()=>console.log('database conected for products'))
    .catch(err =>{console.log(err)});

const productSchema = new mongoose.Schema({
    imagepath :{
        type: String,
        required: true
    },
    price:{
        type: Number,
        require: true
    },
    cat:{
        type: String,
        require: true
    }

});

module.exports = mongoose.model('Product', productSchema);
