let clientToReturn;

module.exports = {
    discordBot: function(config){
        main(config)
        this.discordClient = () => {
            return clientToReturn
        }
    }
}

const main = (config) => {

    const fs = require('fs')
    const Discord = require('discord.js')
    const client = new Discord.Client(
         {
            intents: [
                Discord.Intents.FLAGS.GUILDS,
                Discord.Intents.FLAGS.DIRECT_MESSAGES,
                Discord.Intents.FLAGS.GUILD_MESSAGES,
                Discord.Intents.FLAGS.GUILD_MEMBERS
            ],
            partials: ["CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "MESSAGE", "REACTION", "USER"]
        }
    )
    let token = process.env.token || config.user.beta.token

    client.config = config
    client.wait = require('node:timers/promises').setTimeout;
    client.login(token)

    client.events = new Discord.Collection();
    client.commands = new Discord.Collection();

    if(token == process.env.token || token == client.config.user.main.token){
        process.on("unhandledRejection", e => {
            console.log('An unhandledRejection occured:\n' + e)
        });
        
        process.on("uncaughtException", e => {
            console.log('An uncaughtException occured:\n' + e)
        });
    }

    const handlerFiles = fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'));
    handlerFiles.forEach(handler => {
        require('./handlers/' + handler)(client, Discord)
    })
    require('./setStatus')(Discord, client)

    function returnDiscordClient(){
        return client;
    }
    clientToReturn = returnDiscordClient()
}