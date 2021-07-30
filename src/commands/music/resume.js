const { Command } = require("discord.js-commando");

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      aliases: ["unpause", "continue"],
      description: "Resumes the paused playback.",
      group: "music",
      guildOnly: true,
      memberName: "resume"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    if (!player.paused)
      return message.say("The playback is not paused.");

    player.pause(false);

    return message.say("Resumed the playback.");
  }
};
