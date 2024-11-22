require("dotenv").config();
const { TOKEN, PREFIX } = process.env;

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
const fs = require("fs");
const path = require("path");
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}
client.on("messageCreate", async (message) => {
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
        message.reply("Không hỗ trợ lệnh này! 🖕 🖕 🖕");
    }
});

client.login(TOKEN);



