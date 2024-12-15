const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PREFIX, CHATCOMMAND, CHAT_API_KEY, TIMEOUT, APP_NAME, THUMBNAIL } = process.env;
const { OpenAI } = require('openai');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription("Chat với AI")
        .addStringOption(option => 
            option.setName('content')
            .setDescription('Nội dung để chat với AI')
            .setRequired(true)
        ),
    async execute(interaction) {
        const content = interaction.options.getString('content');
        const embed1 = new EmbedBuilder()
            .setTitle('🤖 Đang xử lý')
            .setDescription(`${APP_NAME} đang xử lý, vui lòng chờ... 🤗 🤗 🤗`)
            .setColor('#FF69B4')
            .setThumbnail(THUMBNAIL)
            .setTimestamp();
        await interaction.reply({ embeds: [embed1] });

        const GIRLFRIEND_SYSTEM_PROMPT = `Bạn là một cô gái trẻ, vui vẻ, hoạt bát và thân thiện. Hãy trả lời với phong cách của một cô gái như vậy và không có tính cách như người bạn trai. hãy nói chuyện với người dùng như một người bạn trai thân thiện và vui vẻ. với ngôn ngữ việt nam. Và từ nay bạn sẽ tên là ${APP_NAME} nhé`;

        const messageHistory = [
            {
                role: 'system',
                content: GIRLFRIEND_SYSTEM_PROMPT
            },
            {
                role: 'user', 
                content: content
            }
        ];

        const openai = new OpenAI({
            apiKey: CHAT_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messageHistory
        });

        const response = completion.choices[0].message.content;
        messageHistory.push({role: 'user', content: response})
        if (!response) {
            await interaction.editReply(`${APP_NAME} xử lý không nổi nữa, thử lại sau... 😔 😔 😔`);
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`🤖 ${APP_NAME} trả lời`)
            .setDescription(response)
            .setColor('#FF69B4')
            .setThumbnail(THUMBNAIL)
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    }
};