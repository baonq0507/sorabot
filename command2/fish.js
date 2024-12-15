const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { FishingRod } = require('../fish');
const { PREFIX, SHOPCOMMAND, THUMBNAIL } = process.env;
const { formatNumber } = require('../common');
const FISHCOMMAND = 'fish';
module.exports = {
    data: new SlashCommandBuilder()
        .setName(FISHCOMMAND)
        .setDescription('Câu cá'),
    async execute(message) {
        const user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = await User.create({ discordId: message.author.id, displayName: message.author.displayName });
        }

        if (user.fishingRod === 'none') {
            await message.reply(`Bạn không có cần câu nào! Hãy mua cần câu tại \`\`\`${PREFIX} ${SHOPCOMMAND}\`\`\``);
            return;
        }

        // Check if 5 seconds have passed since last fish
        const now = new Date();
        const timeSinceLastFish = now - user.lastFishTime;
        if (timeSinceLastFish < 5000) {
            const timeLeft = Math.ceil((5000 - timeSinceLastFish) / 1000);
            await message.reply(`Bạn cần đợi ${timeLeft}s nữa để câu cá tiếp!`);
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
            .setTitle('Câu cá')
            .addFields(
                { name: 'Cá bạn vừa câu được', value: `${fish.emoji} ${fish.name}`, inline: false },
                { name: 'Giá trị', value: formatNumber(fish.price), inline: false },
                { name: 'Số dư', value: formatNumber(user.balance), inline: false },
            ).setThumbnail(THUMBNAIL);
        await message.reply({ embeds: [embed] });
    },
}