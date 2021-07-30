module.exports = {
  name: "playerCreate",
  execute(client, player) {
    player.setVolume(100);
    player.set("autoplay", false);
    player.set("filter", null);
    player.set("repeatMode", 0);
  }
};
