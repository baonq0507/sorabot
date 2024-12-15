const User = require('../models/user');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PREFIX, BALANCECOMMAND, THUMBNAIL } = process.env;
const { formatNumber } = require('../common');
module.exports = {
    data: new SlashCommandBuilder().setName('sodu').setDescription("Xem số dư của bạn"),
    async execute(interaction) {
        let user = await User.findOne({ discordId: interaction.user.id });
        if (!user) {
            user = await User.create({ discordId: interaction.user.id, displayName: interaction.user.username });
        }
        if (user.displayName === '') {
            user.displayName = interaction.user.username;
            await user.save();
        }
        const embed = new EmbedBuilder()
            .setTitle('💰 Số Dư Tài Khoản 💰')
            .setDescription(`👤 **${user.displayName}**`)
            .addFields(
                { name: '💵 Số dư hiện tại', value: `${formatNumber(user.balance)} VNĐ` }
            )
            .setColor('#00ff00')
            .setThumbnail(THUMBNAIL)
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
}