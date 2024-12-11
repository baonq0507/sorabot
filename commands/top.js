const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { formatNumber } = require('../common');
const { TOPCOMMAND } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(TOPCOMMAND)
        .setDescription('Xem top người chơi có số tiền nhiều nhất'),
    async execute(message, args) {
        const users = await User.find({ displayName: { $ne: '' } }).sort({ balance: -1 }).limit(10);

        const embed = new EmbedBuilder()
            .setTitle('Top Phú Ông, Phú Bà')
            .setColor('Blue')
            .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
            .addFields(
                {
                    name: 'Top',
                    value: users.map((user, index) => `${index + 1}. <@${user.discordId}> - ${user.displayName} - ${formatNumber(user.balance)} 💵`).join('\n'),
                    inline: true
                },
            )

        await message.reply({ embeds: [embed] });
    }
}