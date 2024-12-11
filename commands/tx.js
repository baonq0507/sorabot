const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Attachment } = require("discord.js");
const { APP_NAME, TXCOMMAND } = process.env;
const User = require('../models/user');
const { sleep, formatNumber } = require('../common');
const fs = require('fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName(TXCOMMAND)
        .setDescription("Tài xỉu với AI"),
    async execute(message, args) {
        if (args.length !== 2) return message.reply("Vui lòng nhập đúng cú pháp! 🤨 🤨 🤨");
        const type = args[0];
        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount <= 0) return message.reply("Vui lòng nhập số tiền cược hợp lệ! 🤨 🤨 🤨");

        const discordId = message.author.id;

        let user = await User.findOne({ discordId });
        if (!user) {
            user = await User.create({ discordId, displayName: message.author.displayName });
        }
        if (user.displayName === '') {
            user.displayName = message.author.displayName;
            await user.save();
        }

        const balance = user.balance;
        if (balance < amount) return message.reply("Bạn không còn đủ tiền để cược! 💸 💸 💸");

        const loikhuyen = fs.readFileSync('./loikhuyen.txt', 'utf8').split('\n');
        const randomLoiKhuyen = loikhuyen[Math.floor(Math.random() * loikhuyen.length)];

        if(balance < 3000) {
            return message.reply(randomLoiKhuyen);
        }

        // Tạo ngẫu nhiên với tỉ lệ thắng thấp hơn thua
        const winChance = 0.4; // 40% cơ hội thắng
        const playerWins = Math.random() < winChance;

        // Điều chỉnh kết quả xúc xắc dựa trên kết quả đã định trước
        let dice1, dice2, dice3, total;
        if (type === 'tài') {
            if (playerWins) {
                // Tạo kết quả tài (>=11)
                do {
                    dice1 = Math.floor(Math.random() * 6) + 1;
                    dice2 = Math.floor(Math.random() * 6) + 1;
                    dice3 = Math.floor(Math.random() * 6) + 1;
                    total = dice1 + dice2 + dice3;
                } while (total < 11);
            } else {
                // Tạo kết quả xỉu (<11)
                do {
                    dice1 = Math.floor(Math.random() * 6) + 1;
                    dice2 = Math.floor(Math.random() * 6) + 1;
                    dice3 = Math.floor(Math.random() * 6) + 1;
                    total = dice1 + dice2 + dice3;
                } while (total >= 11);
            }
        } else { // type === 'xỉu'
            if (playerWins) {
                // Tạo kết quả xỉu (<11)
                do {
                    dice1 = Math.floor(Math.random() * 6) + 1;
                    dice2 = Math.floor(Math.random() * 6) + 1;
                    dice3 = Math.floor(Math.random() * 6) + 1;
                    total = dice1 + dice2 + dice3;
                } while (total >= 11);
            } else {
                // Tạo kết quả tài (>=11)
                do {
                    dice1 = Math.floor(Math.random() * 6) + 1;
                    dice2 = Math.floor(Math.random() * 6) + 1;
                    dice3 = Math.floor(Math.random() * 6) + 1;
                    total = dice1 + dice2 + dice3;
                } while (total < 11);
            }
        }

        const result = total >= 11 ? 'tài' : 'xỉu';

        const reply = await message.reply(`${APP_NAME} đang xử lý kết quả, vui lòng chờ... 🤗 🤗 🤗` + (playerWins ? '🎉 🎉 🎉' : '💥 💥 💥'));

        await sleep(3000);
        const dice1DotSymbol = dice1 === 1 ? "⚀" : dice1 === 2 ? "⚁" : dice1 === 3 ? "⚂" : dice1 === 4 ? "⚃" : dice1 === 5 ? "⚄" : "⚅";
        const dice2DotSymbol = dice2 === 1 ? "⚀" : dice2 === 2 ? "⚁" : dice2 === 3 ? "⚂" : dice2 === 4 ? "⚃" : dice2 === 5 ? "⚄" : "⚅";
        const dice3DotSymbol = dice3 === 1 ? "⚀" : dice3 === 2 ? "⚁" : dice3 === 3 ? "⚂" : dice3 === 4 ? "⚃" : dice3 === 5 ? "⚄" : "⚅";

        if (result === type) {
            user.balance += amount;
        } else {
            user.balance -= amount;
        }
        await user.save();
        const embed = new EmbedBuilder()
            .setTitle(`Kết quả: ${result} ${dice1DotSymbol} ${dice2DotSymbol} ${dice3DotSymbol}`)
            .setColor(result === type ? "Green" : "Red")
            .setDescription(`Bạn đã ${result === type ? "thắng" : "thua"} ${result === type ? '+' : '-'} ${amount} 💸 💸 💸`)
            .addFields(
                { name: '💵 Số tiền sau khi cược:', value: `${formatNumber(user.balance)}` },
            )
            .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
        await reply.edit({ content: `${APP_NAME} đã xử lý kết quả! 🎉 🎉 🎉`, embeds: [embed] });
    }
};