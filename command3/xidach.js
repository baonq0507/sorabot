const { SlashCommandBuilder } = require("discord.js");
const User = require('../models/user');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { APP_NAME, THUMBNAIL } = process.env;
const { formatNumber } = require('../common');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xidach')
        .setDescription('Chơi game xì dách')
        .addIntegerOption(option => option.setName('sotiencuoc').setDescription('Số tiền cược').setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('sotiencuoc');
        let user = await User.findOne({ discordId: interaction.user.id });

        if (!user) {
            user = await User.create({ discordId: interaction.user.id, displayName: interaction.user.displayName });
        }
        if (user.balance < amount) {
            await interaction.reply('Bạn không có đủ tiền để chơi game!');
            return;
        }
        // await User.updateOne({ discordId: interaction.user.id }, { $inc: { balance: -amount } });
        user.balance -= amount;
        await user.save();

        const playerCard1 = Math.floor(Math.random() * 13) + 1;
        const playerCard2 = Math.floor(Math.random() * 13) + 1;
        const botCard1 = Math.floor(Math.random() * 13) + 1;
        const botCard2 = Math.floor(Math.random() * 13) + 1;
        const playerScore = playerCard1 + playerCard2;
        const botScore = botCard1 + botCard2;
        
        const embed = new EmbedBuilder()
            .setTitle('🎲 Xì dách 🎲')
            .setColor('Blue')
            .addFields(
                { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore}`, inline: true },
                { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
            )
            .setThumbnail(THUMBNAIL)
            .setFooter({ text: `💰 Số tiền: ${formatNumber(amount)}`, iconURL: interaction.user.displayAvatarURL() });

        let components = [];
        if (playerScore < 21 && playerScore < botScore) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('pullcard')
                        .setLabel('🎴 Kéo')
                        .setStyle(ButtonStyle.Primary)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('notpullcard')
                        .setLabel('❌ Không kéo')
                        .setStyle(ButtonStyle.Secondary)
                );
            components = [row];
        }

        // Kiểm tra điều kiện 21 điểm và bot quá 21 điểm
        if (playerScore === 21 && botScore === 21) {
            embed.setDescription('🤝 Hòa! Cả hai đều đạt 21 điểm');
            embed.setColor('Green');
            user.balance += amount;
            await user.save();
            embed.setFields(
                { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore}`, inline: true },
                { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                { name: '💰 Số tiền', value: `💰 Hòa +0`, inline: true },
                { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
            );
        } else if (playerScore > 21) {
            embed.setDescription(`❌ ${interaction.user.displayName} thua! Quá 21 điểm`);
            embed.setColor('Red');
            embed.setFields(
                { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore}`, inline: true },
                { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                { name: '💰 Số tiền', value: `💰 Thua -${formatNumber(amount)}`, inline: true },
                { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
            );
        } else if (botScore > 21) {
            embed.setDescription(`🎉 ${interaction.user.displayName} thắng! Bot quá 21 điểm`);
            embed.setColor('Green');
            user.balance += amount * 2;
            await user.save();
            embed.setFields(
                { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore}`, inline: true },
                { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                { name: '💰 Số tiền', value: `💰 Thắng +${formatNumber(amount * 2)}`, inline: true },
                { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
            );
        } else if (playerScore === botScore) {
            embed.setDescription('🤝 Hòa! Cả hai đều bằng điểm');
            embed.setColor('Green');
            user.balance += amount;
            await user.save();
            embed.setFields(
                { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore}`, inline: true },
                { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                { name: '💰 Số tiền', value: `💰 Hòa +0`, inline: true },
                { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
            );
        } else if (playerScore > botScore) {
            embed.setDescription(`🎉 ${interaction.user.displayName} thắng! Điểm cao hơn bot`);
            embed.setColor('Green');
            user.balance += amount * 2;
            await user.save();
            embed.setFields(
                { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore}`, inline: true },
                { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                { name: '💰 Số tiền', value: `💰 Thắng +${formatNumber(amount * 2)}`, inline: true },
                { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
            );
        } else {
            embed.setDescription(`❌ ${interaction.user.displayName} thua! Điểm thấp hơn bot`);
            embed.setColor('Red');
            embed.setFields(
                { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore}`, inline: true },
                { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                { name: '💰 Số tiền', value: `💰 Thua -${formatNumber(amount)}`, inline: true },
                { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
            );
        }

        const message = await interaction.reply({ embeds: [embed], components, fetchReply: true });
        
        // action khi click button pullcard và notpullcard
        const collector = message.createMessageComponentCollector();
        
        collector.on('collect', async (i) => {
            if (!i.isButton()) return;
            
            // Check if the user who clicked is the same as the one who started the game
            if (i.user.id !== interaction.user.id) {
                await i.reply({ content: '❌ Bạn không phải người chơi game này!', ephemeral: true });
                return;
            }

            if (i.customId === 'pullcard') {
                try {
                    const card = Math.floor(Math.random() * 13) + 1;
                    const newPlayerScore = playerScore + card;
                    let result;
                    if (newPlayerScore > 21) {
                        result = `❌ ${interaction.user.displayName} rút được ${card} điểm! Thua do quá 21 điểm`;
                        embed.setColor('Red');
                        embed.setFields(
                            { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore} + ${card} = ${newPlayerScore}`, inline: true },
                            { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                            { name: '💰 Số tiền', value: `💰 Thua -${formatNumber(amount)}`, inline: true },
                            { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
                        );
                    } else if (newPlayerScore === botScore) {
                        result = `🤝 ${interaction.user.displayName} rút được ${card} điểm! Hòa do cả hai đều bằng điểm`;
                        embed.setColor('Green');
                        user.balance += amount;
                        await user.save();
                        embed.setFields(
                            { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore} + ${card} = ${newPlayerScore}`, inline: true },
                            { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                            { name: '💰 Số tiền', value: `💰 Hòa +0`, inline: true },
                            { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
                        );
                    } else if (newPlayerScore > botScore) {
                        result = `🎉 ${interaction.user.displayName} rút được ${card} điểm! Thắng với ${newPlayerScore} điểm`;
                        embed.setColor('Green');
                        user.balance += amount * 2;
                        await user.save();
                        embed.setFields(
                            { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore} + ${card} = ${newPlayerScore}`, inline: true },
                            { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                            { name: '💰 Số tiền', value: `💰 Thắng +${formatNumber(amount * 2)}`, inline: true },
                            { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
                        );
                    } else if (newPlayerScore < botScore) {
                        result = `❌ ${interaction.user.displayName} rút được ${card} điểm! Thua với ${newPlayerScore} điểm`;
                        embed.setColor('Red');
                        embed.setFields(
                            { name: `👤 ${interaction.user.displayName}`, value: `🎯 ${playerScore} + ${card} = ${newPlayerScore}`, inline: true },
                            { name: `🤖 ${APP_NAME}`, value: `🎯 ${botScore}`, inline: true },
                            { name: '💰 Số tiền', value: `💰 Thua -${formatNumber(amount)}`, inline: true },
                            { name: '💰 Số tiền còn lại', value: `💰 ${user.balance}`, inline: true }
                        );
                    }

                    embed.setDescription(result);
                    await i.update({ embeds: [embed], components: [] });
                } catch (error) {
                    console.error('Error handling pullcard:', error);
                }
            } else if (i.customId === 'notpullcard') {
                let result;
                if (playerScore > 21) {
                    result = `❌ ${interaction.user.displayName} thua! Quá 21 điểm`;
                } else if (botScore > 21) {
                    result = `🎉 ${interaction.user.displayName} thắng! Bot quá 21 điểm`;
                } else if (playerScore === 21 && botScore === 21) {
                    result = '🤝 Hòa! Cả hai đều 21 điểm';
                } else if (playerScore > botScore) {
                    result = `🎉 ${interaction.user.displayName} thắng!`;
                } else if (playerScore < botScore) {
                    result = `❌ ${interaction.user.displayName} thua!`;
                } else {
                    result = '🤝 Hòa!';
                }

                embed.setDescription(result);
                await i.update({ embeds: [embed], components: [] });
            }
        });

        collector.on('end', () => {
            if (!message.deleted) {
                message.edit({ components: [] }).catch(console.error);
            }
        });
    }
}