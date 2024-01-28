//Run node src/register-commands.js to update/set up commands

require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js')

const commands = [
    {
        name: 'mute',
        description: 'mute a person',
        options: [
            {
                name: 'user',
                description: 'specify a user to mute',
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: 'duration',
                description: 'length in seconds',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    }
]
const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...')


        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )
        console.log('Slash commands workin epic')
    } catch (error) {
        console.log(`There was an error ${error}`)
    }
})();