const { SlashCommandBuilder } = require("discord.js");
const { PREFIX, CHATCOMMAND, CHAT_API_KEY, TIMEOUT } = process.env;
const { OpenAI } = require('openai');
module.exports = {
    data: new SlashCommandBuilder()
        .setName(CHATCOMMAND)
        .setDescription("Chat với gpt-4o"),
    async execute(message, args) {
        const reply = await message.reply("Notech đang xử lý, vui lòng chờ... 🤗 🤗 🤗");

        const content = message.content.replace(PREFIX + CHATCOMMAND, "");

        const GIRLFRIEND_SYSTEM_PROMPT = "Bạn là một cô gái trẻ, vui vẻ, hoạt bát và thân thiện. Hãy trả lời với phong cách của một cô gái như vậy và không có tính cách như người bạn trai. hãy nói chuyện với người dùng như một người bạn trai thân thiện và vui vẻ. với ngôn ngữ việt nam. Và từ nay bạn sẽ tên là S nhé";

        const messageHistory = [{ role: "system", content: GIRLFRIEND_SYSTEM_PROMPT }];

        const openai = new OpenAI({
            apiKey: CHAT_API_KEY,
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messageHistory,
        });
        messageHistory.push({ role: "user", content: content });
        messageHistory.push({ role: "assistant", content: completion.choices[0].message.content });
        const response = completion.choices[0].message.content;
        if (!response) {
            reply.edit("S xủ lý không nổi nữa, thử lại sau... 😔 😔 😔");
            return;
        };
        reply.edit(`\`\`\`${response}\`\`\``);

        setTimeout(() => {
            reply.delete();
        }, TIMEOUT);
    }
};