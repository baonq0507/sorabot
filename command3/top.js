const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
const { formatNumber } = require('../common');
const { TOPCOMMAND, THUMBNAIL } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Xem top người chơi có số tiền nhiều nhất'),
    async execute(interaction) {
        const users = await User.find({ displayName: { $ne: '' } }).sort({ balance: -1 }).limit(10);

        const embed = new EmbedBuilder()
            .setTitle('👑 Top Phú Ông, Phú Bà 💰')
            .setColor('Blue')
            .setThumbnail(THUMBNAIL)
            .addFields(
                {
                    name: '🏆 Top',
                    value: users.map((user, index) => {
                        let medal = '';
                        if (index === 0) medal = '🥇';
                        else if (index === 1) medal = '🥈'; 
                        else if (index === 2) medal = '🥉';
                        else medal = '🎖️';
                        return `${medal} ${index + 1}. <@${user.discordId}> - ${user.displayName} - ${formatNumber(user.balance)} 💵`;
                    }).join('\n'),
                    inline: true
                },
            ).setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
}