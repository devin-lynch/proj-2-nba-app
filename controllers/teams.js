const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')

// GET all teams
router.get('/', async (req, res) => {
    try {
        let teamsUrl = 'https://www.balldontlie.io/api/v1/teams'
        axios.get(teamsUrl)
            .then(response => {
                let teams = response.data
                console.log(teams)
                res.json(teams)
            })
    } catch(err) {
        console.warn(err)
        res.send(`Server Error!`)
    }
})

// GET a specific team
router.get('/:id', async (req, res) => {
    try {
        let teamUrl = `https://www.balldontlie.io/api/v1/teams/${req.params.id}`
        axios.get(teamUrl)
            .then(response => {
                let team = response.data
                console.log(team)
                res.json(team)
            })
    } catch(err) {
        console.warn(err)
        res.send(`Sever Error!`)
    }
})



module.exports = router