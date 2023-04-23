import { db } from "../db/index.ts";
import { Context, NextFunction } from "../deps.deno.ts";
import { replyToMessage } from "../lib/replyToMessage.ts";
import { mention } from "../lib/username.ts";

export const countMessages = async (ctx: Context, next: NextFunction) => {
  if (!ctx.message) return next();
  if (ctx.message.from?.is_bot) return next();

  const checkValidMessage =
    ctx.message?.sticker ||
    ctx.message?.photo ||
    ctx.message?.video ||
    ctx.message?.audio ||
    ctx.message?.voice ||
    ctx.message?.document ||
    (ctx.message?.text && ctx.message?.text?.trim().length >= 3);

  //check if message isn't a command
  if (!checkValidMessage) return next();

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
  } finally {
    await next();
  }
};
