var express = require('express');
const { resolveBSONOptions } = require('mongodb/lib/bson');
const { response } = require('../app');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient
const userhelper=require('../helpers/user-helper')
/* GET home page. */
router.get('/', function(req, res, next) {
  
    let user=req.session.user
    console.log(user);
    


  let products=[{
    name:"laptop",
    discription:"Some quick example text to build on the card title and make",
    img:"https://rukminim1.flixcart.com/image/312/312/xif0q/computer/y/t/u/-original-imaghhe6ttguxzkq.jpeg?q=70",
    button:"add to cart"


  },
  {
    name:"laptop",
    discription:"Some quick example text to build on the card title and make",
    img:"https://rukminim1.flixcart.com/image/312/312/xif0q/computer/y/t/u/-original-imaghhe6ttguxzkq.jpeg?q=70",
    button:"add to cart"

  },
  
  {
    name:"laptop",
    discription:"Some quick example text to build on the card title and make",
    img:"https://rukminim1.flixcart.com/image/312/312/xif0q/computer/y/t/u/-original-imaghhe6ttguxzkq.jpeg?q=70",
    button:"add to cart"

  },
  
  {
    name:"laptop",
    discription:"Some quick example text to build on the card title and make",
    img:"https://rukminim1.flixcart.com/image/312/312/xif0q/computer/y/t/u/-original-imaghhe6ttguxzkq.jpeg?q=70",
    button:"add to cart"

  }
  
  
]
res.render('index',{products,user});
})

router.get('/login',(req,res)=>{
  console.log(req.session.user);
  if(req.session.user){
    console.log(req.session.user);
    res.redirect('/')
  }else{
     res.render('login',{'loginErr':req.session.userloginErr})
     req.session.userloginErr=false
    }
 
})

router.get('/signup',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }
   res.render('signup',{exist:false})
 
})

router.post('/signup',(req,res)=>{
  userhelper.doSignup(req.body).then((response)=>{
    console.log(response.exist);
   if(response.exist){
    res.render('signup',{exist:true})
   }
   else{
    req.session.user=response
    req.session.user.loggedIn=true
    res.redirect('/')
  }
  })
})

router.post('/login',(req,res)=>{
  // console.log(req.body);
  userhelper.doLogin(req.body).then((response)=>{
    
    if(response.status){
      req.session.user=response.user
      req.session.user.loggedIn=true
      

      res.redirect('/')
    }
    else{
      req.session.userloginErr="invalid username or password"
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  delete req.session.user
  res.redirect('/')
})

module.exports = router;
