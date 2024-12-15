const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PREFIX, THUMBNAIL } = process.env;
const { formatNumber } = require("../common");
const User = require("../models/user");
const Xsmb = require("../models/xsmb");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("xs")
        .setDescription("Lệnh xổ số"),
    async execute(message, args) {
        // example: !xs "01, 02, 03, 04, 05, 06, 07, 08, 09, 10" 1000
        if(args.length < 2) {
            return message.reply("Lệnh xổ số không đúng! VD: !xs \"01, 02, 03, 04, 05, ...\" 1000");
        }
        const numbers = args[0].replace(/[^0-9,]/g, '').split(",")
        const amount = parseInt(args[1]);

        if(isNaN(amount)) {
            return message.reply("Số tiền không hợp lệ! VD: !xs \"01, 02, 03, 04, 05, ...\" 1000");
        }

        if(amount <= 0) {
            return message.reply("Số tiền không hợp lệ! VD: !xs \"01, 02, 03, 04, 05, ...\" 1000 (số tiền phải lớn hơn 0)");
        }

        let user = await User.findOne({ discordId: message.author.id });
        if (!user) {
            user = await User.create({ discordId: message.author.id, displayName: message.author.displayName });
        }

        if(user.balance < amount * numbers.length) {
            const embed1 = new EmbedBuilder()
                .setTitle("🎰 Xổ số, sáng xô chiều sổ đê 🎲")
                .setDescription(`❌ Bạn không có số dư để đặt cược ❌`)
                .setColor("Red")
                .addFields(
                    { name: "💰 Số dư hiện tại:", value: `${formatNumber(user.balance)} 💵` },
                    { name: "💸 Số tiền cần đặt cược:", value: `${formatNumber(amount * numbers.length)} 💵` },
                    { name: "🎲 Số bạn đã chọn:", value: `${numbers.join(", ")} 🎲` },
                    { name: "💳 Tổng số tiền cần có để đặt cược:", value: `${formatNumber(amount * numbers.length)} 💵` }
            )
                .setTimestamp()
                .setThumbnail(THUMBNAIL)
            return message.reply({embeds: [embed1]});
        }

        const xsmb = await Xsmb.findOne({
            time: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(23, 59, 59, 999))
            }
        });

        if(!xsmb) {
            return message.reply("Xổ số hôm nay chưa về!");
        }

        xsmb.users.push({ userId: user.discordId, amount, numbers });
        await xsmb.save();
        user.balance -= amount * numbers.length;
        await user.save();

        const embed = new EmbedBuilder()
            .setTitle("🎰 Xổ số, sáng xô chiều sổ đê 🎲")
            .setDescription(`⏰ 18h30 hàng ngày kết quả xổ số. ích nước lợi nhất là 🎰 🎰 🎰`)
            .addFields(
                { name: "🎲 Các số may mắn bạn đã chọn:", value: `${numbers.join(", ")} 🎲` },
                { name: "💸 Số tiền bạn đã đặt cược:", value: `${formatNumber(amount)} 💵` },
                { name: "💰 Tổng số tiền bạn đã đặt cược:", value: `${formatNumber(amount * numbers.length)} 💵` },
                { name: "💳 Số dư còn lại:", value: `${formatNumber(user.balance)} 💵` }
            )
            .setTimestamp()
            .setThumbnail(THUMBNAIL)
        message.reply({embeds: [embed]});
    }
}