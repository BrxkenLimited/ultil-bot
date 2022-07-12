const fs = require('fs');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, Discord, client){

        if (!interaction.isCommand()) return;

        let commandFolders = fs.readdirSync('./commands/')
        for(const folder of commandFolders){

            let commandFiles = fs.readdirSync('./commands/' + folder).filter(file => file.endsWith('.js'))
            for(const file of commandFiles){

                const command = require('../commands/' + folder + '/' + file)

                if(command.data){
                    if(interaction.commandName == command.data.toJSON().name){
                        client.commands.get(command.data.toJSON().name).execute(Discord, client, interaction)
                    }
                }
            }
        }
    }
}