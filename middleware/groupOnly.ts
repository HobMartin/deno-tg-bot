import {
  Context,
  NextFunction,
} from "https://deno.land/x/grammy@v1.8.3/mod.ts";

// middleware for group only
export const groupOnly = async (ctx: Context, next: NextFunction) => {
  if (ctx.chat?.type !== "supergroup") {
    return ctx.reply("Ця команда доступна тільки в супергрупах!");
  }
  await next();
};
