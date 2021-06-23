import Command from '../../constants/command';
import { default as axios } from 'axios'

const CatCommand: Command = {
    name: 'cat',
    description: 'Watch the images of some Cats',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://some-random-api.ml/img/cat").then((res) => {

        })
    },
}

export default CatCommand;