const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PREFIX, NAMECOMMAND, APP_NAME, CHATCOMMAND, VOICECOMMAND, TIMEOUT } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Hiển thị hướng dẫn sử dụng bot"),
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle(`Hướng dẫn sử dụng ${APP_NAME}`)
            .addFields(
                { name: "Lệnh tạo ảnh", value: `${PREFIX} ${NAMECOMMAND} <nội dung>` },
                { name: "Lệnh chat", value: `${PREFIX} ${CHATCOMMAND} <nội dung>` },
                { name: "Lệnh tạo voice", value: `${PREFIX} ${VOICECOMMAND} <nội dung>` }
            )
        message.reply({embeds: [embed]});

        setTimeout(() => {
            message.delete();
        }, TIMEOUT);
    }
};