const { Client, Message } = require("discord.js");

/**
 * Check if the message.member can modify queue
 * @param {Message} message
 */
function canModifyQueue(message) {
  if (!message) {
    throw Error("'message' must be passed down as param! (canModifyQueue)");
  }

  const memberChannelId = message.member.voice.channelID;
  const botChannelId = message.guild.voice.channelID;

  if (!memberChannelId) {
    message.say("You need to join a voice channel first.");
    return;
  }

  if (memberChannelId !== botChannelId) {
    message.say("You're not in the same voice channel as me.");
    return;
  }

  return true;
}


/**
 * Send a custom message to player textChannel
 * @param {Client} client
 * @param {object} player
 * @param {string} text
 */
function sendQueueMessage(client, player, text) {
  if (!client) {
    throw Error("'client' must be passed down as param! (sendQueueMessage)");
  }

  if (!player) {
    throw Error("'player' must be passed down as param! (sendQueueMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (sendQueueMessage)");
  }

  const channel = client.channels.cache.get(player.textChannel);

  return channel.send(text);
}

/**
 * @param {number} int
 */
const formatInt = (int) => (int < 10 ? `0${int}` : int);

/**
 * Format duration to string
 * @param {number} millisec Duration in milliseconds
 * @returns {string}
 */
function formatDuration(millisec) {
  if (!millisec || !Number(millisec)) return "00:00";
  const seconds = Math.round((millisec % 60000) / 1000);
  const minutes = Math.floor((millisec % 3600000) / 60000);
  const hours = Math.floor(millisec / 3600000);
  if (hours > 0) return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  if (minutes > 0) return `${formatInt(minutes)}:${formatInt(seconds)}`;
  return `00:${formatInt(seconds)}`;
};


/**
 * Convert formatted duration to seconds
 * @param {*} import Formatted duration string
 * @returns {number}
 */
function toMilliSeconds(input) {
  if (!input) return 0;
  if (typeof input !== "string") return Number(input) || 0;
  if (input.match(/:/g)) {
    const time = input.split(":").reverse();
    let s = 0;
    for (let i = 0; i < 3; i++)
      if (time[i]) s += Number(time[i].replace(/[^\d.]+/g, "")) * Math.pow(60, i);
    if (time.length > 3) s += Number(time[3].replace(/[^\d.]+/g, "")) * 24 * 60 * 60;
    return Number(s * 1000);
  } else {
    return Number(input.replace(/[^\d.]+/g, "") * 1000) || 0;
  }
}


/**
 * Parse number from input
 * @param {*} input Any
 * @returns {number}
 */
function parseNumber(input) {
  if (typeof input === "string") return Number(input.replace(/[^\d.]+/g, "")) || 0;
  return Number(input) || 0;
}


module.exports = {
  canModifyQueue,
  sendQueueMessage,
  formatInt,
  formatDuration,
  toMilliSeconds,
  parseNumber
};
