// const exprees = require('express');
// const app = exprees();
// const mongoose = require('mongoose');
// const { MONGO_URL2 } = require('../config2');


// mongoose.set('useCreateIndex', true);

// mongoose.connect(MONGO_URL2,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
//     .then(()=>console.log('database conected for products'))
//     .catch(err =>{console.log(err)});



// const Product = require('./products');


// const Products = [  new Product({
//     imagepath:'https://assets.ajio.com/medias/sys_master/root/20210420/R70k/607ecc5baeb269a9e3972063/-288Wx360H-462323964-green-MODEL.jpg',
//     price: 105,
//     cat: 'fance sheart'
// }),
// new Product({
//     imagepath:'https://assets.ajio.com/medias/sys_master/root/20210420/R70k/607ecc5baeb269a9e3972063/-288Wx360H-462323964-green-MODEL.jpg',
//     price: 109,
//     cat: 'fance sheart2'
// }),



// ];

// for(var i= 0; i<Products.length; i++){
//     Products[i].save(async(err, docs) =>{
//         if(err){
//             console.log(err);
//         }else {
//             await console.log(docs);
//             done++
//             if(done === Products.length){
//                 mongoose.disconnect();
//             }
//         }
//     });
// };


