import { Context } from "https://deno.land/x/grammy@v1.8.3/mod.ts";
import { mention } from "../../../lib/username.ts";

export const leftChatMember = (ctx: Context) => {
  if (ctx.update?.message?.from?.is_bot) return;
  ctx.reply(
    `😔 Прощавай, ${mention(
      ctx.update.message?.from
    )} !\n\nМи будемо сумувати 😭`,
    { parse_mode: "HTML" }
  );
};
