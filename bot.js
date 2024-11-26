require("dotenv").config();
require('./database/mongodb');
const { TOKEN, PREFIX, TIMEOUT, CHANNEL_ID_XS, THUMBNAIL } = process.env;
const Xsmb = require("./models/xsmb");
const User = require("./models/user");
const { formatNumber } = require("./common");
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildMessageReactions
    ]
});
const fs = require("fs");
const path = require("path");
const cron = require('node-cron');
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.on("messageCreate", async (message) => {

    // const whitelist = ["1082369606095740978", "1310313335060955206"];
    // const guild = message.guild;
    // if (!whitelist.includes(guild.id)) {
    //     message.reply("Không hỗ trợ lệnh này! 🖕 🖕 🖕! Chỉ hỗ trợ trong máy chủ của Sora");
    //     setTimeout(() => {
    //         guild.leave();
    //     }, 1000);
    //     return;
    // }
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) {
        message.reply("Không hỗ trợ lệnh này! 🖕 🖕 🖕");
        return;
    };
    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        const reply = await message.reply("Không hỗ trợ lệnh này! 🖕 🖕 🖕");

        setTimeout(() => {
            reply.delete();
        }, TIMEOUT);
    }
});

client.once('ready', async () => {
    const channel = client.channels.cache.get(CHANNEL_ID_XS);
    cron.schedule('18 6 * * *', async () => {
        if (channel) {
            const xsmb = await Xsmb.findOne({
                time: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                }
            });

            const usersReward = xsmb.users.filter(user => user.numbers.includes(xsmb.number));
            console.log(usersReward);

            if (usersReward.length > 0) {
                for (const user of usersReward) {

                    const amount = user.amount;
                    const userId = await User.findOne({ discordId: user.userId })
                    userId.balance += amount * 70;
                    await userId.save();
                }
            }
            const embed = new EmbedBuilder()
                .setTitle(`🎰 Kết quả xổ số hôm nay 🎰`)
                .setDescription(`🎲 Số về: ${xsmb.number} 🎲`)
                .addFields(
                    { name: "🏆 Thưởng", value: `${usersReward.length} người trúng thưởng 🎉` },
                    { name: "💰 Tổng thưởng", value: `${formatNumber(usersReward.reduce((acc, user) => acc + user.amount * 70, 0))} 💵`, inline: true },
                    usersReward.length > 0 ?
                        { name: "👑 Danh sách người trúng thưởng", value: usersReward.map(user => `<@${user.userId}> 💸 ${formatNumber(user.amount * 70)}`).join("\n") }
                        :
                        { name: "😢 Danh sách người trúng thưởng", value: "Không có người trúng thưởng ❌" }
                )
                .setColor(usersReward.length > 0 ? "Green" : "Red")
                .setTimestamp()
                .setThumbnail(THUMBNAIL)
            channel.send({ embeds: [embed] });
        }
    });

    const xsmb = await Xsmb.findOne({
        time: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
    });

    if (!xsmb) {
        await Xsmb.create({
            number: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            time: new Date(),
            users: []
        });
    }

    cron.schedule('0 0 * * *', async () => {
        if (channel) {
            const number = Math.floor(Math.random() * 100);
            await Xsmb.create({
                number: number.toString().padStart(2, '0'),
                time: new Date(),
                users: []
            });
        }
    });

});

client.login(TOKEN);
