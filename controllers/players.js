const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/', async (req, res) => {
    try {
        let playersUrl = `https://www.balldontlie.io/api/v1/players`
        axios.get(playersUrl)
            .then(response => {
                let players = response.data.data
                console.log(players)
                // res.json(players)
                res.render('players/index.ejs', { players: players })
            })
        } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})



// POSTS SEARCH RESULTS
router.post('/results', async (req, res) => {
    try{
        let playerUrl = `https://www.balldontlie.io/api/v1/players/?search=${req.body.first_name}`
        const response = await axios.get(playerUrl)
        const playerData = response.data.data
        console.log('RIIIIIIIIIIIIIIIIGHT HEEEEEEEERE', playerData)
        // res.json(playerData)
        res.render('players/results.ejs', { players: playerData })
    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})


// GET individual player
router.get('/:id', async (req, res) => {
    try {
        let playerUrl = `https://www.balldontlie.io/api/v1/players/${req.params.id}`
        const response = await axios.get(playerUrl)
        let player = response.data
        console.log(player)
        const comment = await db.comment.findAll({
            where: { playerId: req.params.id }
        })
        res.render('players/show.ejs', { player: player, comments: comment })
    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})


//POST fav player to db (users_players)
router.post('/', async (req, res) => {
    try {
        console.log('HERE!!!!!', req.body)
        //findOrCreate the player in the db
        const [player] = await db.player.findOrCreate({
            where: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                player_id: req.body.player_id,
                teamId: req.body.teamId
            }
        })
        //add the currently logged in user to the player we just found or created (res.locals.user)
        await res.locals.user.addPlayer(player)
        console.log('RIGHT HERE RIGHT HERE!!!', player,)
        res.redirect('/users/profile/favorites')
    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})



//DELETE route for players table
router.delete('/:playerId', (req, res) => {
    console.log(req.params.playerId)
    db.player.destroy({
        where: { id: req.params.playerId }
    })
        .then( () => {
            res.redirect('/users/profile/favorites')
        })
})

router.get('/:playerId/:id/edit', async (req, res) => {
    try {
        console.log('%%%%%%%% HEREEE %%%%%%%', req.params.playerId)
        const comment = await db.comment.findAll({
            where: {
                playerId: req.params.playerId,
                id: req.params.id
            }
        })
        console.log('%%%%%% COMMENT %%%%%%%', req.params.id)
        res.render('comments/edit.ejs', { comment: comment })

    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})



module.exports = router