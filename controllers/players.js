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