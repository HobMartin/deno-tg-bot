import { Context } from "../deps.deno.ts";

export function replyToMessage(ctx: Context) {
  if (ctx.update?.message?.message_id) {
    return { reply_to_message_id: ctx.update.message.message_id };
  }
  return null;
}
