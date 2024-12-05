const { joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music'),
    async execute(interaction, args) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.reply('Bạn phải tham gia một kênh thoại để dừng nhạc!');

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        connection.destroy();
        interaction.reply('Đã dừng nhạc!');
    }
}