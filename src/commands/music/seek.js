const { Command } = require("discord.js-commando");

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "seek",
      description: "Seek to a specific duration in the song.",
      group: "music",
      guildOnly: true,
      memberName: "seek",
      args: [{
        key: "duration",
        prompt: "Provide a valid duration to seek.",
        type: "string"
      }]
    });
  }
  run(message, { duration }) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    const song = player.queue.current;

    if (!song.isSeekable)
      return message.say("Can't seek in this song.");

    if (isNaN(duration) && !duration.includes(":"))
      return message.say("Provide a valid duration to seek.");

    let timeString = duration;
    if (!isNaN(timeString)) timeString = `00:${timeString}`;

    let time = this.client.util.toMilliSeconds(timeString);
    if (time === song.duration) time = song.duration - 1;

    if (!time || isNaN(time) || time >= song.duration || time < 0)
      return message.say("Provide a valid duration to seek.");

    player.seek(time);

    return message.say(`Seeked to \`${timeString}\`.`);
  }
};
