const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { THUMBNAIL } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tops')
        .setDescription('Tops'),
    async execute(message) {
        const users = await User.find({}).sort({ messageCount: -1 }).limit(10);
        const embed = new EmbedBuilder()
            .setTitle('👑 Tops 👑')
            .setDescription('🏆 Bảng xếp hạng người dùng hoạt động 🏆')
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