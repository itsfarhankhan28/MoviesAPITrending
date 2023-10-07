const express = require('express')
const mongoose = require('mongoose')
const app = express()
const fileupload = require('./api/route')
const {cloudinaryConfig} = require('./config/cloudinaryconfig')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

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
mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})