const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { PREFIX, VOICECOMMAND, VOICE_API_KEY, VOICE_BASE_URL, APP_NAME, TIMEOUT } = process.env;
const { sleep } = require("../common");
module.exports = {
    data: new SlashCommandBuilder().setName(VOICECOMMAND).setDescription("Tạo voice với AI"),
    async execute(message, args) {
        const reply = await message.reply(`${APP_NAME} đang xử lý, vui lòng chờ... 🤗 🤗 🤗`);

        const content = args.join(" ");

        try {
            const response = await fetch(`${VOICE_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'api-key': VOICE_API_KEY,
                    'speed': '',
                    'voice': 'banmai',
                    'callback_url': `${message.author.id}`
                },
                body: content
            });
            const data = await response.json();
            if (data.async) {
                await sleep(5000);
                const audioResponse = await fetch(data.async);
                const audioBuffer = await audioResponse.arrayBuffer();
                const attachment = new AttachmentBuilder(Buffer.from(audioBuffer), { name: 'audio.mp3' });
                await reply.edit({ content: `${APP_NAME} đã xử lý thành công! 🎉 🎉 🎉`, files: [attachment] });
            } else {
                reply.edit("Đã xảy ra lỗi, vui lòng thử lại sau!");
            }
        } catch (error) {
            console.error(error);
            reply.edit("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
        setTimeout(() => {
            reply.delete();
        }, TIMEOUT);
    },
};