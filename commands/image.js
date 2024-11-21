const { SlashCommandBuilder } = require("discord.js");
const { PREFIX, NAMECOMMAND, COZEN_BASE_URL, COZEN_API_KEY } = process.env;
module.exports = {
    data: new SlashCommandBuilder()
        .setName(NAMECOMMAND)
        .setDescription("Tạo ảnh với AI"),
    async execute(message, args) {

        const content = message.content.replace(PREFIX + NAMECOMMAND, "");

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
                'max_tokens': 1000,
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
                const url = chunk.match(/https:\/\/p16-official-plugin-sign-sg\.ibyteimg\.com\/[^"'\s]+/)[0].replace(")\\", "");
                if (url) {
                    message.reply(url);
                }
                break;
            }
        }
    }
};