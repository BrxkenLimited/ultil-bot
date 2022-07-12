const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Bot help command!'),

    async execute(Discord, client, interaction){
        
        let clientCommands = new Array()
        let commandListArray = new Array();
        
        const commandFolders = fs.readdirSync('./commands/')
        commandFolders.forEach((folder) => {
            const commandFiles = fs.readdirSync('./commands/' + folder).filter(file => file.endsWith('.js'))
            commandFiles.forEach((file) => {
                const command = require('../../commands/' + folder + '/' + file)
                commandListArray.push({folder: folder, file: file, command: '/' + command.data.toJSON().name})
            })
        })

        let commandArray = commandListArray.reduce((a, b) => Object.assign(a, { [b.folder]: ( a[b.folder] || [] ).concat(b) }), {})
        Object.keys(commandArray).forEach((key) => {
            if(key == 'nsfw'){
                if(message.channel.nsfw){
                    let commands = {
                        name: key.toUpperCase() + ':',
                        value: commandArray[key].map(obj => '`' + obj.command + '`').join(', ')
                    }
                    clientCommands.push(commands)
                }
                else{
                    let commands = {
                        name: key.toUpperCase() + ':',
                        value: 'Only available in NSFW channel!'
                    }
                    clientCommands.push(commands)
                }
            }
            else{
                let commands = {
                    name: key.toUpperCase() + ':',
                    value: commandArray[key].map(obj => '`' + obj.command + '`').join(', ')
                }
                clientCommands.push(commands)
            }
        })

        let botInvite = client.config.user.beta.inviteURL;
        if(process.env.token){botInvite = client.config.user.main.inviteURL}
        
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(client.user.username + ' | Help')
            .setDescription('Bot help command!')
            .setColor("GREEN")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(clientCommands)
            .addFields(
                {
                    name: 'Links:',
                    value:
                        ':small_blue_diamond: [Invite](' + botInvite + ')' + '\n' +
                        ':small_blue_diamond: [Vote - Top.gg](' + client.config.vote.topgg + ')' + '\n' +
                        ':small_blue_diamond: [Support Server](' + client.config.server.invite + ')' + '\n'
                }
            )
            .setFooter({text: client.user.username + ' developed by ' + client.config.developer.tag})

        interaction.reply({embeds: [helpEmbed]})
    }
}