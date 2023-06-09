import { ANIME_GIF } from "../assets/gif.ts";
import { replyToMessage } from "../lib/replyToMessage.ts";
import { Context, NextFunction } from "../deps.deno.ts";

const getRandomGif = () => {
  const randomIndex = Math.floor(Math.random() * ANIME_GIF.length);
  return ANIME_GIF[randomIndex];
};

export const loading = async (ctx: Context, next: NextFunction) => {
  const message = `⏳ <b>Зачекайте будь ласка...</b>\n<a href="${getRandomGif()}">⁠</a>`;

  const loadingGif = await ctx.reply(message, {
    parse_mode: "HTML",
    ...replyToMessage(ctx),
  });
  try {
    await next();
  } catch (e) {
    console.log(e);
  } finally {
    if (ctx.message?.chat.id)
      await ctx.api.deleteMessage(ctx.message?.chat.id, loadingGif.message_id);
  }
};
