const express = require('express');
const app = express()
const server = require('http').createServer(app)
const config = require('./config/discord.json')
const { discordBot } = require('./bot.js')
let client = (new discordBot(config)).discordClient()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
    res.render('home.ejs', {config: config, client: client})
})

let port = process.env.PORT || 5000
server.listen(port, () => {
    console.log('Server: listening at port: ' + port)
})