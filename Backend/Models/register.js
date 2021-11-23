const mongoose=require('mongoose');
 const bcrypt=require('bcryptjs');



const registerschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})


const registermodel=mongoose.model('register',registerschema);

/* const passwords="S2k3c0s2@"
;

const hashpassword=bcrypt.hash(passwords,10,(err,hash)=>{
    
const newuser=new registermodel({
     name:'abcd',
    email:'yugkhokhar18@gmail',
    password:hash,
})

newuser.save();

});  */


 module.exports=registermodel;
