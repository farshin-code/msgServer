const mongoose=require('mongoose')
const express = require('express')
const route = express.Router()
const joi = require('joi')
const userRoute = require('./userRoute')
const User = userRoute.User

// define message schema & model
const messageSchema = new mongoose.Schema({
    sender : {
        senderID : {
            type : mongoose.Schema.Types.ObjectId,
            ref :'User'
        },
        senderName : String ,
        profilePic : String    
    },
    recieverID : { type :mongoose.Types.ObjectId , ref : 'User' },
    message : {type: String , required : true} ,
    timeStamp : {type:Date,default:Date.now()} 
})
const Message = mongoose.model('message' , messageSchema)

// validate message structure by 'joi'
const messageValidator = (message)=>{

    const msgSchema = joi.object({

        sender : {
            
            senderID : joi.string().min(3),
            senderName : joi.string().min(3),
            profilePic : joi.string()        
        },
        recieverID : joi.string(),
        message : joi.string().min(1) 

    })
    return msgSchema.validate(message)
}

route.get('/:id' , async (req,res)=>{
    
    try{
        res.send(await Message.find({recieverID : req.params.id}))
    }
    catch(ex){
        res.status(400).send('server error')
    }
})

route.post('/' , async (req,res) =>{
    
    try{
        //validate req with joi :
            const {error} = messageValidator(req.body)
            if (error) return res.status(400).send(`server error ${error.details[0].message}`)
                
        const msg = new Message({
            sender :{
                senderID : req.body.senderID,
                senderName : req.body.senderName , 
                profilePic : req.body.profilePic
             } ,
            recieverID : req.body.recieverID,
            message : req.body.message, 
        })
        res.send(await msg.save())
    }
    catch(ex){

        res.status(400).send(ex.message)
        
    }
})
route.delete('/:id' , (req,res)=>{

})
route.put('/:id' , (req,res)=>{

})

module.exports = route