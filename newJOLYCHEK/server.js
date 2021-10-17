const express = require('express');
const app = express();
app.set('view engine','ejs');
app.set("views", __dirname + "/views")


app.get('/',(req,res)=>{
    res.render('index');
});




const PORT =  3000;
app.listen(PORT,()=> console.info(`server runing in port ${PORT}`));