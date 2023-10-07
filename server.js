const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const fileupload = require('./routes/route')
const {cloudinaryConfig} = require('./config/cloudinaryconfig')
const path = require('path')
const cors = require('cors')

app.use(cors({
    origin:'https://cine-base.vercel.app',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true
}))
app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('*',cloudinaryConfig)

//route
app.use('/trendingmovies',fileupload)

app.get('/',(req,res)=>{
    res.json("This is the home page")
})

//mongodb connection
const DB = "mongodb+srv://fk28:farhankhan123@cluster0.fq2ibrs.mongodb.net/test"

mongoose.connect(DB , {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})