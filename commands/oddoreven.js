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
        const amount = parseInt(args[1]);
        const luckyNumber = parseInt(args[2]);

        if (isNaN(amount) || amount < 0) return message.reply('Vui lòng nhập số tiền lớn hơn 0');
        if (luckyNumber !== undefined) {
            if (isNaN(luckyNumber) || luckyNumber < 0 || luckyNumber > 99) return message.reply('Vui lòng nhập số may mắn từ 0-99');
        }

        let user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = await User.create({
                discordId: message.author.id,
                displayName: message.author.displayName,
            });
        }
        if (amount > user.balance) {
            await message.reply('Số tiền cược không được lớn hơn số tiền hiện tại! 💵 💵 💵' + formatNumber(user.balance));
            return;
        }

        if (oddorEven !== 'chẵn' && oddorEven !== 'lẻ') {
            await message.reply('Vui lòng nhập chẵn hoặc lẻ');
            return;
        }

        if (amount > 100000000) {
            await message.reply('Số tiền cược không được lớn hơn 100.000.000');
            return;
        }

        const reply = await message.reply(`${APP_NAME} đang xử lý... Vui lòng chờ 🤗 🤗 🤗`);
        await sleep(3000);

        // Tạo ngẫu nhiên với tỉ lệ thắng 40%
        const winChance = 0.4;
        const playerWins = Math.random() < winChance;

        let number;
        if (oddorEven === 'chẵn') {
            if (playerWins) {
                // Tạo số chẵn
                do {
                    number = Math.floor(Math.random() * 100);
                } while (number % 2 !== 0);
            } else {
                // Tạo số lẻ
                do {
                    number = Math.floor(Math.random() * 100);
                } while (number % 2 === 0);
            }
        } else { // oddorEven === 'lẻ'
            if (playerWins) {
                // Tạo số lẻ
                do {
                    number = Math.floor(Math.random() * 100);
                } while (number % 2 === 0);
            } else {
                // Tạo số chẵn
                do {
                    number = Math.floor(Math.random() * 100);
                } while (number % 2 !== 0);
            }
        }

        const result = number % 2 === 0 ? 'chẵn' : 'lẻ';
        let isWin = result === oddorEven;

        // Thêm bonus nếu đoán đúng số
        let multiplier = 1;
        if (number === luckyNumber) {
            multiplier = 7;
        }

        const winAmount = isWin ? amount * multiplier : -amount;
        user.balance += winAmount;
        await user.save();

        const embed = new EmbedBuilder()
            .setColor(isWin ? 'Green' : 'Red')
            .setTitle(`Kết quả: ${result}`)
            .setDescription(`Bạn đã ${isWin ? 'thắng' : 'thua'} ${isWin ? '+' : '-'} ${formatNumber(Math.abs(winAmount))} 💸 💸 💸`)
            .addFields(
                { name: 'Số may mắn của bạn', value: luckyNumber.toString() },
                { name: 'Số may mắn trúng thưởng', value: number.toString() },
                { name: 'Nhân hệ số', value: multiplier.toString() },
                { name: 'Tổng tiền trúng thưởng', value: formatNumber(winAmount) },
                { name: 'Số tiền sau cược', value: formatNumber(user.balance) },
            )
            .setTimestamp()
            .setThumbnail(THUMBNAIL);

        await reply.edit({ content: `${APP_NAME} đã xử lý kết quả`, embeds: [embed] });
    },
    async autocomplete(interaction) {
        const choices = ['chẵn', 'lẻ'];
        const filtered = choices.filter(choice => choice.startsWith(interaction.options.getFocused()));
        await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
    }
}