import "dotenv/config";
process.env.TZ = "Europe/Berlin";

import cron from "node-cron";
import { App } from "@slack/bolt";
import fs from "fs";
const quotes = JSON.parse(fs.readFileSync("bible.json", "utf-8"))[0].chapters.flat();
const letters = ",.aueg";
const app = new App({
    token: process.env.USER_TOKEN,
    appToken: process.env.APP_TOKEN,
    socketMode: true
});

const post = async () => {
    await app.client.chat.postMessage({
        channel: process.env.CHANNEL!,
        text: `<!subteam^${process.env.PING}> ` + (Math.random() < 0.05 ? quotes[Math.floor(Math.random() * quotes.length)] : new Array(Math.floor(Math.random() * 40 + 10)).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join(""))
    });
};
cron.schedule("0 9 * * *", post);
cron.schedule("0 15 * * *", post);
cron.schedule("0 21 * * *", post);