const { EmbedBuilder, AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioStream, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { VOICE_API_KEY_ELEVENLABS, VOICE_ID_ELEVENLABS_1, VOICE_BASE_URL_ELEVENLABS, VOICE_ID_ELEVENLABS_2 } = process.env;
const { sleep } = require('../common');

const voice = async (interaction) => {

    const channel = interaction.member.voice.channel;
    if (!channel) {
        await interaction.editReply('Bạn phải vào voice channel để sử dụng lệnh này');
        return;
    }
    const text = interaction.options.getString('text');
    const voiceId = interaction.options.getString('voice');
    const response = await fetch(`${VOICE_BASE_URL_ELEVENLABS}/${voiceId}`, {
        method: 'POST',
        headers: {
            "Accept": "audio/mpeg",
            'Content-Type': 'application/json',
            'xi-api-key': VOICE_API_KEY_ELEVENLABS
        },
        body: JSON.stringify({
            text: text,
            model_id: 'eleven_turbo_v2_5',
        })
    })

    // join channel
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator
    })

    const stream = response.body;
    const player = createAudioPlayer();
    const resource = createAudioResource(stream);
    player.play(resource);
    connection.subscribe(player);

    await interaction.editReply('Đang tạo giọng nói AI...');

    await sleep(10000);
    connection.destroy();
    player.stop();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('Tạo giọng nói AI')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to voice')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('voice')
                .setDescription('Giọng nói')
                .setRequired(true)
                .addChoices(
                    {
                        name: "Male", value: VOICE_ID_ELEVENLABS_1
                    }, 
                    {
                        name: "Female", value: VOICE_ID_ELEVENLABS_2
                    }
                )
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        await voice(interaction);
    }
}
