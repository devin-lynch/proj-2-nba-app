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

// router.get('/', (req, res) => {
//     res.render('players/index.ejs')
// })

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
        axios.get(playerUrl)
            .then(response => {
                let player = response.data
                console.log(player)
                
                // res.json(player)
                res.render('players/show.ejs', { player: player })

            })
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
                player_id: req.body.player_id
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

// router.post('/:id', async (req, res) => {
//     try {
//         const newComment = await db.comment.create({
//             description: req.body.description,
//             userId: res.locals.user.id
//         })
//         // need to attach player and user to comment
//         console.log(comment)
//         res.redirect('/users/profile/favorites')
//     } catch(err) {
//         console.warn(err)
//         res.send(`Server Error!`)
//     }
// })


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





module.exports = router