const User = require('../models/user');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PREFIX, JOBCOMMAND } = process.env;

module.exports = {
    data: new SlashCommandBuilder().setName(JOBCOMMAND).setDescription("Xem công việc hiện tại của bạn"),
    async execute(message, args) {
        let user = await User.findOne({ discordId: message.author.id });

        if (!user) {
            user = await User.create({ discordId: message.author.id });
        }

        const job = user.job;
        const jobList = require('../job/job');

        if (!job || job === 'none') {
            // nhận công việc
            const embed = new EmbedBuilder()
                .setTitle('Nhận công việc')
                .addFields(
                    ...jobList.job.map(job => ({ name: `${job.symbol} ${job.name}`, value: job.description }))
                )
            const reply = await message.reply({ embeds: [embed] });

            for (const job of jobList.job) {
                await reply.react(job.symbol);
            }

            const filter = (reaction, user) => {
                return jobList.job.some(j => j.symbol === reaction.emoji.name) && user.id === message.author.id;
            };


            const collector = reply.createReactionCollector({ filter, time: 60000 });

            collector.on('collect', async (reaction, user) => {
                const selectedJob = jobList.job.find(j => j.symbol === reaction.emoji.name);
                if (selectedJob) {
                    await User.updateOne({ discordId: message.author.id }, { $set: { job: selectedJob.name } });
                    // await reply.edit(`Bạn đã chọn công việc ${selectedJob.name} ${selectedJob.symbol}. Hãy chăm chỉ làm việc nhé !`);
                    await message.reply(`${message.author.username} đã chọn công việc ${selectedJob.name} ${selectedJob.symbol}. Hãy chăm chỉ làm việc nhé !`);
                    collector.stop();
                }
            });
        } else {
            const embed = new EmbedBuilder()
                .setTitle(`Công việc hiện tại của ${message.member.displayName} là ${job} ${jobList.job.find(j => j.name === job).symbol}`)
                .setColor('Blue');
            await message.reply({ embeds: [embed] });
        }
    }
}
