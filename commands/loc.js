const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { Collection } = require('discord.js');

const { THUMBNAIL } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('lọc')
        .setDescription('Lọc'),
    async execute(message) {
        // lấy tất cả người dùng trong channel
        // const users = await message.guild.members.fetch({ limit: 1000, withPresences: true });
        const reply = await message.reply('Đang lọc...');

        // console.log(users);
        // lấy số lượng tin nhắn của người dùng
        const userMessageCount = await this.countMessagesInGuild(message.guild);
        console.log(userMessageCount);
        const embed = new EmbedBuilder()
            .setTitle('👑 Lọc 👑')
            .setDescription('🏆 Bảng xếp hạng người dùng ít tin nhắn hơn 20 tin nhắn')
            .setColor('Blue')
            .addFields(
                { name: '👤 Người dùng', value: Array.from(userMessageCount.entries()).map(([userId, count]) => `<@${userId}>`).join('\n'), inline: true },
                { name: '💬 Số tin nhắn', value: Array.from(userMessageCount.entries()).map(([userId, count]) => count).join('\n'), inline: true }
            )
            .setTimestamp()
            .setThumbnail(THUMBNAIL);

        await reply.edit({ embeds: [embed] });
    },
    async countMessagesInGuild(guild) {
        const userMessageCount = new Collection(); // Lưu trữ số lượng tin nhắn của từng người
        const textChannels = guild.channels.cache.filter(channel => channel.isTextBased());

        for (const [channelId, channel] of textChannels) {
            let lastId = null;

            while (true) {
                const messages = await channel.messages.fetch({ limit: 100, before: lastId }).catch(err => {
                    console.error(`Could not fetch messages in ${channel.name}:`, err);
                    return null;
                });

                if (!messages || messages.size === 0) break;

                messages.forEach(message => {
                    const authorId = message.author.id;
                    userMessageCount.set(authorId, (userMessageCount.get(authorId) || 0) + 1);
                });

                lastId = messages.last().id; // Lấy ID của tin nhắn cuối để tiếp tục fetch
            }
        }

        return userMessageCount;
    }
};