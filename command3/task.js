const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { TASKCOMMAND, PREFIX, JOBCOMMAND } = process.env;
const { formatNumber } = require('../common');
const User = require('../models/user');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Làm việc'),
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
        if (!job || job === 'none') {
            await interaction.reply(`Bạn chưa có công việc nào! Hãy nhận công việc bằng lệnh: \`${PREFIX} ${JOBCOMMAND}\``);
            return;
        }

        const jobList = require('../job/job');
        const jobInfo = jobList.job.find(j => j.name === job);

        if (!jobInfo) {
            await interaction.reply(`Công việc không tồn tại!`);
            return;
        }
        if (user.lastTaskTime && new Date() - user.lastTaskTime < 30 * 60 * 1000) {
            const timeLeft = Math.ceil((30 * 60 * 1000 - (new Date() - user.lastTaskTime)) / (60 * 1000));
            let timeUnit = timeLeft < 1 ? 'giây' : 'phút';
            let timeValue = timeLeft < 1 ? Math.ceil(timeLeft * 60) : timeLeft;
            const embed = new EmbedBuilder()
                .setTitle('⏰ Thời gian nghỉ ngơi')
                .setDescription(`Bạn cần chờ ${timeValue} ${timeUnit} để làm việc tiếp! 🕒`)
                .setColor('Red')
                .addFields(
                    { name: '💪 Lời khuyên', value: 'Hãy cố gắng nghỉ ngơi, giữ sức khỏe!' }
                )
                .setTimestamp();
            await interaction.reply({ embeds: [embed] });
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
        const embed = new EmbedBuilder()
            .setTitle('💼 Báo cáo công việc')
            .setDescription(`${interaction.user.username} đã hoàn thành công việc!`)
            .setColor('Green')
            .addFields(
                { name: '📋 Nhiệm vụ', value: taskRandom.task.name },
                { name: '💰 Tiền lương', value: formatNumber(taskRandom.reward) },
                { name: '💬 Phản hồi', value: taskRandom.task.descriptions[Math.floor(Math.random() * taskRandom.task.descriptions.length)] }
            )
            .setThumbnail(THUMBNAIL)
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });
    }
}