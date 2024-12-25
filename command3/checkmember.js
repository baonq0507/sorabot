const { SlashCommandBuilder, ChannelType, VoiceState, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkmember')
        .setDescription('Check member'),
    async execute(interaction) {
        const allowedUserId = '888242782983045190';
        
        if (interaction.user.id !== allowedUserId) {
            const embed = new EmbedBuilder()
                .setTitle('Thông báo')
                .setDescription('Bạn không có quyền sử dụng lệnh này.')
                .setColor(0xff0000)
                .setThumbnail(interaction.guild.iconURL()); // Replace with an actual URL to an icon image
            await interaction.reply({ embeds: [embed] });
            return;
        }

        // kiểm tra tất cả các kênh voice đang có người
        const channels = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);
        // lấy tất cả các thành viên trong kênh voice hiện tại
        const members = channels.map(channel => channel.members);
        const embed = new EmbedBuilder()
            .setTitle('Thành viên trong các kênh voice')
            .setDescription('Đây là các thành viên trong các kênh voice:')
            .setColor(0x0099ff)
            .setThumbnail(interaction.guild.iconURL());
        // lấy từng thành viên trong danh sách thành viên
        for (const memberCollection of members) {
            memberCollection.forEach(member => {
                const micStatus = member.voice.selfMute ? '🔴' : '🟢';
                const screenShareStatus = member.voice.streaming ? '📺' : '❌';
                embed.addFields({ name: `${member.user.username} ${micStatus} ${screenShareStatus}`, value: `${member.user.id} (Channel: ${member.voice.channel.name})` });
            });
        }
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}