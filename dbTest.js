const db = require('./models')

async function createPlayer() {
    try {
        const newPlayer = await db.player.create({
            first_name: 'Keldon',
            last_name: 'Johnson',
            position: 'F',
            height_feet: '6',
            height_inches: '6',
            team_id: '27'
        })
    } catch(err) {
        console.warn(err)
        res.send(`Console Error!`)
    }
}

createPlayer()