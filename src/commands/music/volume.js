const { Command } = require("discord.js-commando");

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      aliases: ["vol", "v"],
      description: "Sets the playback output volume.",
      examples: ["volume 130"],
      group: "music",
      guildOnly: true,
      memberName: "volume"
    });
  }
  run(message, args) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    if (!args)
      return message.say(`Volume is at \`${player.volume}%\`.`)

    const newVol = Number(args);

    if (!newVol || isNaN(newVol) || !Number.isInteger(newVol) || newVol > 150 || newVol < 0)
      return message.say("Provide a valid amount between 1 to 150.");

    player.setVolume(newVol);

    return message.say(`Playback volume set to \`${newVol}%\`.`);
  }
};
