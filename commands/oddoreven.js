const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ODD_OR_EVEN_COMMAND, THUMBNAIL, APP_NAME } = process.env;
const User = require('../models/user');
const { formatNumber, sleep } = require('../common');
module.exports = {
    data: new SlashCommandBuilder()
        .setName(ODD_OR_EVEN_COMMAND)
        .setDescription('Chẵn lẻ'),
    async execute(message, args) {
        const oddorEven = args[0];
        const amount = args[1];

        console.log(amount, oddorEven);
        if (isNaN(amount) || amount < 0) return message.reply('Vui lòng nhập số tiền lớn hơn 0');

        const reply = await message.reply(`${APP_NAME} đang xử lý... Vui lòng chờ 🤗 🤗 🤗`);
        await sleep(3000);
        let user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = await User.create({
                discordId: message.author.id,
                displayName: message.author.displayName,
            });
        }

        const number = Math.floor(Math.random() * 100);

        const result = number % 2 === 0 ? 'chẵn' : 'lẻ';

        const isWin = result === oddorEven;

        user.balance = isWin ? user.balance + amount : user.balance - amount;
        await user.save();

        const embed = new EmbedBuilder()
            .setColor(isWin ? 'Green' : 'Red')
            .setTitle(`Kết quả: ${result}`)
            .setDescription(`Bạn đã ${isWin ? 'thắng' : 'thua'} ${isWin ? '+' : '-'} ${formatNumber(amount)} 💸 💸 💸`)
            .addFields(
                { name: 'Số may mắn', value: number.toString() },
                { name: 'Số tiền sau cược', value: formatNumber(user.balance) },
            )
            .setTimestamp()
            .setThumbnail(THUMBNAIL);

        await reply.edit({ content: `${APP_NAME} đã xử lý kết quả`, embeds: [embed] });
    }
}