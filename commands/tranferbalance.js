const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { PREFIX, TRANFERBALANCECOMMAND } = process.env;
const { formatNumber } = require('../common');
const User = require('../models/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(TRANFERBALANCECOMMAND)
        .setDescription('Chuyển tiền')
        .addUserOption(option => option.setName('user').setDescription('Người nhận').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Số tiền').setRequired(true)),
    async execute(message, args) {
        const user = message.mentions.users.first();
        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount <= 0) {
            await message.reply('Số tiền không hợp lệ! Vui lòng nhập số tiền lớn hơn 0! 💰 💰 💰');
            return;
        }

        if (user.id === message.author.id) {
            await message.reply('Bạn không thể chuyển tiền cho chính mình!');
            return;
        }

        const userSender = await User.findOne({ discordId: message.author.id });

        if (userSender.balance < amount) {
            await message.reply('Bạn không có đủ tiền để chuyển!');
            return;
        }

        await User.updateOne({ discordId: message.author.id }, { $inc: { balance: -amount } });
        await User.updateOne({ discordId: user.id }, { $inc: { balance: amount } });

        const embed = new EmbedBuilder()
            .setTitle(`Chuyển tiền`)
            .setColor('Blue')
            .addFields(
                { name: '💵 Số tiền chuyển', value: `${formatNumber(amount)}` },
                { name: '💵 Số tiền còn lại', value: `${formatNumber(userSender.balance)}` },
            )
            .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')

        await message.reply(`Bạn đã chuyển ${formatNumber(amount)} cho ${user.displayName}`, { embeds: [embed] });
    }

}