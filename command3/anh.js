const { SlashCommandBuilder } = require("discord.js");
const { PREFIX, NAMECOMMAND, COZEN_BASE_URL, COZEN_API_KEY, APP_NAME, TIMEOUT } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('anh')
        .setDescription("Tạo ảnh với AI")
        .addStringOption(option => 
            option.setName('content').setDescription('Nhập nội dung để tạo nên 1 tấm ảnh').setAutocomplete(true)
        ),
    async execute(interaction) {
        const content = interaction.options.getString('content'); // Lấy giá trị từ người dùng
        await interaction.reply(`${APP_NAME} đang tạo ảnh với nội dung: "${content}"...`);
        try {
            const response = await fetch(`${COZEN_BASE_URL}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${COZEN_API_KEY}`
                },
                body: JSON.stringify({
                    'bot_id': '7439774696163901448',
                    'user_id': '1234567890',
                    'additional_messages': [{
                        'role': 'user',
                        'content': content,
                        'content_type': 'text',
                        'stream': true
                    }],
                    'auto_save_history': true,
                    'max_tokens': 2000,
                    'temperature': 0.5,
                    'stream': true
                })
            });
            const stream = response.body.getReader();
            let chunk = "";
            while (true) {
                const { done, value } = await stream.read();
                chunk += new TextDecoder().decode(value);

                if (done) {
                    const url = chunk.match(/https:\/\/p16-official-plugin-sign-sg\.ibyteimg\.com\/[^"'\s]+/)[0]
                    if (url) {
                        await interaction.editReply(`${url.replace("\\", "").replace(")", "")}`);
                    } else {
                        const message = await interaction.editReply("Vui lòng không sử dụng nhữ từ ngữ không văn minh 👌 👌 👌");
                        if (message) {
                            console.log("Warning message sent successfully"); 
                        }
                    }
                    break;
                }
            }
        } catch (error) {
            console.log(error);
            const message = await interaction.editReply("Đã xảy ra lỗi, vui lòng thử lại sau! 👌 👌 👌");
            if (message) {
                console.log("Error message sent successfully");
            }
        }
    }
};