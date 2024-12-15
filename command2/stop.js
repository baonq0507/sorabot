const { joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder } = require("discord.js");
const { PREFIX, STOPCOMMAND } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName(STOPCOMMAND)
        .setDescription("Dừng nhạc"),
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Bạn phải tham gia một kênh thoại để dừng nhạc!');

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        connection.destroy();
        message.reply('Đã dừng nhạc!');
    }
}