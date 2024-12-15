const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });


client.on('messageCreate', async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    // Lệnh phát nhạc
    if (message.content.startsWith('!play ')) {
        const url = message.content.split(' ')[1];

        if (!url) {
            return message.reply('Vui lòng cung cấp một link YouTube hoặc MP3!');
        }

        // Kiểm tra quyền tham gia kênh thoại
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

            const stream = ytdl(url, { filter: 'audioonly' });
            const resource = createAudioResource(stream);
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            message.reply(`Đang phát nhạc từ: ${url}`);
        } catch (error) {
            console.error(error);
            message.reply('Có lỗi xảy ra khi phát nhạc!');
        }
    }

    // Lệnh dừng nhạc
    if (message.content === '!stop') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('Bạn phải tham gia một kênh thoại để sử dụng lệnh này!');
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        connection.destroy();
        message.reply('Đã dừng phát nhạc!');
    }
});

client.login(process.env.DISCORD_TOKEN);
