import { Bot } from "grammy";
import { load } from "dotenv";
import { db } from "./db/index.ts";

const env = await load();

export const bot = new Bot(env["BOT_TOKEN"] || Deno.env.get("BOT_TOKEN") || "");

// set bot commands
bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "ping", description: "Ping the bot" },
]);

bot.command("start", async (ctx) => {
  console.log(ctx.from);

  if (ctx.from) {
    await db.collection("users").insertOne({
      userId: ctx.from.id,
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
    });
  }
  ctx.reply("Welcome! Up and running.");
});

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));
