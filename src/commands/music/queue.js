const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      aliases: ["q", "list"],
      description: "Shows the queue.",
      examples: ["queue 2"],
      group: "music",
      guildOnly: true,
      memberName: "queue",
      args: [{
        key: "pageNum",
        prompt: "Provide a valid page number of the queue.",
        type: "integer",
        default: 1,
        validate: pageNum => pageNum >= 1
      }]
    });
  }
  run(message, { pageNum }) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    const queue = player.queue;

    if (!queue.length)
      return message.say("There is currently no song in the queue.");

    const multiple = 10;
    const maxPages = Math.ceil(queue.length / multiple);

    let page = pageNum;
    if (!Number.isInteger(pageNum) || page < 1 || page > maxPages) page = 1;

    const end = page * multiple;
    const start = end - multiple;

    const np = queue.current;
    const tracks = queue.slice(start, end);

    const data = `> Nowplaying: **${np.title}** ~ [${np.requester.tag}]
\`\`\`\n${tracks.map((song, i) => `${start + (++i)}\) ${song.title} ~ ${this.client.util.formatDuration(song.duration)}`).join("\n")}\`\`\`
Page ${page} of ${maxPages} | song ${start + 1} to ${end > queue.length ? `${queue.length}` : `${end}`} of ${queue.length}`;

    return message.channel.send(data).catch(console.error);
  }
};
