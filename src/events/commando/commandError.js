const { FriendlyError } = require("discord.js-commando");

module.exports = {
  name: "commandError",
  execute(client, command, error) {
    if (error instanceof FriendlyError) return;
    console.error(`Error in command ${command.groupID}:${command.memberName}`, `\n${error}`);
  }
};
