const express = require('express');
dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.set('view engine','ejs');

const { check , validationResult  } = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-Parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { MONGO_URL } = require('./conf');
const User = require('./models/User');
// const Products = require('./models/productinit');
const Product = require('./models/products');

const bcrypt =require('bcrypt');
app.use(express.json());

app.use(express.static(path.join(__dirname + '/public')));




// set morgan to log info about our requests for development use.
app.use(morgan("dev"));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
// tet login 
app.get("/login2", (req, res) => {

  
  res.render('login2.ejs')

});
/////////////////////////////////////////////////////////////

// this for prodction server leater 
// hear i put limit for request using this libarery  const getRawBody = require('raw-body')
// If there is no limit on the size of requests, attackers can send requests with large request bodies that can exhaust server memory and/or fill disk space
// app.use(function (req, res, next) {
//   if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
//     next()
//     return
//   }

//   getRawBody(req, {
//     length: req.headers['content-length'],
//     limit: '1kb',
//     encoding: contentType.parse(req).parameters.charset
//   }, function (err, string) {
//     if (err) return next(err)
//     req.text = string
//     next()
//   })
// })













//////////////////////////////////////////////////////////

// route for Home-Page
app.get("/", (req, res) => {

  
  res.redirect('/ho');

});
app.get("/ho",async (req, res) => {
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
 
});

// route for user signup
app
  .route("/Register",[
    check('username').not().isEmpty().withMessage('pleas inter email her boss')
  ])
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/Register.html");
  })
  .post((req, res) => {
    
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password:req.body.password,
    });

    user.save(async(err, docs) => {
      if (!err) {
        res.redirect("/ho");
        await res.status(200).json();
        console.log(docs)
        req.session.user = docs;
        
      } else {
        console.log(err);
        
      }
    });
  });



// route for user Login
app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  })
  .post(async (req, res) => {
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
  });

// route for user's dashboard
app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.redirect("/login");
  }
});

// route for user logout
app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.info(`server runing in port ${PORT}`));
