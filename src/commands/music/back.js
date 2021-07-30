const { Command } = require("discord.js-commando");

module.exports = class BackCommand extends Command {
  constructor(client) {
    super(client, {
      name: "back",
      aliases: ["prev", "previous"],
      description: "Backs to the previous song",
      group: "music",
      guildOnly: true,
      memberName: "previous"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    const track = player.queue.previous;

    if (!track)
      return message.say("No previous track was found.");

    player.queue.add(track, 0);
    player.stop();

    return message.say("Backed to the previous song.");
  }
};
