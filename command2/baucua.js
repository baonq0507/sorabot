const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { BAUCUACOMMAND, TIME_BET } = process.env;
const { formatNumber } = require('../common');
const User = require('../models/user');
module.exports = {
    data: new SlashCommandBuilder()
        .setName(BAUCUACOMMAND)
        .setDescription('Chơi game Bầu Cua')
        .addIntegerOption(option =>
            option.setName('tiencuoc')
                .setDescription('Số tiền bạn muốn cược')
                .setRequired(true)
                .setMinValue(1000)
            ),
    async execute(interaction) {
        let user = await User.findOne({ discordId: interaction.user.id });
        if (!user) {
            user = await User.create({ discordId: interaction.user.id, displayName: interaction.user.username });
        }
        if (user.displayName === '') {
            user.displayName = interaction.user.username;
            await user.save();
        }

        const amount = interaction.options.getInteger('tiencuoc');
        if (amount > user.balance || amount <= 0) {
            await interaction.reply('Số tiền cược phải lớn hơn 1000 và không được lớn hơn số tiền hiện tại! 💵 💵 💵');
            return;
        }

        const baucualist = [
            {
                name: 'Tôm',
                emoji: '🦐'
            },
            {
                name: 'Cua', 
                emoji: '🦀'
            },
            {
                name: 'Cá',
                emoji: '🐟'
            },
            {
                name: 'Bầu',
                emoji: '🎃'
            },
            {
                name: 'Gà',
                emoji: '🐔'
            },
            {
                name: 'Hươu',
                emoji: '🦌'
            }
        ];

        const embed = new EmbedBuilder()
            .setTitle('Bầu cua')
            .setColor('Blue')
            .setDescription(`Bạn có thể đặt cược với 1 trong 6 lựa chọn sau: thả reaction để đặt cược!`)
            .addFields(
                {
                    name: 'Lựa chọn',
                    value: baucualist.map(item => `${item.emoji} ${item.name}`).join(', '),
                    inline: true
                },
            )
            .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
            .setFooter({ text: `Thời gian đặt cược: ${TIME_BET / 1000}s` })

        await interaction.reply({ embeds: [embed] });
        const reply = await interaction.fetchReply();
        
        // react with emoji
        for (const item of baucualist) {
            await reply.react(item.emoji);
        }
        
        const filter = (reaction, user) => {
            return baucualist.some(item => item.emoji === reaction.emoji.name) && user.id === interaction.user.id;
        };

        const collector = reply.createReactionCollector({ filter, time: TIME_BET });
        const userBets = new Map(); // Track user's bets
        const result = baucualist.sort(() => Math.random() - 0.5).slice(0, 3);

        collector.on('collect', async (reaction) => {
            const selectedEmoji = reaction.emoji.toString();
            const matchingItem = baucualist.find(item => item.emoji === selectedEmoji);
            if (matchingItem) {
                if (!userBets.has(selectedEmoji)) {
                    if (user.balance >= amount) {
                        userBets.set(selectedEmoji, true);
                        user.balance -= amount;
                        await user.save();
                    } else {
                        await interaction.followUp(`Bạn không đủ tiền để đặt cược! số tiền còn lại: ${formatNumber(user.balance)}\n Và chỉ có thể đặt cược với ${userBets.size} lựa chọn là ${Array.from(userBets.keys()).join(' ')}!`);
                    }
                }
            }
        });

        collector.on('end', async () => {
            const resultString = result.map(item => `${item.name} ${item.emoji}`).join(', ');

            if (userBets.size === 0) {
                const embed2 = new EmbedBuilder()
                    .setTitle('🎲 Kết quả Bầu Cua')
                    .setDescription(`Đã hết thời gian đặt cược! Kết quả: \n ${resultString}`)
                    .setColor('Red')
                    .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
                    .setTimestamp()
                    .setFooter({ text: 'Chúc bạn may mắn lần sau!' });
                await interaction.followUp({ embeds: [embed2] });
                return;
            }

            let totalWinnings = 0;
            let betResults = [];

            for (const [betEmoji] of userBets) {
                const matchingResult = result.find(item => item.emoji === betEmoji);
                if (matchingResult) {
                    // Thắng thì nhận lại tiền cược + tiền thưởng
                    totalWinnings += amount * 2;
                    betResults.push(`Thắng ${formatNumber(amount)} với ${matchingResult.name} ${matchingResult.emoji}`);
                } else {
                    // Thua thì mất tiền cược
                    totalWinnings -= amount;
                    const matchingBet = baucualist.find(item => item.emoji === betEmoji);
                    betResults.push(`Thua ${formatNumber(amount)} với ${matchingBet.name} ${matchingBet.emoji}`);
                }
            }

            await User.updateOne(
                { discordId: interaction.user.id },
                { $inc: { balance: totalWinnings } }
            );

            const betSummary = betResults.join('\n');
            const embed2 = new EmbedBuilder()
                .setTitle('🎲 Kết quả Bầu Cua')
                .setDescription(`**${interaction.user.username}** đã tham gia trò chơi Bầu Cua`)
                .setColor(totalWinnings > 0 ? '#00ff00' : '#ff0000')
                .addFields(
                    { name: '🎯 Kết quả xúc xắc', value: resultString, inline: false },
                    { name: '🎫 Lựa chọn của bạn', value: Array.from(userBets.keys()).join(' '), inline: true },
                    { name: '💰 Tiền cược', value: `${formatNumber(amount)}`, inline: true },
                    { name: '🏆 Kết quả', value: betSummary, inline: false },
                    { name: '💵 Tổng tiền thưởng', value: `${totalWinnings >= 0 ? '+' : ''}${formatNumber(totalWinnings)}`, inline: true },
                    { name: '💵 Số tiền còn lại', value: `${formatNumber(user.balance)}`, inline: true }
                )
                .setThumbnail('https://i.ibb.co/PzpqhNg/464364317-1044910207314456-4180777111429000799-n.jpg')
                .setTimestamp()
                .setFooter({ text: 'Chúc bạn may mắn lần sau!' });
            await interaction.editReply({ embeds: [embed2] });
        });
    }

}