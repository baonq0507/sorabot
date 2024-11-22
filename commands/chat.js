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

        const openai = new OpenAI({
            apiKey: CHAT_API_KEY,
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: content }],
        });
        const response = completion.choices[0].message.content;
        if (!response) {
            reply.edit("Notech xủ lý không nổi nữa, thử lại sau... 😔 😔 😔");
            return;
        };
        reply.edit(`\`\`\`${response}\`\`\``);

        setTimeout(() => {
            reply.delete();
        }, TIMEOUT);
    }
};