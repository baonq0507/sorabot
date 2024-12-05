//bot nghe nhạc

const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder } = require("discord.js");
const { PREFIX, NHACCOMMAND } = process.env;
const ytdl = require('ytdl-core');
const play = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(NHACCOMMAND)
        .setDescription("Phát nhạc từ YouTube"),
    async execute(message, args) {
        if (message.author.bot) return;

        const url = args[0];
        if (!url) {
            return message.reply('Vui lòng cung cấp link YouTube!');
        }

        // Kiểm tra xem có phải link YouTube không
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return message.reply('Vui lòng cung cấp một link YouTube hợp lệ!');
        }

        if (!await ytdl.validateURL(url)) {
            return message.reply('Link YouTube không hợp lệ hoặc không thể phát!');
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

            const stream = await play.stream(url);
            const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
                inlineVolume: true
            });
            const player = createAudioPlayer();

            connection.subscribe(player);
            player.play(resource);

            // Lấy thông tin video từ play-dl thay vì ytdl
            const videoInfo = await play.video_info(url);
            const videoTitle = videoInfo.video_details.title;

            player.on('error', (error) => {
                console.error(`Có lỗi xảy ra khi phát nhạc: ${error.message}`);
                message.reply('Có lỗi xảy ra khi phát nhạc!');
                connection.destroy();
            });

            message.reply(`🎵 Đang phát: ${videoTitle}`);
        } catch (error) {
            console.error(error);
            message.reply('Có lỗi xảy ra khi phát nhạc từ YouTube!');
        }
    }
}
