const Uploads = require('../model/schema') 

const Create = async(req,res)=>{
    const {moviename , year , movietime , ratings , shortdescription , director , writer , stars , storyline , genres,media} = req.body
    try{
        if(req.files){
            const imageurl = req.files["image"][0].path
            const videourl = req.files["video"][0].path

            const uploads = new Uploads({
                moviename:moviename,
                year:year,
                movietime:movietime,
                ratings:ratings,
                shortdescription:shortdescription,
                director:director,
                writer:writer,
                stars:stars,
                storyline:storyline,
                genres:genres,
                media:[{
                    imageurl:imageurl,
                    videourl:videourl
                }]
            })

            const uploadresult = await uploads.save()

            res.json(uploadresult)
        }
    }catch(err){
        res.json(err)
    }
}

const GET = async(req,res)=>{
    try{
        const getMovies = await Uploads.find()
        res.json(getMovies)
    }catch(err){
        res.json(err)
    }
}

const GetById = async(req,res)=>{
    const id = req.params.id

    try{
        const getMovieById = await Uploads.findById(id)
        res.json(getMovieById)
    }catch(err){
        res.json(err)
    }
}

const Delete = async(req,res)=>{
    const id = req.params.id

    try{
        const deletedMovie = await Uploads.findByIdAndDelete(id)
        res.json(deletedMovie)
    }catch(err){
        res.status(400).json(err)
    }

}

//searching and filtering
const GetByQuery = async(req,res)=>{
    try{
        const {moviename , year , movietime , ratings , director , writer , stars} = req.query
        const queryObject = {}

        if(moviename){
            queryObject.moviename = {$regex:moviename,$options:'i'}
        }

        if(year){
            queryObject.year = year
        }

        if(movietime){
            queryObject.movietime = {$regex:movietime,$options:'i'}
        }

        if(ratings){
            queryObject.ratings = ratings
        }

        if(director){
            queryObject.director = {$regex:director,$options:'i'}
        }

        if(writer){
            queryObject.writer = {$regex:writer,$options:'i'}
        }

        if(stars){
            queryObject.stars = {$regex:stars,$options:'i'}
        }

        const getmoviesbyquery = await Uploads.find(queryObject)
        res.json(getmoviesbyquery)
    }catch(err){
        console.log(err)
    }
}

module.exports = {Create , Delete , GET , GetById , GetByQuery}