const { Command } = require("discord.js-commando");

module.exports = class RemoveCommand extends Command {
  constructor(client) {
    super(client, {
      name: "remove",
      aliases: ["rm"],
      description: "Removes a specific song from the queue.",
      group: "music",
      guildOnly: true,
      memberName: "remove",
      args: [{
        key: "index",
        prompt: "Provide a valid song index.",
        type: "integer",
        validate: index => index >= 1
      }]
    });
  }
  run(message, { index }) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    const songNum = (Number(index) - 1);
    const queue = player.queue;

    if (songNum < 0 || songNum > queue.length || !queue[songNum])
      return message.say("Provided song index does not exist.");

    const track = queue.remove(songNum);

    return message.say(`Removed \`${track.title}\`.`);
  }
};
