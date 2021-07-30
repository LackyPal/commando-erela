const Commando = require("discord.js-commando");

const { Manager } = require("erela.js");
const Spotify = require("@kaname-png/erela.js-spotify");
const Deezer = require("erela.js-deezer");
const Facebook = require("erela.js-facebook");
const Filters = require("erela.js-filters");

const { readdirSync } = require("fs");
const path = require("path");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const util = require("./include/util");

const config = require("../config.json");

const client = new Commando.Client({
  owner: config.owners,
  commandPrefix: config.prefix
});

client.util = util;

client.manager = new Manager({
  nodes: [{
    "host": "lava.link",
    "port": 80,
    "password": "youshallnotpass",
    "retryDelay": 5000,
       }],
  plugins: [
      new Spotify(),
      new Deezer(),
      new Facebook(),
      new Filters()
      ],
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
});

require("./include/eventsHandler")(client);

client.setProvider(
  sqlite.open({ filename: "database.db", driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["filters", "Audio Filters"],
    ["music", "Music Commands"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    unknownCommand: false
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.login(config.token);

// Unhandled errors
process.on("unhandledRejection", (error) => console.error(error));

process.on("uncaughtExceptionMonitor", (error) => console.error(error));

process.on("warning", (warn) => {
  if (warn.stack.startsWith("(node:13988) [DEP0148]")) return;
  console.warn(warn);
});