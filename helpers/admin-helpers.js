//admin created user datas

var db=require('../config/connection')
const collections = require('../config/collections');
const { Collection } = require('mongodb');
const { response } = require('../app');
const bcrypt=require('bcrypt')
var objectId=require('mongodb').ObjectId
module.exports={


    addusers:(user)=>{
        return new Promise (async(resolve,reject)=>{

            let adduserid=await db.get().collection(collections.USERSIGNUP_COLLECTION).findOne({email:user.email})

            console.log(adduserid);
            if(adduserid){
               
                resolve({exist:true})
            }
            else{ 
            user.Password=await bcrypt.hash(user.Password,10)
        db.get().collection(collections.USERSIGNUP_COLLECTION).insertOne(user).then((data)=>{
            resolve(data)
            
       
       
        })
                
            }
           
     })
        
    },


    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users=await db.get().collection(collections.USERSIGNUP_COLLECTION).find().toArray()
        //    console.log(users);
            resolve(users)
        })
    },


    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USERSIGNUP_COLLECTION).deleteOne({_id:objectId(userId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },

    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USERSIGNUP_COLLECTION).findOne({_id:objectId(userId)}).then((user)=>{
               
                resolve(user)
            })
        })
    },
    updateUser:(userId,userDetails)=>{
        return new Promise(async(resolve,reject)=>{
           
                console.log(userDetails);
            let updatedetails=await db.get().collection(collections.USERSIGNUP_COLLECTION).findOne({email:userDetails.email})
            if(updatedetails){
                resolve({exist:true})
            }
            else{
                db.get().collection(collections.USERSIGNUP_COLLECTION)
            .updateOne({_id:objectId(userId)},{
                $set:{
                    name:userDetails.name,
                    email:userDetails.email
                }
            }).then(()=>{
                resolve({updated:true})
            })
            }

            
        })
    },

    doLoginAdmin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            
            let response={}
            let admin =await db.get().collection(collections.ADMIN_COLLECTION).findOne({email:adminData.email})
            if(admin){
                bcrypt.compare(adminData.Password,admin.Password).then((status)=>{
                    if(status){
                        console.log('ok');
                       
                        response.admin=admin
                        
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
                console.log('no admin found');
                resolve({status:false})
            }
        })
    }




//     adminlogin:(adminData)=>{
//         return new Promise (async(resolve,reject)=>{
            
            
//             let admin=await db.get().collection(collections.ADMIN_COLLECTION).findOne({email:adminData.email})
//             if(admin){
//                 bcrypt.compare(adminData.Password,admin.Password).then(()=>{

//                 })

//             }
//         })
//     }

// }

//collections not collection

// doLogin:(userdata)=>{
//     return new Promise(async(resolve,reject)=>{
//         let loginstatus=false
//         let response={}
//         let user =await db.get().collection(collections.USERSIGNUP_COLLECTION).findOne({email:userdata.email})
//         if(user){
//             bcrypt.compare(userdata.Password,user.Password).then((status)=>{
//                 if(status){
//                     console.log('ok');
//                     response.user=user
//                     response.status=true;
//                     resolve(response)
//                 }
//                 else{
//                     console.log('fail');
//                     resolve({status:false})
//                 }
//             })
//         }
//         else{
//             console.log('no user');
//             resolve({status:false})
//         }
//     })
// 


// this is i just used for add a admin in a sepratae collection 
// addadmin:(admin,callback)=>{
//     return new Promise (async(resolve,reject)=>{
//         admin.Password=await bcrypt.hash(admin.Password,10)
//     db.get().collection(collections.ADMIN_COLLECTION).insertOne(admin).then((admin)=>{
//         resolve(admin)
        
   
   
//     })
//  })
    
}