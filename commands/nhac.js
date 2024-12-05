//bot nghe nhạc

const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder } = require("discord.js");
const { PREFIX, NHACCOMMAND } = process.env;
const playdl = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(NHACCOMMAND)
        .setDescription("Phát nhạc"),
    async execute(message, args) {
        if (message.author.bot) return;

        const url = args[0];
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return message.reply('Link nhạc không hợp lệ!');
        }

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('Bạn phải tham gia một kênh thoại để phát nhạc!');
        }

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            // Kiểm tra URL và tạo stream
            let stream;
            try {
                stream = await playdl.stream(url);
            } catch (err) {
                console.error("Lỗi khi tạo stream:", err);
                return message.reply("Không thể phát nhạc từ URL này!");
            }

            // Tạo resource và player
            const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
                inlineVolume: true
            });

            const player = createAudioPlayer();

            // Thêm event listener để xử lý lỗi
            player.on('error', error => {
                console.error('Lỗi phát nhạc:', error);
                message.channel.send('Có lỗi xảy ra khi phát nhạc!');
            });

            // Kết nối và phát nhạc
            connection.subscribe(player);
            player.play(resource);

            // Kiểm tra trạng thái phát
            if (player.state.status === 'playing') {
                message.reply(`Đang phát nhạc từ: ${url}`);
            } else {
                message.reply('Không thể phát nhạc, vui lòng thử lại!');
            }
        } catch (error) {
            console.error(error);
            message.reply('Có lỗi xảy ra khi phát nhạc!');
        }
    }
}
