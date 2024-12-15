const User = require('../models/user');
const { SlashCommandBuilder } = require("discord.js");

const { PREFIX, BALANCECOMMAND } = process.env;
const { formatNumber } = require('../common');
module.exports = {
    data: new SlashCommandBuilder().setName(BALANCECOMMAND).setDescription("Xem số dư của bạn"),
    async execute(interaction) {
        let user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = await User.create({ discordId: message.author.id, displayName: message.author.displayName });
        }
        if (user.displayName === '') {
            user.displayName = message.author.displayName;
            await user.save();
        }
        message.reply(`Số dư của bạn là: ${formatNumber(user.balance)} 💸 💸 💸`);
    }
}