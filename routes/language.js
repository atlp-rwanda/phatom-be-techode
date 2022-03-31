import express from 'express'
const router = express.Router()

router.get('/welcome', (req,res) => {
    res.status(200).json({ "status": `${req.t('success')}`, "data": `${req.t('welcome')}`})
})

<<<<<<< HEAD
export default router
=======
module.exports = router
>>>>>>> ch(translation) translates and returns data both in english and fresh up selected language
