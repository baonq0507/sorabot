const User = require('../models/user');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PREFIX, JOBCOMMAND, APP_NAME } = process.env;

module.exports = {
    data: new SlashCommandBuilder().setName(JOBCOMMAND).setDescription("Xem công việc hiện tại của bạn"),
    async execute(message, args) {
        let user = await User.findOne({ discordId: message.author.id });

        if (!user) {
            user = await User.create({ discordId: message.author.id, displayName: message.author.displayName });
        }
        if (user.displayName === '') {
            user.displayName = message.author.displayName;
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
                .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
            const reply = await message.reply({ content: `${APP_NAME} đã gửi công việc cho bạn! 🤗 🤗 🤗`, embeds: [embed] });

            for (const job of jobList.job) {
                await reply.react(job.emoji);
            }

            const filter = (reaction, user) => {
                return jobList.job.some(j => j.emoji === reaction.emoji.name) && user.id === message.author.id;
            };


            const collector = reply.createReactionCollector({ filter, time: 60000 });

            collector.on('collect', async (reaction, user) => {
                const selectedJob = jobList.job.find(j => j.emoji === reaction.emoji.name);
                if (selectedJob) {
                    await User.updateOne({ discordId: message.author.id }, { $set: { job: selectedJob.name } });
                    // await reply.edit(`Bạn đã chọn công việc ${selectedJob.name} ${selectedJob.emoji}. Hãy chăm chỉ làm việc nhé !`);
                    await message.reply(`${message.author.username} đã chọn công việc ${selectedJob.name} ${selectedJob.emoji}. Hãy chăm chỉ làm việc nhé !`);
                    collector.stop();
                }
            });
        } else {
            const embed = new EmbedBuilder()
                .setTitle(`Công việc hiện tại của ${message.member.displayName} là ${job} ${jobList.job.find(j => j.name === job).emoji}`)
                .setColor('Blue')
                .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
            await message.reply({ embeds: [embed] });
        }
    }
}
