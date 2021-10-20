const Product = require('../models/products');


module.exports = {
    getAllProducts: async (req, res) => {
      try {
        const result = await Product.find();
        
        var productGrid = [];
        var colGrid = 4;
        for(var i = 0;i<result.length;i++){
          productGrid.push( result.slice(i,i+colGrid))
        };
       
        res.render('index2',{ products: result ,success:''});
    
      } catch (error) {
        console.log(error);
      }
     
    }

}

