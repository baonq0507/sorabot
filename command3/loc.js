const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { Collection } = require('discord.js');

const { THUMBNAIL } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('loc')
        .setDescription('Xuất tin nhắn của tất cả mọi người có trong guild'),
    async execute(interaction) {
       await interaction.reply('Đang lọc...');

        // Lấy số lượng tin nhắn của người dùng
        const userMessageCount = await this.countMessagesInGuild(interaction.guild);

        // Lọc chỉ lấy người dùng còn trong guild và không phải bot
        const guildMembers = await interaction.guild.members.fetch();
        const filteredUsers = Array.from(userMessageCount.entries())
            .filter(([userId]) => {
                const member = guildMembers.get(userId);
                return member && !member.user.bot;
            })
            .sort((a, b) => a[1] - b[1]);

        // Split into chunks of 10 users
        const chunks = [];
        for (let i = 0; i < filteredUsers.length; i += 10) {
            chunks.push(filteredUsers.slice(i, i + 10));
        }

        // Create embeds for each chunk
        const embeds = chunks.map((chunk, index) => {
            return new EmbedBuilder()
                .setTitle(`👑 Lọc 👑 (Trang ${index + 1}/${chunks.length})`)
                .setDescription('🏆 Bảng xếp hạng người dùng')
                .setColor('Blue')
                .addFields(
                    { name: '👤 Người dùng', value: chunk.map(([userId]) => `<@${userId}>`).join('\n'), inline: true },
                    { name: '💬 Số tin nhắn', value: chunk.map(([_, count]) => count).join('\n'), inline: true },
                    { name: '🔴 Trạng thái', value: chunk.map(([userId]) => `${guildMembers.get(userId).presence?.status}`).join('\n'), inline: true },
                )
                .setTimestamp()
                .setThumbnail(THUMBNAIL);
        });

        // Send first embed
        let currentPage = 0;
        await interaction.editReply('Đã lấy dữ liệu thành công')
        await interaction.channel.send({ embeds: [embeds[currentPage]] });
        // Send remaining embeds with delay
        for (let i = 1; i < embeds.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            await interaction.channel.send({ embeds: [embeds[i]] });
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
                    if (!message.author.bot) { // Chỉ đếm tin nhắn từ người dùng không phải bot
                        const authorId = message.author.id;
                        userMessageCount.set(authorId, (userMessageCount.get(authorId) || 0) + 1);
                    }
                });

                lastId = messages.last().id; // Lấy ID của tin nhắn cuối để tiếp tục fetch
            }
        }

        return userMessageCount;
    }
};