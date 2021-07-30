const { Command } = require("discord.js-commando");
const levels = {
  off: 0.0,
  low: 0.10,
  medium: 0.15,
  high: 0.25,
};

module.exports = class BassboostCommand extends Command {
  constructor(client) {
    super(client, {
      name: "bassboost",
      aliases: ["bb", "bass"],
      description: "Sets the bassboost filter level (off|low|medium|high).",
      group: "filters",
      guildOnly: true,
      memberName: "bassboost",
      args: [{
        key: "level",
        prompt: "Provide a valid bassboost level.",
        type: "string",
        oneOf: ["off", "low", "medium", "high"]
      }]
    });
  }
  run(message, { level }) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    const option = level.toLowerCase();

    const bands = new Array(3)
      .fill(null)
      .map((_, i) =>
        ({ band: i, gain: levels[option] })
      );

    player.setEQ(...bands);
    player.set("filter", `bb${option}`);

    return message.say(`Bassboost level set to \`${level}\`.`);
  }
};
