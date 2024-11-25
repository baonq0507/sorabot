const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../models/user');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('congtien')
        .setDescription('Công tiền')
        .addUserOption(option => option.setName('user').setDescription('Người nhận').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Số tiền').setRequired(true)),
    async execute(message, args) {
        const user = message.mentions.users.first();
        const amount = parseInt(args[1]);

        if (isNaN(amount) || amount <= 0) {
            await message.reply('Số tiền không hợp lệ! Vui lòng nhập số tiền lớn hơn 0! 💰 💰 💰');
            return;
        }

        await User.updateOne({ discordId: user.id }, { $inc: { balance: amount } });

        await message.reply(`${user.displayName} đã nhận được ${formatNumber(amount)} 💵`);
    }
};