const mongoose = require('mongoose')
const express = require('express')
const msgRoute=require('./msgRoute')
const userRoute = require('./userRoute')
const app = express();

mongoose.connect('mongodb://localhost/playground' , {
    useUnifiedTopology: true ,
    useNewUrlParser :true
}).then(()=>{

    console.log('Connected to mongoDb... ')
}).catch((err)=>{
    console.log('error accured')
})
app.use(express.json())
app.use('/api/messages' ,msgRoute)

port = process.env.PORT || 3000
app.listen(port , () => { console.log(`listen on port ${port}`) })
