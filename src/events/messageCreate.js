const Event = require('../Event')

module.exports = new Event('messageCreate', (client, message) => {
  if (!message.content.startsWith(client.prefix)) return

  const args = message.content.substring(client.prefix.length).split(/ +/)

  const command = client.commands.find((cmd) => cmd.name == args[0])
  if (!command) {
    message.reply(`\"${args[0]}\" is not a valid command!`)
  } else {
    const permisson = message.member.permissions.has(command.permission, true)
    if (!permisson)
      message.reply(
        `You do not have the permission \`${command.permission}\` to run this command!`
      )
    command.run(message, args, client)
  }
})
