import Command from '../../constants/command';
//@ts-ignore
import Nuggies from 'nuggies';
import discordbuttons from 'discord-buttons'

const GiveawayStart: Command = {
    name: 'giveaway-start',
    description: 'Start a giveaway!',
    aliases: [
        'g-start',
        'gstart'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        let prize

        message.channel.send("**What should be the prize of the giveaway**")
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 30000 }).then(collected => {
                prize = collected.first()?.content
            }).catch(() => {
                message.reply('**No answer after 30 seconds, operation canceled.**');
            })

        message.channel.send("**How many winners will be there in this giveaway?**")
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 30000 }).then(collected => {
                prize = collected.first()?.content
            }).catch(() => {
                message.reply('**No answer after 30 seconds, operation canceled.**');
            })

        message.channel.send("**After how long will the giveaway end?**")
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 30000 }).then(collected => {
                prize = collected.first()?.content
            }).catch(() => {
                message.reply('**No answer after 30 seconds, operation canceled.**');
            })

        message.channel.send("**What are the requirements of this giveaway? Type 'nothing' to skip.**")
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 30000 }).then(collected => {
                prize = collected.first()?.content
            }).catch(() => {
                message.reply('**No answer after 30 seconds, operation canceled.**');
            })

        message.channel.send("**What is the channel this giveaway will happen? Type 'nothing' to do the giveaway here.**")
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 30000 }).then(collected => {
                prize = collected.first()?.content
            }).catch(() => {
                message.reply('**No answer after 30 seconds, operation canceled.**');
            })

        Nuggies.giveaways.create({
            message: message,
            prize: prize,
            host: message.author.id,
            winners: 1,
            endAfter: "10s",
            requirements: { enabled: false },
            channel: message.channel.id,
        });

        client.on('clickButton', button => {
            Nuggies.buttonclick(client, button);
        });
    },
}

export default GiveawayStart;