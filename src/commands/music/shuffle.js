const { Command } = require("discord.js-commando");

module.exports = class ShuffleCommand extends Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      aliases: ["mix"],
      description: "Mix the queue.",
      group: "music",
      guildOnly: true,
      memberName: "shuffle"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    const queue = player.queue;

    if (queue.length < 3)
      return message.say("Need at least \`3\` songs in the queue to shuffle.");

    queue.shuffle();

    return message.say("Shuffled the queue.");
  }
};
