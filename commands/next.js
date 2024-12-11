const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'next',
    description: 'Next the music',

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Bạn phải tham gia một kênh thoại để chuyển nhạc!');

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        connection.destroy();
        message.reply('Đã chuyển nhạc!');
    }

}