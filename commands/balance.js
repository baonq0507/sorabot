const User = require('../models/user');
const { SlashCommandBuilder } = require("discord.js");

const { PREFIX, BALANCECOMMAND } = process.env;
const { formatNumber } = require('../common');
module.exports = {
    data: new SlashCommandBuilder().setName(BALANCECOMMAND).setDescription("Xem số dư của bạn"),
    async execute(message, args) {
        const user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            return message.reply("Bạn không có số dư! 💸 💸 💸");
        }
        message.reply(`Số dư của bạn là: ${formatNumber(user.balance)} 💸 💸 💸`);
    }
}