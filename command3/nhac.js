const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PREFIX, NHACCOMMAND, THUMBNAIL } = process.env;
const ytdl = require("@distube/ytdl-core");
const ytSearch = require('yt-search');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription("Phát nhạc")
        .addStringOption(option => 
            option.setName('name')
            .setDescription('Link nhạc hoặc tên bài hát')
            .setRequired(true)
        ),
    async execute(interaction) {
        const query = interaction.options.getString('name');
        let url = query;
        
        // If not a URL, treat as search query
        if (!query.startsWith('http://') && !query.startsWith('https://')) {
            try {
                const searchResults = await ytSearch(query);
                if (!searchResults || !searchResults.videos.length) {
                    const embed = new EmbedBuilder()
                        .setTitle('❌ Không tìm thấy')
                        .setDescription('Không tìm thấy bài hát bạn yêu cầu!')
                        .setThumbnail(THUMBNAIL)
                        .setColor('#FF0000')
                        .setTimestamp();
                    return interaction.reply({ embeds: [embed] });
                }
                url = searchResults.videos[0].url;
            } catch (error) {
                console.error(error);
                const embed = new EmbedBuilder()
                    .setTitle('❌ Lỗi')
                    .setDescription('Có lỗi xảy ra khi tìm kiếm bài hát!')
                    .setThumbnail(THUMBNAIL)
                    .setColor('#FF0000')
                    .setTimestamp();
                return interaction.reply({ embeds: [embed] });
            }
        }

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            const embed = new EmbedBuilder()
                .setTitle('❌ Lỗi')
                .setDescription('Bạn phải tham gia một kênh thoại để phát nhạc!')
                .setThumbnail(THUMBNAIL)
                .setColor('#FF0000')
                .setTimestamp();
            return interaction.reply({ embeds: [embed] });
        }

        try {
            if (!ytdl.validateURL(url)) {
                const embed = new EmbedBuilder()
                    .setTitle('❌ Lỗi')
                    .setDescription('Link YouTube không hợp lệ!')
                    .setColor('#FF0000')
                    .setThumbnail(THUMBNAIL)
                    .setTimestamp();
                return interaction.reply({ embeds: [embed] });
            }

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
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

            const embed = new EmbedBuilder()
                .setTitle('🎵 Đang phát nhạc')
                .setDescription('Đang phát nhạc của bạn, chúc bạn nghe nhạc vui vẻ! 🎶')
                .setColor('#00FF00')
                .setThumbnail(THUMBNAIL)
                .setTimestamp();
            await interaction.reply({ embeds: [embed] });

            player.on('error', (error) => {
                console.error(`Playback error: ${error}`);
                const embed = new EmbedBuilder()
                    .setTitle('❌ Lỗi phát nhạc')
                    .setDescription('Có lỗi xảy ra trong quá trình phát nhạc!')
                    .setColor('#FF0000')
                    .setThumbnail(THUMBNAIL)
                    .setTimestamp();
                return interaction.editReply({ embeds: [embed] });
            });
        } catch (error) {
            console.error(`Unexpected error: ${error.message}`);
            const embed = new EmbedBuilder()
                .setTitle('❌ Lỗi')
                .setDescription('Không thể phát nhạc này!')
                .setColor('#FF0000')
                .setThumbnail(THUMBNAIL)
                .setTimestamp();
            return interaction.reply({ embeds: [embed] });
        }
    },

}
