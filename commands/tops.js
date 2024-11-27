const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { THUMBNAIL } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tops')
        .setDescription('Tops'),
    async execute(message) {

        message.reply('🔄 Đang tính toán... ⌛');
        const channel = message.channel; // Kênh hiện tại
        // láy ra top 5 người nhắn tin nhiều nhất trong channel
        const options = { limit: 100 };
        const messages = await channel.messages.fetch(options);
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        let lastMessageId = null;
        const userMessageCounts = new Map();

        while (true) {
            const options = { limit: 100 }; // Discord cho phép tối đa 100 tin mỗi lần
            if (lastMessageId) options.before = lastMessageId;

            const messages = await channel.messages.fetch(options);

            if (messages.size === 0) break; // Dừng nếu không còn tin nhắn

            // Đếm tin nhắn theo người dùng
            messages.forEach((msg) => {
                const userId = msg.author.id;
                userMessageCounts.set(userId, (userMessageCounts.get(userId) || 0) + 1);
            });

            lastMessageId = messages.last().id; // Cập nhật ID tin nhắn cuối cùng
        }

        // sort userMessageCounts by value in descending order
        const sortedUserMessageCounts = Array.from(userMessageCounts.entries())
            .sort(([,a], [,b]) => b - a)
            .reduce((acc, [userId, count]) => {
                acc[userId] = count;
                return acc;
            }, {});

        console.log(sortedUserMessageCounts);

        const embed = new EmbedBuilder()
            .setTitle('👑 Tops 👑')
            .setDescription('🏆 Bảng xếp hạng người dùng hoạt động 🏆')
            .setColor('Blue')
            .addFields(
                { name: '👤 Người dùng', value: Object.keys(sortedUserMessageCounts).map(id => `<@${id}>`).join('\n'), inline: true },
                { name: '💬 Số tin nhắn', value: Object.values(sortedUserMessageCounts).join('\n'), inline: true }
            )
            .setTimestamp()
            .setThumbnail(THUMBNAIL);

        await message.reply({ embeds: [embed] });
    }
};