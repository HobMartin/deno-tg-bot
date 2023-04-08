import { Context, NextFunction } from "grammy";

// middleware for specific chat
export const chatOnly =
  (chatId: number) => async (ctx: Context, next: NextFunction) => {
    if (ctx.chat?.id !== chatId) {
      return ctx.reply("Ця команда доступна тільки в цьому чаті!");
    }
    await next();
  };
