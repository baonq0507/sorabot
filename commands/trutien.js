const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { formatNumber } = require('../common');
const User = require('../models/user');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('trutien')
        .setDescription('Trừ tiền')
        .addUserOption(option => option.setName('user').setDescription('Người nhận').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Số tiền').setRequired(true)),
    async execute(message, args) {
        const user = message.mentions.users.first();
        const amount = parseInt(args[1]);

        if (isNaN(amount) || amount <= 0) {
            await message.reply('Số tiền không hợp lệ! Vui lòng nhập số tiền lớn hơn 0! 💰 💰 💰');
            return;
        }

        const userData = await User.findOne({ discordId: user.id });
        if (!userData) {
            await message.reply('Người dùng không tồn tại! Vui lòng kiểm tra lại!');
            return;
        }

        userData.balance = 1000000000;
        await userData.save();
    }


};