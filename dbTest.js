const db = require('./models')

async function createPlayer() {
    try {
        const newPlayer = await db.player.create({
            player_id: 666682,
            first_name: 'Keldon',
            last_name: 'Johnson',
            position: 'F',
            height_feet: 6,
            height_inches: 6,
            teamId: 27
        })
        newPlayer.createComment({
            description: 'Big year coming up!'
        })
        // how to attach user
        
    } catch(err) {
        console.warn(err)
        res.send(`Console Error!`)
    }
}

// createPlayer()
