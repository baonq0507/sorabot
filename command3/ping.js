const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { THUMBNAIL } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Kiểm tra độ trễ server'),
    async execute(interaction) {
        await interaction.deferReply()
        const reply = await interaction.fetchReply()

        const ping = reply.createdTimestamp - interaction.createdTimestamp

        const embed = new EmbedBuilder()
           .setTitle('🏓 Pong!')
           .setDescription(`Độ trễ: ${ping}ms`)
           .setColor(ping > 200 ? 'Red' : 'Green')
           .setThumbnail(THUMBNAIL)
           .setTimestamp();
        interaction.editReply({ embeds: [embed] });
    }
}