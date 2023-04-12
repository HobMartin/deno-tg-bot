import { Bot, GrammyError, HttpError } from "./deps.deno.ts";

import Chat from "./features/chat/index.ts";
import Admin from "./features/admin/index.ts";
import { getEnv } from "./lib/getEnv.ts";

export const bot = new Bot(getEnv("BOT_TOKEN"));

bot.api.setMyCommands([
  { command: "user_info", description: "Подивись на себе, який ти крутий!" },
]);

bot.use(Chat);
bot.use(Admin);

bot.command("start", (ctx) => {
  ctx.reply("Welcome! Up and running.");
});

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});
