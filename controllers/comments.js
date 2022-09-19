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
// need to redirect to the player details by the player_id
router.put('/:id', (req, res) => {
    db.comment.update({
        description: req.body.description
    },
    {
        where: { id: req.params.id}
    })
    console.log('%%%%%%%%REQ.PARAMS', req.body)
    res.redirect(`/users/profile/favorites`)
    // // below is going to the api player ID rather than the player_id from the db. 
    // res.redirect(`/players/${req.params.id}`)
    // res.send('test')
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