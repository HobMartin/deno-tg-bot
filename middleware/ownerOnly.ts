import { Context, NextFunction } from "../deps.deno.ts";
import { getEnv } from "../lib/getEnv.ts";

// middleware for owner only
export const ownerOnly = (ctx: Context, next: NextFunction) => {
  if (ctx.from?.id !== +getEnv("OWNER_ID")) {
    return ctx.reply("Ця команда доступна тільки власнику бота!");
  }
  return next();
};
