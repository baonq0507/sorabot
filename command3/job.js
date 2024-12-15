const User = require('../models/user');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PREFIX, JOBCOMMAND, APP_NAME, THUMBNAIL } = process.env;

module.exports = {
    data: new SlashCommandBuilder().setName(JOBCOMMAND).setDescription("Xem công việc hiện tại của bạn"),
    async execute(interaction) {
        let user = await User.findOne({ discordId: interaction.user.id });

        if (!user) {
            user = await User.create({ discordId: interaction.user.id, displayName: interaction.user.displayName });
        }
        if (user.displayName === '') {
            user.displayName = interaction.user.displayName;
            await user.save();
        }

        const job = user.job;
        const jobList = require('../job/job');

        if (!job || job === 'none') {
            // nhận công việc
            const embed = new EmbedBuilder()
                .setTitle('Nhận công việc')
                .addFields(
                    ...jobList.job.map(job => ({ name: `${job.emoji} ${job.name}`, value: job.description }))
                )
                .setThumbnail(THUMBNAIL)
            const reply = await interaction.reply({ content: `${APP_NAME} đã gửi công việc cho bạn! 🤗 🤗 🤗`, embeds: [embed], fetchReply: true });

            for (const job of jobList.job) {
                await reply.react(job.emoji);
            }

            const filter = (reaction, user) => {
                return jobList.job.some(j => j.emoji === reaction.emoji.name) && user.id === interaction.user.id;
            };

            const collector = reply.createReactionCollector({ filter, time: 60000 });

            collector.on('collect', async (reaction, user) => {
                const selectedJob = jobList.job.find(j => j.emoji === reaction.emoji.name);
                if (selectedJob) {
                    await User.updateOne({ discordId: interaction.user.id }, { $set: { job: selectedJob.name } });
                    const embedJob = new EmbedBuilder()
                        .setTitle('🎉 Chúc mừng bạn đã nhận công việc mới!')
                        .setDescription(`${interaction.user.username} đã chọn công việc ${selectedJob.name} ${selectedJob.emoji}. Hãy chăm chỉ làm việc nhé!`)
                        .setColor('Green')
                        .setThumbnail(THUMBNAIL)
                        .setTimestamp();
                    await interaction.followUp({ embeds: [embedJob] });
                    collector.stop();
                }
            });
        } else {
            const embed = new EmbedBuilder()
                .setTitle(`Công việc hiện tại của ${interaction.member.displayName} là ${job} ${jobList.job.find(j => j.name === job).emoji}`)
                .setDescription(`${jobList.job.find(j => j.name === job).description}`)
                .setColor('Blue')
                .setThumbnail(THUMBNAIL)
            await interaction.reply({ embeds: [embed] });
        }
    }
}
