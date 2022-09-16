const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/', async (req, res) => {
    try {
        console.log('RIGHT HERE!!!!!!!!!', req.body)
        //findOrCreate the comment in the db
        const [comment] = await db.comment.findOrCreate({
            where: {
                description: req.body.description,
                userId: res.locals.user,
                playerId: req.body.playerId
            }
        })
    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})






module.exports = router