const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { TASKCOMMAND, PREFIX, JOBCOMMAND } = process.env;
const { formatNumber } = require('../common');
const User = require('../models/user');
module.exports = {
    data: new SlashCommandBuilder()
        .setName(TASKCOMMAND)
        .setDescription('Làm việc'),
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
        if (!job || job === 'none') {
            await message.reply(`Bạn chưa có công việc nào! Hãy nhận công việc bằng lệnh: \`${PREFIX} ${JOBCOMMAND}\``);
            return;
        }

        const jobList = require('../job/job');
        const jobInfo = jobList.job.find(j => j.name === job);

        if (!jobInfo) {
            await message.reply(`Công việc không tồn tại!`);
            return;
        }
        if (user.lastTaskTime && new Date() - user.lastTaskTime < 30 * 60 * 1000) {
            const timeLeft = Math.ceil((30 * 60 * 1000 - (new Date() - user.lastTaskTime)) / (60 * 1000));
            let timeUnit = timeLeft < 1 ? 'giây' : 'phút';
            let timeValue = timeLeft < 1 ? Math.ceil(timeLeft * 60) : timeLeft;
            await message.reply(`Bạn cần chờ ${timeValue} ${timeUnit} để làm việc tiếp! 🕒 🕒 🕒. Hẫy cố gắng nghỉ ngơi, giữ sức khỏe! 💪 💪 💪`);
            return;
        }
        const task = jobInfo.task;
        const taskRandom = task[Math.floor(Math.random() * task.length)];

        user.lastTaskTime = new Date();
        if (user.balance < 0) {
            user.balance = 0;
        }
        user.balance += taskRandom.reward;

        await user.save();
        await message.reply(`Bạn đã làm việc ${taskRandom.task.name}! Nhận lương ${formatNumber(taskRandom.reward)}`);
    }
}