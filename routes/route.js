const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

const {Create , Delete , GET , GetById , GetByQuery} = require('../controllers/uploadcontrol')

router.post('/create',upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]),Create)

router.get('/get',GET)

router.get('/:id',GetById)

router.get('/',GetByQuery)

router.delete('/:id',Delete)

module.exports = router