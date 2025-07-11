const token = process.env.token;
const CHANNEL_ID = process.env.channel_id;
const ROLE_ID = process.env.role__id;

import {loadConfig} from "./misc/config.js";
import {startBot} from "./discord/bot.js";
import {loadLogger} from "./misc/logger.js";
import {transferUserDataFromOldUsersJson} from "./valorant/auth.js";

/* TODO list:
 * (done) Balance
 * (done) Auto fetch skins on startup
 * (done) Skin notifier/reminder
 * (done) Auto check for new valorant version every 15 minutes
 * (done) See current bundles
 * Password encryptor
 * Inspect weapon skin (all 4 levels + videos + radianite upgrade price)
 * Option to send shop automatically every day
 * More options in config.json
 * Simple analytics to see how many servers the bot is in
 * Admin commands (delete user, see/edit everyone's alerts, etc.)
 */

const config = loadConfig();
if(config) {
    loadLogger();
    transferUserDataFromOldUsersJson();
    startBot();
}
const cron = require('node-cron');

// Replace these with YOUR IDs
const CHANNEL_ID = '1393078205392490679'; // Channel ID where the bot should post
const ROLE_ID = '1095812272309403801';   // Role or user ID to ping

client.once('ready', () => {
  console.log('I’m ready! Scheduling the daily /shop…');

  // Every night at 1 AM
  cron.schedule('0 1 * * *', async () => {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) return;

    // Ping the role and send the /shop command
    await channel.send(`<@&${ROLE_ID}>`);
    await channel.send('/shop');
  });
});
