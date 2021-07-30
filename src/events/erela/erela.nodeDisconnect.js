module.exports = {
  name: "nodeDisconnect",
  execute(client, node, reason) {
    console.log(`${node.options.identifier} has been disconnected.`, `\n${reason.reason}`);
  }
};