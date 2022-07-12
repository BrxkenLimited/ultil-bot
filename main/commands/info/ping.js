const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping'),
  
  async execute(Discord, client, interaction)  => {
    
        const pingEmbed = new client.Discord.MessageEmbed()
            .setTitle(':signal_strength: Bot Ping')
            .addField("API Ping", `${client.ws.ping}ms`, true)
            .setFooter({ text: `Pinged ! `, iconURL: `${client.user.displayAvatarURL()}` });

        await interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [pingEmbed] });

    }
};
