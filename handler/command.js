const { readdirSync } = require('fs')

const Ascii = require('ascii-table')

const table = new Ascii().setHeading('Category', 'Command', 'Load status')

module.exports = (client) => {
  readdirSync('./commands/').forEach((dir) => {
    const commands = readdirSync(`./commands/${dir}/`).filter((f) =>
      f.endsWith('.js')
    )
    for (const file of commands) {
      const pull = require(`../commands/${dir}/${file}`)
      if (pull.name) {
        pull.name.forEach((item) => {
          client.commands.set(item, pull)
        })
        table.addRow(dir, file, '✔')
      } else {
        table.addRow(dir, file, '✘ -> missing something??')
        continue
      }

      if (pull.aliases && Array.isArray(pull)) {
        pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name))
      }
    }
  })

  console.log(table.toString())
}
