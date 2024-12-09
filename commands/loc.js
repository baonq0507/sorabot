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

        // Convert Collection to array and sort by message count
        const sortedUsers = Array.from(userMessageCount.entries())
            .sort((a, b) => a[1] - b[1]);

        // Split into chunks of 10 users
        const chunks = [];
        for (let i = 0; i < sortedUsers.length; i += 10) {
            chunks.push(sortedUsers.slice(i, i + 10));
        }

        // Create embeds for each chunk
        const embeds = chunks.map((chunk, index) => {
            return new EmbedBuilder()
                .setTitle(`👑 Lọc 👑 (Trang ${index + 1}/${chunks.length})`)
                .setDescription('🏆 Bảng xếp hạng người dùng ít tin nhắn hơn 20 tin nhắn')
                .setColor('Blue')
                .addFields(
                    { name: '👤 Người dùng', value: chunk.map(([userId]) => `<@${userId}>`).join('\n'), inline: true },
                    { name: '💬 Số tin nhắn', value: chunk.map(([_, count]) => count).join('\n'), inline: true }
                )
                .setTimestamp()
                .setThumbnail(THUMBNAIL);
        });

        // Send first embed
        let currentPage = 0;
        await message.channel.send({ embeds: [embeds[currentPage]] });

        // Send remaining embeds with delay
        for (let i = 1; i < embeds.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            await message.channel.send({ embeds: [embeds[i]] });
        }
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
                    userMessageCount.set(authorId, `${message.author.displayName} - ${userMessageCount.get(authorId) || 0} tin nhắn`);
                });

                lastId = messages.last().id; // Lấy ID của tin nhắn cuối để tiếp tục fetch
            }
        }

        return userMessageCount;
    }
};