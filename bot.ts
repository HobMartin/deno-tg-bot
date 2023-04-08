import { Bot } from "grammy";

import Chat from "./features/chat/index.ts";
import Admin from "./features/admin/index.ts";
import { getEnv } from "./lib/getEnv.ts";

export const bot = new Bot(getEnv("BOT_TOKEN"));

bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "ping", description: "Ping the bot" },
]);

bot.use(Chat);
bot.use(Admin);

bot.command("start", (ctx) => {
  ctx.reply("Welcome! Up and running.");
});

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));
