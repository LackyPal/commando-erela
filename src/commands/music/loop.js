const { Command } = require("discord.js-commando");

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      aliases: ["lp", "repeat"],
      description: "Sets the loop mode.",
      group: "music",
      guildOnly: true,
      memberName: "loop",
      args: [{
        key: "mode",
        prompt: "Provide a valid loop mode.",
        type: "string",
        default: "show",
        oneOf: ["song", "queue", "off"]
      }]
    });
  }
  run(message, { mode }) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    const data = `**Loop mode is set to: \`${player.get("repeatMode") ? player.get("repeatMode") == 2 ? "queue" : "song": "off"}\`**.
Use \`${message.guild.commandPrefix}loop <off|song|queue>\` to change loop mode.`;

    if (mode.toLowerCase() === "show")
      return message.say(data).catch(console.error);

    switch (mode.toLowerCase()) {
      case "off":
        player.set("repeatMode", 0);
        player.setQueueRepeat(false);
        player.setTrackRepeat(false);
        break;
      case "song":
        player.set("repeatMode", 1);
        player.setTrackRepeat(true);
        player.setQueueRepeat(false);
        break;
      case "queue":
        player.set("repeatMode", 2);
        player.setQueueRepeat(true);
        player.setTrackRepeat(false);
        break;
    }

    return message.say(`${player.get("repeatMode") ? player.get("repeatMode") == 2 ? "Looping queue is activated." : "Repeating song is activated." : "Turned off looping."}`);
  }
};
