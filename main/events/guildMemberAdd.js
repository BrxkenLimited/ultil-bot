module.exports = {
    name: 'guildMemberAdd',

    execute(user, Discord, client){
        
        if(user.guild.id !== client.config.server.id) return;
        
        let logsChannel = client.channels.cache.find((g) => g.id == client.config.server.channels.welcome)

        logsChannel.send({embeds: [
            new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Member Joined!')
            .setThumbnail(user.user.displayAvatarURL())
            .setDescription(
                `<@${user.user.id}> joined the server!!`
            )
        ]})
    }
}