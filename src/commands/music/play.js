const { Command } = require("discord.js-commando");
const SpotifyRegex = /(?:https:\/\/open\.spotify\.com\/|spotify:)(?:.+)?(track|playlist|album)[\/:]([A-Za-z0-9]+)/;

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["p"],
      description: "Play a song or playlist from url or name",
      format: "play <song> [flag]",
      examples: [
        "play shape of you",
        "play bad habits --skip",
        "play i don't care --next",
        "play https://open.spotify.com/playlist/37i9dQZF1DWWxPM4nWdhyI",
        "play https://youtu.be/Bg8Yb9zGYyA"
      ],
      group: "music",
      guarded: true,
      guildOnly: true,
      memberName: "play",
      throttling: {
        usages: 1,
        duration: 4
      },
      clientPermissions: ["CONNECT", "SPEAK"],
      args: [{
        key: "song",
        prompt: "Provide the song name/url to play.",
        type: "string"
      }]
    });
  }
  async run(message, { song }) {
    const { channel } = message.member.voice;

    if (!channel)
      return message.say("You need to join a voice channel first.");

    const guildPlayer = this.client.manager.get(message.guild.id);
    if (guildPlayer && channel.id !== guildPlayer.voiceChannel)
      return message.say("You're not in the same voice channel as me.");

    if (!channel.viewable)
      return message.say("I need **\`VIEW_CHANNEL\`** permission.");
    if (!channel.joinable)
      return message.say("I need **\`CONNECT_CHANNEL\`** permission.");
    if (!channel.speakable)
      return message.say("I need **\`SPEAK\`** permission.");
    if (channel.full)
      return message.say("Can't join, that voice channel is full.");

    try {
      let player;
      if (guildPlayer) player = guildPlayer;
      else player = this.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        selfDeafen: true
      });

      if (player.state !== "CONNECTED") player.connect();

      const queue = player.queue;

      let query = song;
      let option = song.slice(-6).toLowerCase();
      let position = undefined;

      if (option === "--next" || option === "--skip") {
        query = song.slice(0, -6);
        position = 0;
      }

      if (SpotifyRegex.test(query)) query = query.replace("user\/spotify\/", "");

      let result = await player.search(query, message.author);

      switch (result.loadType) {
        case "NO_MATCHES":
        case "LOAD_FAILED":
          console.error(result.exception.message || result.exception || result);
          if (!queue.current) player.destroy();
          return message.say(`No result was found for \`${query}\`.`);
          break;
        case "PLAYLIST_LOADED":
          const plTracks = result.tracks;
          queue.add(plTracks, position);
          message.say(`${plTracks.length} tracks queued from: \`${result.playlist.name}\`.`);
          break;
        default:
          //  case "TRACK_LOADED":
          //  case "SEARCH_RESULT":
          const track = result.tracks[0];
          queue.add(track, position);
          if (queue.size > 0 && option !== "--skip") message.say(`Enqueued \`${track.title}\`.`);
      }

      if (!player.playing && !player.paused) {
        await player.play();
      } else if (queue.current && option === "--skip") {
        await player.stop();
      }
    } catch (e) {
      console.error(e);
    }
  }
};
