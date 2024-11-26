const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PREFIX, NAMECOMMAND, APP_NAME, CHATCOMMAND, VOICECOMMAND, TIMEOUT, JOBCOMMAND, TASKCOMMAND, BALANCECOMMAND, TXCOMMAND, BAUCUACOMMAND, TRANFERBALANCECOMMAND, SHOPCOMMAND, FISHINGCOMMAND, ODD_OR_EVEN_COMMAND } = process.env;
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
                { name: "Lệnh tạo voice", value: `${PREFIX} ${VOICECOMMAND} <nội dung>` },
                { name: "Lệnh tài xỉu", value: `${PREFIX} ${TXCOMMAND} <tài/xỉu> <số tiền>` },
                { name: "Lệnh kiểm tra số dư", value: `${PREFIX} ${BALANCECOMMAND}` },
                { name: "Lệnh nhận công việc", value: `${PREFIX} ${JOBCOMMAND}` },
                { name: "Lệnh làm việc", value: `${PREFIX} ${TASKCOMMAND}` },
                { name: "Lệnh bầu cua", value: `${PREFIX} ${BAUCUACOMMAND} <số tiền>` },
                { name: "Lệnh chuyển tiền", value: `${PREFIX} ${TRANFERBALANCECOMMAND} <@user> <số tiền>` },
                { name: "Lệnh câu cá", value: `${PREFIX} ${FISHINGCOMMAND}` },
                { name: "Lệnh mua cần câu", value: `${PREFIX} ${SHOPCOMMAND}` },
                { name: "Lệnh thông tin số tài khoản Sora", value: `${PREFIX} stk` },
                { name: "Lệnh chẵn lẻ", value: `${PREFIX} ${ODD_OR_EVEN_COMMAND} <chẵn/lẻ> <số tiền> <số may mắn>` },
                { name: "Lệnh xổ số", value: `${PREFIX} ${'xoso'} <"00,01,..."> <số tiền>` }
            )
        message.reply({embeds: [embed]});

        setTimeout(() => {
            message.delete();
        }, TIMEOUT);
    }
};