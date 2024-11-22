const { SlashCommandBuilder } = require("discord.js");
const User = require('../models/user');
const { ADD_BALANCE_COMMAND } = process.env;
module.exports = {
    data: new SlashCommandBuilder().setName(ADD_BALANCE_COMMAND).setDescription("Thêm số dư cho bạn"),
    async execute(message, args) {
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0) return message.reply("Vui lòng nhập số tiền cần thêm hợp lệ! 💸 💸 💸");

        const user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            return message.reply("Bạn không có số dư! 💸 💸 💸");
        }

        user.balance += amount;
        await user.save();
        message.reply(`Số dư của bạn đã được cập nhật thành: ${formatNumber(user.balance)} 💸 💸 💸`);
    }
}