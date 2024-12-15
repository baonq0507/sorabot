require("dotenv").config();
require('./database/mongodb');
const { TOKEN, PREFIX, TIMEOUT, CHANNEL_ID_XS, THUMBNAIL, CHANNEL_ID_EVENT, CLIENT_ID, GUILD_ID } = process.env;
const Xsmb = require("./models/xsmb");
const User = require("./models/user");
const { formatNumber } = require("./common");
const { Client, GatewayIntentBits, Collection, EmbedBuilder, Events, REST, Routes } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildScheduledEvents,
    ],
});
const fs = require("fs");
const path = require("path");
const cron = require('node-cron');
client.commands = new Collection();
const commands = []
const commandsPath = path.join(__dirname, "command3");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));


for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
    client.commands.set(command.name || command.data.name, command);
}

const rest = new REST().setToken(TOKEN);

// and deploy your commands!
(async () => {
	try {
        console.log('Đang lấy tất cả các lệnh...');

        // **Lấy tất cả lệnh toàn cầu**
        const globalCommands = await rest.get(Routes.applicationCommands(CLIENT_ID));
        console.log(`Tìm thấy ${globalCommands.length} lệnh toàn cầu.`);

        // Xóa tất cả lệnh toàn cầu
        for (const command of globalCommands) {
            console.log(`Đang xóa lệnh toàn cầu: ${command.name} (${command.id})`);
            await rest.delete(Routes.applicationCommand(CLIENT_ID, command.id));
        }
        console.log('Tất cả lệnh toàn cầu đã bị xóa!');

        // **Lấy tất cả lệnh trong guild**
        if (GUILD_ID) {
            const guildCommands = await rest.get(Routes.applicationCommands(CLIENT_ID));
            console.log(`Tìm thấy ${guildCommands.length} lệnh trong server ID: ${GUILD_ID}.`);

            // Xóa tất cả lệnh trong guild
            for (const command of guildCommands) {
                console.log(`Đang xóa lệnh guild: ${command.name} (${command.id})`);
                await rest.delete(Routes.applicationCommand(CLIENT_ID, command.id));
            }
            console.log(`Tất cả lệnh trong server ID: ${GUILD_ID} đã bị xóa!`);
        }
        
		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
client.on(Events.InteractionCreate, async interaction => {    
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)
    
    if (!command) return;

    try {
        await command.execute(interaction); // Thực thi lệnh tương ứng
    } catch (error) {
        console.error(`Lỗi khi thực thi lệnh ${interaction.commandName}:`, error);
        await interaction.reply({
            content: 'Đã xảy ra lỗi khi thực thi lệnh này.',
            ephemeral: true, // Tin nhắn chỉ hiển thị với người dùng
        });
    }
});

// client.on('guildCreate', async (guild) => {
//     console.log(`Đã thêm vào server ${guild.name} (${guild.id})`);
//     await rest.put(
//         Routes.applicationGuildCommands(CLIENT_ID, guild.id),
//         { body: commands },
//     );
// });

try {
    client.login(TOKEN);
} catch(error) {
    console.log(`Lỗi ${error}`)
}
