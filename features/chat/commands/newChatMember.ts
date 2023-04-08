import { Context } from "https://deno.land/x/grammy@v1.8.3/context.ts";
import { mention } from "../../../lib/username.ts";
import { replyToMessage } from "../../../lib/replyToMessage.ts";

export const newChatMember = (ctx: Context) => {
  if (!ctx.update.message?.new_chat_members?.length) return;
  const newMembers = ctx.update.message.new_chat_members;
  newMembers.forEach(async (newMember) => {
    if (newMember.is_bot) return;
    const helloMessage = `🎉 Привіт, ${mention(
      newMember
    )} !\nРаді тебе вітати 👋 в нашому ламповому чаті!`;

    await ctx.reply(
      `${helloMessage}\n\nПропоную тобі ознайомитись з ✍️ <a href=https://telegra.ph/Pravila-chatu-An%D1%96me-chat-CHern%D1%96vc%D1%96-04-09">правилами</a>`,
      { parse_mode: "HTML", ...replyToMessage(ctx) }
    );
  });
};
