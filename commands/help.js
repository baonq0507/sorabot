const { SlashCommandBuilder } = require("discord.js");
const { PREFIX } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Hiển thị hướng dẫn sử dụng bot"),
    async execute(message, args) {
        message.reply("Hiển thị hướng dẫn sử dụng bot");
    }
};