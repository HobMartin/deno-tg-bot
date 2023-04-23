import { db } from "../../../db/index.ts";
import { Context } from "../../../deps.deno.ts";
import { replyToMessage } from "../../../lib/replyToMessage.ts";
import { mention } from "../../../lib/username.ts";

export const countMessages = async (ctx: Context) => {
  if (!ctx.message) return;
  if (ctx.message.from?.is_bot) return;

  if (ctx.message?.text?.trim().length && ctx.message?.text?.trim().length <= 3)
    return;

  try {
    await db.collection("users").updateOne(
      { userId: ctx.message?.from?.id },
      {
        $inc: { messages: 1 },
      }
    );

    const user = await db.collection("users").findOne({
      userId: ctx.message?.from?.id,
    });

    if (user?.messages && user.messages % 100 === 0) {
      await db.collection("users").updateOne(
        { userId: ctx.message?.from?.id },
        {
          $inc: { reputation: 10 },
        }
      );
      ctx.reply(
        `🎊 ${mention(ctx.message.from)}(${
          user?.reputation
        }) Вітаю з досягненням в ${user.messages} повідомлень! +10 репутації!`,
        {
          parse_mode: "HTML",
          ...replyToMessage(ctx),
        }
      );
    }
  } catch (_e) {
    ctx.reply("Щось пішло не так, спробуйте ще раз!");
  }
};
