const User = require('../models/user');
const { APP_NAME, RESTBALANCECOMMAND } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName(RESTBALANCECOMMAND)
        .setDescription('Khôi phục số tiền ban đầu'),
    async execute(message, args) {
        console.log(message.author.id);
        const users = await User.find();
        for (const user of users) {
            user.balance = 100000;
            await user.save();
        }
        const embed = new EmbedBuilder()
            .setTitle('Khôi phục số tiền ban đầu')
            .setDescription('Khôi phục số tiền ban đầu thành công!')
            .setColor('Green')
            .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
        await message.reply({ content: `${APP_NAME} đã khôi phục số tiền ban đầu thành công! ${message.author.id}`, embeds: [embed] });
    }
}