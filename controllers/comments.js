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

// DELETES COMMENT.
router.delete('/:id', (req, res) => {
    console.log('%%%%%%%RIGHT HERE', req.body)
    db.comment.destroy({
        where: {
             id: req.params.id
             
         }
    })
    .then( () => {
        res.redirect(`/players/${req.body.player_id}`)
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
    db.comment.findOne({
        where: { id: req.params.id }
    })
    .then(comment => {
        res.redirect(`/players/${comment.playerId}`)
    })
})




router.get('/', async (req, res) => {
    try{ 
        const comments = await db.comment.findAll({})
        console.log(comments)
        res.render('comments/index.ejs', { comments: comments })
    } catch(err){
        console.warn(err)
        res.send(`Server Error!`)
    }
})




module.exports = router