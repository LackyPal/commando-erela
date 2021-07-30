const { Command } = require("discord.js-commando");

module.exports = class AutoplayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "clearfilter",
      aliases: ["clearfilters", "resetfilter"],
      description: "Reset all filters.",
      group: "filters",
      guildOnly: true,
      memberName: "autoplay"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    if (!player.get("filter"))
      return message.say("No filter is applied currently.");

    player.reset();
    player.set("filter", null);
    return message.say("Reset all filters.");
  }
};