//Instructions for use:
//
// 1. npm init -y
// 2. npm install dotenv
// 3. npm install nodemon -g
// 4. Install discord.js@14.14.1
// 5. run nodemon in terminal
// 6. should work i hope

require('dotenv').config();
const { Client, IntentsBitField, PermissionsBitField, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`)

    client.user.setActivity({
        name: 'n1ckstars cry in pain while trying to fix me',
        type: ActivityType.Watching
    })
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'mute') {
        const memberinitcommand = interaction.member
        const user = interaction.options.get('user').value;
        const mutedRole = process.env.MUTE_ROLE_ID;
        const role = interaction.guild.roles.cache.get(mutedRole);
        console.log(memberinitcommand)

        if (memberinitcommand.permissions.has(PermissionsBitField.Flags.MuteMembers, true)) {
            interaction.guild.members.fetch(user)
            .then(member => {
                member.roles.add(role);
                interaction.reply(`Role ${role.name} added successfully!`);

                setTimeout(() => {
                    member.roles.remove(role)
                }, (interaction.options.get('duration').value) * 1000)
            })

            .catch(error => {
                console.error(error);
                interaction.reply({ content: 'Unable to add role. No idea why check console bozo', ephemeral: true });
            });
        }
        else {
            interaction.reply({content: 'You do not have the sufficient permissions to run this command', ephemeral: true})
        }

        if (!role) {
            return message.channel.send('There is no Muted role on this server');
        }
    }
})

client.login(process.env.TOKEN)