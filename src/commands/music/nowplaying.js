const { Command } = require("discord.js-commando");
const { splitBar } = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = class NowplayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      aliases: ["np", "current"],
      description: "Shows details about the currently playing song.",
      group: "music",
      guildOnly: true,
      memberName: "nowplaying"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    let track = player.queue.current;

    const embed = new MessageEmbed()
      .setAuthor("Now playing ♪", this.client.user.displayAvatarURL())
      .setTitle(track.title)
      .setURL(track.uri)
      .setDescription(`**~ Played by:** ${track.requester}`)
      .addField(splitBar(track.isStream ? player.position : track.duration, player.position, 20)[0],
        `${this.client.util.formatDuration(player.position)} \/ ${track.isStream ? "Live" : this.client.util.formatDuration(track.duration)}`
      )
      .setThumbnail(track.thumbnail);

    message.channel.send(embed);
  }
};
