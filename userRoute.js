const mongoose=require('mongoose')
const express = require('express')
const route = express.Router()
const joi = require('joi')


// define user schema & model
const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    profilePic : String,
    telNumber : {type : Number , required : true}
}) 
const User = mongoose.model('user' , userSchema)
module.exports.User = User
// validator by joi

const userValidator=(user)=>{

    userObject = joi.object({

        name : joi.string().min(3),
        profilePic : joi.string(),
        telNumber:joi.number()
    })
    
    return userObject.validate(user)
}
route.get('/:id' ,async (req,res)=>{
    
    try {
        
        res.send(await User.find({_id : req.params.id}))
    } 
    catch {

        res.status(400).send('server error')
    }
})

route.post('/',async (req,res)=>{

    const {error} = userValidator(req.body)
    if (error) return res.status(400).send('server error , check request structure')
    
    try {

        const usr = new User({
            name : req.body.name , 
            profilePic :req.body.profilePic , 
            telNumber : req.body.telNumber
        })

        res.send(await usr.save())
    }
    catch(err) {
    
        res.status(400).send(err.message)
    }
})

route.put('/:id' , async (req,res)=>{

    const {error} = userValidator(req.body)
    if (error) return res.status(400).send('server error , check request structure')
    const user=await User.findById(req.params.id)
    if (!user) return res.status(400).send('check ID')
    
    try {

        
        user.set({

            name : req.body.name , 
            profilePic :req.body.profilePic , 
            telNumber : req.body.telNumber

        })
        
        res.send(await user.save())
    }
    catch(err) {
    
        res.status(400).send(err.message)
    }
    

})

module.exports = router