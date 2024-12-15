const { SlashCommandBuilder } = require('discord.js');
const User = require('../models/user');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Reset the bot'),
    async execute(message) {

        const users = await User.find({});
        for (const user of users) {
            user.balance = 100000000;
            await user.save();
        }
        message.reply('Reset the bot');
    },
};