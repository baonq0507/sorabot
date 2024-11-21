const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PREFIX, NAMECOMMAND } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Hiển thị hướng dẫn sử dụng bot"),
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle("Hướng dẫn sử dụng bot")
            .setDescription("Notech là bot tạo ảnh với AI, có thể tạo ảnh với nhiều chế độ khác nhau")
            .addFields(
                {name: "Lệnh tạo ảnh", value: `${PREFIX} ${NAMECOMMAND} <nội dung>`}
            )
        message.reply({embeds: [embed]});
    }
};