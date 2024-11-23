const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { FishingRod } = require('../fish');
const { formatNumber } = require('../common');
const { SHOPCOMMAND, APP_NAME, THUMBNAIL, PREFIX, FISHINGCOMMAND } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName(SHOPCOMMAND)
        .setDescription('Mua hàng'),
    async execute(message) {
        let user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = await User.create({ discordId: message.author.id, displayName: message.author.displayName });
        }


        // danh sách cần câu
        const embed = new EmbedBuilder()
            .setTitle('Danh sách cần câu')
            .setDescription(`Chào mừng bạn đến với shop ${APP_NAME}`)
            .addFields(
                { name: 'Số dư', value: formatNumber(user.balance), inline: false },
                ...FishingRod.map(rod => ({ name: `${rod.emoji} ${rod.name}`, value: rod.description, inline: false }))
            )
            .setThumbnail(THUMBNAIL);
        const reply = await message.reply({ embeds: [embed] });

        // ADD REACTION
        for (const rod of FishingRod) {
            await reply.react(rod.emoji);
        }

        const filter = (reaction, user) => {
            return FishingRod.some(rod => rod.emoji === reaction.emoji.name) && user.id === message.author.id;
        };

        const collector = reply.createReactionCollector({ filter, time: 60000 });

        collector.on('collect', async (reaction) => {
            const rod = FishingRod.find(rod => rod.emoji === reaction.emoji.name);
            if (user.balance < rod.price) {
                await message.reply(`Bạn không còn đủ tiền để mua cần câu ${rod.name} ${rod.emoji} 💸 💸 💸`);
                return;
            }

            user.balance -= rod.price;
            user.fishingRod = rod.name;
            await user.save();

            await message.reply(`Bạn đã mua cần câu ${rod.name} ${rod.emoji} thành công! 🎉 🎉 🎉! Hãy câu cá ngay bằng lệnh \`\`\`${PREFIX} ${FISHINGCOMMAND}\`\`\``);
        });
    }
}