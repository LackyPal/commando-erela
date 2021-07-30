module.exports = {
  name: "playerMove",
  async execute(client, player, oldChannel, newChannel) {
    if (!newChannel) {
      await player.destroy();
      return client.util.sendQueueMessage(client, player, "Music stopped as I have been disconnected from the voice channel.");
    } else {
      player.voiceChannel = newChannel;
    }
  }
};