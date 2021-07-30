const { Command } = require("discord.js-commando");

module.exports = class JumpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "jump",
      aliases: ["skipto", "st"],
      description: "Jump to a specific song in the queue.",
      group: "music",
      guildOnly: true,
      memberName: "jump",
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

    player.stop(songNum);

    return message.say(`Jumped to \`${index}\` song.`)
  }
};
