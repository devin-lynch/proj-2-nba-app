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
        let players = `https://www.balldontlie.io/api/v1/players`
        axios.get(players)
            .then(response => {
                let allPlayers = response.data
                console.log(allPlayers)
                res.json(allPlayers)
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
                res.json(player)
            })
    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})



module.exports = router