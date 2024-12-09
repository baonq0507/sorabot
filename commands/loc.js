const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { THUMBNAIL } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('lọc')
        .setDescription('Lọc'),
    async execute(message) {
        // lấy tất cả người dùng trong channel
        const users = message.guild.members.cache.filter(member => member.voice.channelId === message.channel.id).map(member => member.user);
        // lọc người dùng có số tin nhắn ít hơn 20 tin nhắn
        const filteredUsers = users.filter(user => user.messageCount < 20);
        const embed = new EmbedBuilder()
            .setTitle('👑 Lọc 👑')
            .setDescription('🏆 Bảng xếp hạng người dùng ít tin nhắn hơn 20 tin nhắn')
            .setColor('Blue')
            .addFields(
                { name: '👤 Người dùng', value: users.map(user => `<@${user.discordId}>`).join('\n'), inline: true },
                { name: '💬 Số tin nhắn', value: users.map(user => user.messageCount).join('\n'), inline: true }
            )
            .setTimestamp()
            .setThumbnail(THUMBNAIL);

        await message.reply({ embeds: [embed] });
    }
};