const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const User = require('../models/user');

const { FishingRod } = require('../fish');
const { PREFIX, SHOPCOMMAND, THUMBNAIL } = process.env;
const { formatNumber } = require('../common');
const FISHCOMMAND = 'fish';
module.exports = {
    data: new SlashCommandBuilder()
        .setName(FISHCOMMAND)
        .setDescription('Câu cá'),
    async execute(interaction) {
        let user = await User.findOne({ discordId: interaction.user.id });
        if (!user) {
            user = await User.create({ discordId: interaction.user.id, displayName: interaction.user.displayName });
        }

        if (user.fishingRod === 'none') {
            const embedError = new EmbedBuilder()
                .setTitle('❌ Không có cần câu')
                .setDescription(`Bạn không có cần câu nào! Hãy mua cần câu tại shop`)
                .setColor('Red')
                .setThumbnail(THUMBNAIL)
                .setTimestamp();
            await interaction.reply({ embeds: [embedError] });
            return;
        }

        // Check if 5 seconds have passed since last fish
        const now = new Date();
        const timeSinceLastFish = now - user.lastFishTime;
        if (timeSinceLastFish < 5000) {
            const timeLeft = Math.ceil((5000 - timeSinceLastFish) / 1000);
            const embedCooldown = new EmbedBuilder()
                .setTitle('⏰ Thời gian chờ')
                .setDescription(`Bạn cần đợi ${timeLeft}s nữa để câu cá tiếp!`)
                .setColor('Red')
                .setThumbnail(THUMBNAIL)
                .setTimestamp();
            await interaction.reply({ embeds: [embedCooldown] });
            return;
        }

        const rod = FishingRod.find(rod => rod.name === user.fishingRod);
        // Get total chance
        const totalChance = rod.fish.reduce((sum, fish) => sum + fish.chance, 0);

        // Generate random number between 0 and total chance
        const random = Math.random() * totalChance;

        // Find fish based on chance
        let currentChance = 0;
        const fish = rod.fish.find(fish => {
            currentChance += fish.chance;
            return random <= currentChance;
        });

        user.balance += fish.price;
        user.lastFishTime = now;
        await user.save();

        const embed = new EmbedBuilder()
            .setTitle('Chúc mừng')
            .setDescription(`${interaction.user.username}`)
            .addFields(
                { name: 'Bạn vừa câu được', value: `${fish.emoji} ${fish.name}`, inline: false },
                { name: '💰 Giá trị', value: formatNumber(fish.price), inline: false },
                { name: '💵 Số dư', value: formatNumber(user.balance), inline: false },
            )
            .setColor('Green')
            .setThumbnail(THUMBNAIL)
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('fish_again')
                    .setLabel('Câu tiếp')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🎣')
            );
        await interaction.fetchReply()
        await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

        const collector = reply.createMessageComponentCollector({
            filter: i => i.customId === 'fish_again' && i.user.id === interaction.user.id,
            time: 60000
        });

        collector.on('collect', async i => {
            await i.deferUpdate();
            const command = interaction.client.commands.get(FISHCOMMAND);
            await command.execute(i);
        });
    },
}