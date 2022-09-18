const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/', async (req, res) => {
    try {
        console.log('RIGHT HERE!!!!!!!!!', req.body)
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%', res.locals.user.dataValues.id)
        //findOrCreate the comment in the db
        const comment = await db.comment.findOrCreate({
            where: {
                description: req.body.description,
                userId: res.locals.user.dataValues.id,
                playerId: req.body.playerId
            }
        })
        res.redirect(`/players/${req.body.playerId}`)
    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})

// DELETES COMMENT. need to fix redirect to stay on same page
router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    db.comment.destroy({
        where: {
             id: req.params.id
             
         }
    })
    .then( () => {
        res.redirect(`/players`)
    })
})

// PUT edits comments
router.put('/:id', (req, res) => {
    db.comment.update({
        description: req.body.description
    },
    {
        where: { id: req.params.id}
    })
    res.redirect('/players')
})





module.exports = router