module.exports = {
  name: "nodeConnect",
  execute(client, node) {
    console.log(`${node.options.identifier} has been connected.`);
  }
};