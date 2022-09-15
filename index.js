// required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')
const methodOverride = require('method-override')


console.log('server secret:', process.env.ENC_SECRET)

// config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))
// our customer auth middleware
app.use(async (req, res, next) => {
    // console.log('hello from a middleware 👋')
    res.locals.myData = 'hello, fellow route!'
    // if there is a cookie on the incoming request
    if (req.cookies.userId) {
        // decrypt the user id before we look up the user in the db
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET)
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)
        // look up the user in the db
        const user = await db.user.findByPk(decryptedIdString, {
            include: [db.player, db.comment]
        })
        // mount the user on the res.locals
        res.locals.user = user
        // if there is no cookie -- set the user to be null in the res.locals
    } else {
        res.locals.user = null
    }
    // move on to the next route or middleware in the chain
    next()
})



// // route definitions
// // put fetch request for API here
// app.get('/', (req, res) => {
//     let nbaUrl = 'https://www.balldontlie.io/api/v1/'
//     axios.get(nbaUrl).then(apiResponse => {
//         let nba = apiResponse.data.results;
//         console.log(nba)
//         res.render('home.ejs')
//     })
//     // console.log('incoming cookie 🍪', req.cookies)
//     // console.log(res.locals.myData)
//     console.log(`the currently logged in user is:`, res.locals.user)
// })

app.get('/', async (req, res) => {
    try {
        res.render('home.ejs')
    } catch(err) {
        console.warn(err)
    }
})



// Controllers
app.use('/users', require('./controllers/users'))
app.use('/players', require('./controllers/players'))
app.use('/teams', require('./controllers/teams'))

// listen on a port
app.listen(PORT, () => {
    console.log(`You or your loved ones may be entitled to compensation on port: ${PORT}`)
})