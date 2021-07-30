module.exports = {
  name: "trackStart",
  async execute(client, player, track) {
    const channel = await client.channels.cache.get(player.textChannel);

    return channel.send(`Now playing **\`${track.title}\`** ~ [${track.requester.tag}]`);
  }
};