

const bcrypt =require('bcrypt');
const User = require('../models/User');

module.exports = {
    LoginFunc : async (req, res) => {
        var username = req.body.username,
            password = req.body.password;
    
          try {
            var user = await User.findOne({ username: username }).exec();
            if(!user) {
              const result = await Product.find();
        
              var productGrid = [];
              var colGrid = 4;
              for(var i = 0;i<result.length;i++){
                productGrid.push( result.slice(i,i+colGrid))
              };
              res.render('index2', { products: result , success: 'invalid cradintials'});
            }
            const match = await bcrypt.compare(password, user.password);
    
            if(match) {
                console.log('true login sucsess');
            }
            req.session.user = user;
            res.redirect("/index-after-login.html");
            console.log('true login dashbord');
        } catch (error) {
          console.log(error)
          
        }
      }
}