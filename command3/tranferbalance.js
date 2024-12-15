const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { TRANFERBALANCECOMMAND, THUMBNAIL } = process.env;
const { formatNumber } = require('../common');
const User = require('../models/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chuyentien')
        .setDescription('Chuyển tiền')
        .addUserOption(option => option.setName('user').setDescription('Người nhận').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Số tiền').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        if (isNaN(amount) || amount <= 0) {
            await interaction.reply('Số tiền không hợp lệ! Vui lòng nhập số tiền lớn hơn 0! 💰 💰 💰');
            return;
        }

        if (user.id === interaction.user.id) {
            await interaction.reply('Bạn không thể chuyển tiền cho chính mình!');
            return;
        }

        const userSender = await User.findOne({ discordId: interaction.user.id });

        if (userSender.balance < amount) {
            await interaction.reply('Bạn không có đủ tiền để chuyển!');
            return;
        }

        await User.updateOne({ discordId: interaction.user.id }, { $inc: { balance: -amount } });
        await User.updateOne({ discordId: user.id }, { $inc: { balance: amount } });

        const embed = new EmbedBuilder()
            .setTitle(`Chuyển tiền`)
            .setColor('Blue')
            .addFields(
                { name: '💵 Số tiền chuyển', value: `${formatNumber(amount)}` },
                { name: '💵 Số tiền còn lại', value: `${formatNumber(userSender.balance)}` },
            )
            .setThumbnail(THUMBNAIL)

        await interaction.reply({ content: `Bạn đã chuyển ${formatNumber(amount)} cho ${user.displayName} 💰 💰 💰`, embeds: [embed] });
    }

}