import express from 'express'
const router = express.Router()

router.get('/welcome', (req,res) => {
    res.status(200).json({ "status": `${req.t('success')}`, "data": `${req.t('welcome')}`})
})

module.exports = router