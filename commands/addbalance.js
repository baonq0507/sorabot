const { SlashCommandBuilder } = require("discord.js");
const User = require('../models/user');
const { ADD_BALANCE_COMMAND } = process.env;
const { formatNumber } = require('../common');
module.exports = {
    data: new SlashCommandBuilder().setName(ADD_BALANCE_COMMAND).setDescription("Thêm số dư cho bạn"),
    async execute(message, args) {
        console.log(args);
        if (args.length !== 1) return message.reply("Vui lòng nhập đúng cú pháp! 🤨 🤨 🤨");
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount <= 0) return message.reply("Vui lòng nhập số tiền cần thêm hợp lệ! 💸 💸 💸");

        if (amount > 1000000000) return message.reply("Vui lòng nhập số tiền cần thêm nhỏ hơn 1 tỷ! 💸 💸 💸");

        const user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = await User.create({ discordId: message.author.id });
        }

        user.balance += amount;
        await user.save();
        message.reply(`Số dư của bạn đã được cập nhật thành: ${formatNumber(user.balance)} 💸 💸 💸`);
    }
}