module.exports = {
    name: 'guildMemberRemove',

    execute(user, Discord, client){
        
        if(user.guild.id !== client.config.server.id) return;
        
        let logsChannel = client.channels.cache.find((g) => g.id == client.config.server.channels.bye)

        logsChannel.send({embeds: [
            new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Member Left!')
            .setThumbnail(user.user.displayAvatarURL())
            .setDescription(
                `${user.user.tag} left the server!`
            )
        ]})
    }
}