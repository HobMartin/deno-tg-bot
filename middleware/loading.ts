import _ from "npm:lodash";

import { ANIME_GIF } from "../assets/gif.ts";
import { replyToMessage } from "../lib/replyToMessage.ts";
import {
  Context,
  NextFunction,
} from "https://deno.land/x/grammy@v1.8.3/mod.ts";

const getRandomGif = () => {
  return _.sample(ANIME_GIF);
};

export const loading = async (ctx: Context, next: NextFunction) => {
  const message = `⏳ <b>Зачекайте будь ласка...</b>\n<a href="${getRandomGif()}">⁠</a>`;

  const loadingGif = await ctx.reply(message, {
    parse_mode: "HTML",
    ...replyToMessage(ctx),
  });
  await next();
  if (ctx.message?.chat.id)
    await ctx.api.deleteMessage(ctx.message?.chat.id, loadingGif.message_id);
};
