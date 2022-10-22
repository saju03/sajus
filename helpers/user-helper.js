// this file is used to manages the signup users datas not the admin created

var db=require('../config/connection')
const collections = require('../config/collections');
const bcrypt=require('bcrypt')

module.exports={
    doSignup:(userdata)=>{ 
        return new Promise(async(resolve, reject) => {
               let userDetailID = await db
        .get()
        .collection(collections.USERSIGNUP_COLLECTION)
        .findOne({ email: userdata.email });

       if(userDetailID){
        console.log('exist');
        resolve({exist:true})
       }
      else{
        
        userdata.Password=await bcrypt.hash(userdata.Password,10);
             db.get().collection(collections.USERSIGNUP_COLLECTION).insertOne(userdata).then((data)=>{
                resolve(data)
             })

       }
             
        })

       
    },
    doLogin:(userdata)=>{
        return new Promise(async(resolve,reject)=>{
            let loginstatus=false
            let response={}
            let user =await db.get().collection(collections.USERSIGNUP_COLLECTION).findOne({email:userdata.email})
            if(user){
                bcrypt.compare(userdata.Password,user.Password).then((status)=>{
                    if(status){
                        console.log('ok');
                        response.user=user
                        response.status=true;
                        resolve(response)
                    }
                    else{
                        console.log('fail');
                        resolve({status:false})
                    }
                })
            }
            else{
                console.log('no user');
                resolve({status:false})
            }
        })
    }

}