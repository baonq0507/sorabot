const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { THUMBNAIL } = process.env
const fs = require('fs')
const banks = JSON.parse(fs.readFileSync('./banks.json', 'utf8')).data;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Thông tin số tài khoản')
        .addStringOption(option => 
            option.setName('nganhang')
            .setDescription('Chọn ngân hàng của bạn')
            .addChoices(
                ...banks.map(bank => ({
                    name: bank.short_name,
                    value: bank.short_name
                }))
            )
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('sotaikhoan')
            .setDescription('nhập số tài khoản của bạn')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('sotien')
            .setDescription('nhập số tiền của bạn')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('noidung')
            .setDescription('Nội dung chuyển khoản')
            .setMaxLength(50)
            .setMinLength(1)
        )
        .addStringOption(option => 
            option.setName('chutaikhoan')
            .setDescription('Tên chủ tài khoản')
            .setMaxLength(50)
            .setMinLength(1)
        ),

    async execute(interaction) {
        const bankName = interaction.options.getString('nganhang') || 'VCB';
        const accountNo = interaction.options.getString('sotaikhoan') || '1019908009'
        const amount = interaction.options.getInteger('sotien');
        const description = interaction.options.getString('noidung') || '';
        const accountName = interaction.options.getString('chutaikhoan') || 'Trần Thị Vân';

        const bank = banks.find(b => b.short_name === bankName);
        const bankId = bank?.short_name || 'VCB';

        const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

        console.log(qrUrl);
        

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Thông tin số tài khoản của ${interaction.user.displayName}`)
            .addFields(
                { name: 'Chủ tài khoản', value: accountName || `${interaction.user.displayName}` },
                { name: 'Số tài khoản', value: accountNo || '1019908009' },
                { name: 'Ngân hàng', value: bank?.name || 'Vietcombank' }
            )
            .setImage(qrUrl)
            .setThumbnail(THUMBNAIL)
        await interaction.reply({ embeds: [embed] });
    }
}