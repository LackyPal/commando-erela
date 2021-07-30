module.exports = {
  name: "voiceStateUpdate",
  async execute(client, oldState, newState) {
    const player = await client.manager.get(oldState.guild.id);
    if (!player) return;

    const voiceChannel = client.channels.cache.get(player.voiceChannel);

    if (oldState && oldState.channel && !voiceChannel.members.filter(m => !m.user.bot).size && player.voiceChannel === oldState.channelID) {
      setTimeout(async () => {
        await client.util.sendQueueMessage(client, player, "I have left the voice channel as I was left alone.");
        return player.destroy();
      }, 60000);
    }
  }
};
