const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder } = require("discord.js");
const { PREFIX, NHACCOMMAND } = process.env;
const ytdl = require("@distube/ytdl-core");
const fs = require('fs');

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
            if (!ytdl.validateURL(url)) {
                return message.reply('Invalid YouTube URL.');
            }

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            const stream = ytdl(url, {
                filter: 'audioonly',
                quality: 'highestaudio',
                dlChunkSize: 0,
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0',
                    },
                },
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
            });
            const resource = createAudioResource(stream);
            const player = createAudioPlayer();

            connection.subscribe(player);
            player.play(resource);


            player.on('error', (error) => {
                console.error(`Playback error: ${error}`);
                return message.reply('An error occurred during playback.');
            });
        } catch (error) {
            console.error(`Unexpected error: ${error.message}`);
            return message.reply('Could not play the requested music.');
        }
    },

}
