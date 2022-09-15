const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')

// GET players
// router.get('/', async (req, res) => {
//     try {
//         const players = await db.player.findAll({})
//             res.render('players/index.ejs', { players: players } )
//         } catch(err) {
//         console.warn(err)
//         res.send(`Server Error!`)
//     }
// })

router.get('/', async (req, res) => {
    try {
        let playersUrl = `https://www.balldontlie.io/api/v1/players`
        axios.get(playersUrl)
            .then(response => {
                let players = response.data
                console.log(players)
                res.json(players)
                // res.render('players/index.ejs', { players: players })
            })
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



module.exports = router