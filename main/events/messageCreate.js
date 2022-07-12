module.exports = {
    name: 'messageCreate',

    async execute(message, Discord, client){

        if(message.author.bot) return;
        if(message.channel.type == 'DM'){            
            let dmLogsChannel = client.channels.cache.find(channel => channel.id == client.config.logs.dmsChannel)
            const dm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('`' + message.content + '`')
            
            dmLogsChannel.send({embeds: [dm] })
            
            return message.channel.send('Please use commands inside a server!')
        }

    }
}