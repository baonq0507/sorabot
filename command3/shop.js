const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { FishingRod } = require('../fish');
const { formatNumber } = require('../common');
const { SHOPCOMMAND, APP_NAME, THUMBNAIL, PREFIX, FISHINGCOMMAND } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName(SHOPCOMMAND)
        .setDescription('Mua hàng'),
    async execute(interaction) {
        let user = await User.findOne({ discordId: interaction.user.id });
        if (!user) {
            user = await User.create({ discordId: interaction.user.id, displayName: interaction.user.displayName });
        }

        // danh sách cần câu
        const embed = new EmbedBuilder()
            .setTitle('Danh sách cần câu')
            .setDescription(`Chào mừng bạn đến với shop ${APP_NAME}`)
            .addFields(
                { name: 'Số dư', value: formatNumber(user.balance), inline: false },
                ...FishingRod.map(rod => ({ name: `${rod.emoji} ${rod.name}`, value: `${rod.description}\nGiá: ${formatNumber(rod.price)}`, inline: false }))
            )
            .setThumbnail(THUMBNAIL);
        const reply = await interaction.reply({ embeds: [embed], fetchReply: true });

        // ADD REACTION
        for (const rod of FishingRod) {
            await reply.react(rod.emoji);
        }

        const filter = (reaction, user) => {
            return FishingRod.some(rod => rod.emoji === reaction.emoji.name) && user.id === interaction.user.id;
        };

        const collector = reply.createReactionCollector({ filter, time: 60000 });

        collector.on('collect', async (reaction) => {
            const rod = FishingRod.find(rod => rod.emoji === reaction.emoji.name);
            if (user.balance < rod.price) {
                const embedError = new EmbedBuilder()
                    .setTitle('❌ Không đủ tiền')
                    .setDescription(`Bạn không còn đủ tiền để mua cần câu ${rod.name} ${rod.emoji} 💸 💸 💸`)
                    .setColor('Red')
                    .setThumbnail(THUMBNAIL)
                    .setTimestamp();
                await interaction.followUp({ embeds: [embedError] });
                return;
            }

            user.balance -= rod.price;
            user.fishingRod = rod.name;
            await user.save();

            const embedSuccess = new EmbedBuilder()
                .setTitle('🎉 Mua hàng thành công!')
                .setDescription(`Bạn đã mua cần câu ${rod.name} ${rod.emoji} thành công!`)
                .addFields(
                    { name: '🎮 Hướng dẫn', value: `Hãy câu cá ngay` }
                )
                .setColor('Green')
                .setThumbnail(THUMBNAIL)
                .setTimestamp();
            await interaction.followUp({ embeds: [embedSuccess] });
        });
    }
}