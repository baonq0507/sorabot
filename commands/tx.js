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
            user = await User.create({ discordId });
        }

        const balance = user.balance;
        if (balance < amount) return message.reply("Bạn không còn đủ tiền để cược! 💸 💸 💸");

        const loikhuyen = fs.readFileSync('./loikhuyen.txt', 'utf8').split('\n');
        const randomLoiKhuyen = loikhuyen[Math.floor(Math.random() * loikhuyen.length)];

        if(balance < 3000) {
            return message.reply(randomLoiKhuyen);
        }

        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const dice3 = Math.floor(Math.random() * 6) + 1;
        const total = dice1 + dice2 + dice3;

        const result = total >= 11 ? 'tài' : 'xỉu';

        const reply = await message.reply(`${APP_NAME} đang xử lý kết quả, vui lòng chờ... 🤗 🤗 🤗`);

        await sleep(3000);
        const dice1DotSymbol = dice1 === 1 ? "⚀" : dice1 === 2 ? "⚁" : dice1 === 3 ? "⚂" : dice1 === 4 ? "⚃" : dice1 === 5 ? "⚄" : "⚅";
        const dice2DotSymbol = dice2 === 1 ? "⚀" : dice2 === 2 ? "⚁" : dice2 === 3 ? "⚂" : dice2 === 4 ? "⚃" : dice2 === 5 ? "⚄" : "⚅";
        const dice3DotSymbol = dice3 === 1 ? "⚀" : dice3 === 2 ? "⚁" : dice3 === 3 ? "⚂" : dice3 === 4 ? "⚃" : dice3 === 5 ? "⚄" : "⚅";
        const dot1 = new AttachmentBuilder('https://i.ibb.co/2g0ShmP/1-dot.png', { name: '1_dots.png' });
        const dot2 = new AttachmentBuilder('https://i.ibb.co/h84Z7zF/2-dots.png', { name: '2_dots.png' });
        const dot3 = new AttachmentBuilder('https://i.ibb.co/f8xhgV3/3-dots.png', { name: '3_dots.png' });
        const dot4 = new AttachmentBuilder('https://i.ibb.co/hWdNNLg/4-dots.png', { name: '4_dots.png' });
        const dot5 = new AttachmentBuilder('https://i.ibb.co/KjD1btJ/5-dots.png', { name: '5_dots.png' });
        const dot6 = new AttachmentBuilder('https://i.ibb.co/z5z281C/6-dots.png', { name: '6_dots.png' });
        const embed = new EmbedBuilder()
            .setTitle(`Kết quả: ${result} ${dice1DotSymbol} ${dice2DotSymbol} ${dice3DotSymbol}`)
            .setColor(result === type ? "Green" : "Red")
            .setDescription(`Bạn đã ${result === type ? "thắng" : "thua"} ${result === type ? '+' : '-'} ${amount} 💸 💸 💸`)
            .addFields(
                { name: '💵 Số tiền còn lại', value: `${formatNumber(user.balance)}` },
            )
            .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
        const diceImages = [dot1, dot2, dot3, dot4, dot5, dot6];
        const selectedDice = [dice1, dice2, dice3].map(value => diceImages[value - 1]);
        await reply.edit({ content: `${APP_NAME} đã xử lý kết quả! 🎉 🎉 🎉`, files: selectedDice, embeds: [embed] });

        if (result === type) {
            user.balance += amount;
        } else {
            user.balance -= amount;
        }
        await user.save();
    }
};