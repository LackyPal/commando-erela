module.exports = {
  name: "trackError",
  execute(client, player, track, payload) {
    console.error(`${track.uri} got errored`, `\n${payload.error}`);
    return client.util.sendQueueMessage(client, player, "An error occurred while playing. Sorry for the inconveniences.");
  }
};
