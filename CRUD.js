const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/prj1' , 
{ 
   useNewUrlParser: true , 
   useUnifiedTopology: true 
} 

)
.then(()=> console.log('successfully connected to MongoDb ...'))
.catch(err => console.log(err))

//create schema :

const messageSchema = new mongoose.Schema({

    senderID : Number,
    recieverID : Number,
    senderName : String ,
    recieverName : String , 
    message : String ,
    timeStamp : {type:Date,default:Date.now()} 
})

//create model CLASS from schema :

const Message = mongoose.model('message' , messageSchema)


//CRUD :

 const createMessage = (message)=>{

    const newMessage = new Message(message) 
    
    try {

        result = await newMessage.save()
        return Promise.resolve(result)

    }catch(ex){
        return Promise.reject()
    }
    
    
 }
 
 