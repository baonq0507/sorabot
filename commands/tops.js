const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { THUMBNAIL } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tops')
        .setDescription('Tops'),
    async execute(message) {
        const channel = message.channel; // Kênh hiện tại
        // láy ra top 5 người nhắn tin nhiều nhất trong channel
        const messages = await channel.messages.fetch();
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const topUsers = Array.from(messages.values())
            .filter(message =>
                message.createdAt >= oneWeekAgo &&
                message.createdAt <= today &&
                !message.author.bot &&
                !message.member?.roles.cache.some(role => role.name.toLowerCase().includes('bot'))
            )
            .reduce((acc, message) => {
                const userId = message.author.id;
                acc[userId] = (acc[userId] || 0) + 1;
                return acc;
            }, {});

        const embed = new EmbedBuilder()
            .setTitle('👑 Tops 👑')
            .setDescription('🏆 Bảng xếp hạng người dùng hoạt động 🏆')
            .setColor('Blue')
            .addFields(
                { name: '👤 Người dùng', value: Object.keys(topUsers).map(userId => `<@${userId}>`).join('\n'), inline: true },
                { name: '💬 Số tin nhắn', value: Object.values(topUsers).join('\n'), inline: true }
            )
            .setTimestamp()
            .setThumbnail(THUMBNAIL);

        await message.reply({ embeds: [embed] });
    }
};