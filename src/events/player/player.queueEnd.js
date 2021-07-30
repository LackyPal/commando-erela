module.exports = {
  name: "queueEnd",
  async execute(client, player, track) {
    const voiceChannel = client.channels.cache.get(player.voiceChannel);

    if (!player.get("autoplay")) {
      await player.destroy();
      return client.util.sendQueueMessage(client, player, "No more songs to play. Left the voice channel.");
    } else if (player.get("autoplay")) {
      const mixURL = `https://www.youtube.com/watch?v=${track.identifier}&list=RD${track.identifier}`;
      const result = await player.search(mixURL, client.user);

      if (!result || result.loadType === "LOAD_FAILED" || result.loadType !== "PLAYLIST_LOADED") {
        client.util.sendQueueMessage(client, player, "Music stopped. No related song was found.");
        return player.destroy();
      }

      player.queue.add(result.tracks[1]);
      return player.play();
    }
  }
};