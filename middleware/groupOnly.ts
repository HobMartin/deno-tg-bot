import { Context, NextFunction } from "../deps.deno.ts";

// middleware for group only
export const groupOnly = async (ctx: Context, next: NextFunction) => {
  if (ctx.chat?.type !== "supergroup") {
    return ctx.reply("Ця команда доступна тільки в супергрупах!");
  }
  await next();
};
