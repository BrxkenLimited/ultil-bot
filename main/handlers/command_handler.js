const fs = require('fs');

module.exports = async (client, Discord) => {

    let clientID = client.config.user.beta.id;
    if(process.env.token){clientID = client.config.user.main.id}
    let token = process.env.token || client.config.user.beta.token
    const { REST } = require('@discordjs/rest')
    const { Routes } = require('discord-api-types/v9')
    const rest = new REST({version: '9'}).setToken(token)
    const commands = new Array();

    const commandFolders = fs.readdirSync('./commands/')
    for(const folder of commandFolders){

        const commandFiles = fs.readdirSync('./commands/' + folder).filter(file => file.endsWith('.js'))
        for(const file of commandFiles){

            const command = require('../commands/' + folder + '/' + file)
    
            if(command.data){
                commands.push(command.data.toJSON())
                client.commands.set(command.data.toJSON().name, command)
            }
        }
    }

    try{
        await rest.put(Routes.applicationCommands(clientID), {body: commands});
    }
    catch(error){
        console.error(error);
    }
}