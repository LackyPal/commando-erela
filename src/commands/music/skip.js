const { Command } = require("discord.js-commando");

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      aliases: ["s", "next"],
      group: "music",
      memberName: "skip",
      description: "Skips to the next song.",
      guildOnly: true
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    if (player.queue.length < 1 && !player.get("autoplay"))
      return message.say("No more songs in the queue to skip.");

    player.stop();

    return message.say("Skipped to the next song.")
  }
};
