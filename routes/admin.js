var express = require('express');
const { calculateObjectSize } = require('mongodb/lib/bson');
const { response } = require('../app');
const adminHelpers = require('../helpers/admin-helpers');
const { addadmin } = require('../helpers/admin-helpers');
var router = express.Router();
var adminHelper=require('../helpers/admin-helpers');
const userHelper = require('../helpers/user-helper');



router.get('/', (req, res)=> {
    if(req.session.admin){
 adminHelper.getAllUsers().then((users)=>{
              res.render('admin/view-users',{Admin:true,ADMIN:true,users})
            })
       
        
        
    }else{
        res.redirect('admin/admin-login')
    }
    
})



router.get('/admin-login',(req,res)=>{
  if(req.session.admin){
    res.redirect('/admin')
  }
  else{
     res.render('admin/admin-login', {adminErr:req.session.adminErr,Admin:true})
     req.session.adminErr=false
  }

   

});

router.post('/admin-login',async(req,res)=>{
const {email, Password} = req.body
   let response= await adminHelpers.doLoginAdmin({email,Password})
   if(response.status){
    req.session.admin = response.admin;
    res.redirect('/admin')
   }else{
    req.session.adminErr=true
    res.redirect('/admin')
   }
   
})

router.get("/edit-user/:id",async(req, res) => {
  
  
  if(req.session.admin){

    
    let user = await adminHelper.getUserDetails(req.params.id);
    console.log(user);




    res.render("admin/edit-user",{user,Admin:true});
          
           
           
       }else{
           res.redirect('/admin')
       }
  
  
 });
  
  router.post("/edit-user/:id", async(req,res) => {
   
    let user = await adminHelper.getUserDetails(req.params.id);
    console.log(user);

    adminHelper.updateUser(req.params.id,req.body).then((response) => {
     
  
      if(response.exist) {
         
        res.render("admin/edit-user",{user,Admin:true,exist:true});
      }
      else{
   res.redirect("/admin");
      }
     
    });
  });


  router.get('/delete-user/:id',(req,res)=>{
    if(req.session.admin){
      let userId=req.params.id
          adminHelper.deleteUser(userId).then((response)=>{
            res.redirect("/admin");
          })

    }
    else{
      res.redirect('/admin')

    }
    
   
  
  })



  router.get('/add-user',(req,res)=>{

    if(req.session.admin){
    res.render('admin/add-user',{Admin:true})

    }
    else{
      res.redirect('/admin')
    }

   
  })


  router.post('/add-user',(req,res)=>{

   let adduser=req.session.add
    
    if(req.session.admin){

    
    adminHelper.addusers(req.body).then((response)=>{
      if(response.exist){
        res.render('admin/add-user',{Admin:true,exist:true})
      }
      else{
        res.redirect("/admin"); 
      }
    })
  }
  else{
    res.redirect("/admin")
  }

})
    // adminHelper.addusers(req.body,(response)=>{
    //   console.log(response.exist);
    //   if (response) {
    //    
    //   }
    //   else{
    //      res.redirect("/admin");
    //   }
     
    // })



router.get('/logout',(req, res)=>{
  delete req.session.admin
  res.redirect('/admin')
})


module.exports = router;


