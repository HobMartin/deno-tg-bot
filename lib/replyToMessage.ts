import { Context } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

export function replyToMessage(ctx: Context) {
  if (ctx.update?.message?.message_id) {
    return { reply_to_message_id: ctx.update.message.message_id };
  }
  return null;
}
