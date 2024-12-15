
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { THUMBNAIL } = process.env
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stk')
        .setDescription('Thông tin số tài khoản'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Thông tin số tài khoản của Sora')
            .addFields(
                { name: 'Chủ tài khoản', value: 'Trần Thị Vân' },
                { name: 'Số tài khoản', value: '1019908009' },
                { name: 'Ngân hàng', value: 'Vietcombank' }
            )
            .setImage('https://i.ibb.co/wNSZkkt/stk.jpg')
            // .setThumbnail(THUMBNAIL)
        await interaction.reply({ embeds: [embed] });
    }
}