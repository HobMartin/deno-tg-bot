import { Context } from "grammy";
import { db } from "../../../db/index.ts";
import { mention } from "../../../lib/username.ts";
import { getRandomNumber } from "../../../lib/getRandomNumber.ts";
import { getPostfix } from "../utils/reputation.ts";

const TIMEOUT = 10000; // 10 seconds

export const addReputation = async (ctx: Context) => {
  if (!ctx.update.message) return;
  const { from, reply_to_message: reply } = ctx.update.message;
  if (!reply) return;
  if (reply.from?.is_bot) return;
  if (reply.text === "+") {
    ctx.reply(
      "Щоб підняти репутацію, ви повинні відповісти на початкове повідомлення!"
    );
    return;
  }
  //timeout
  try {
    const lastReputation = await db
      .collection("users")
      .findOne({ userId: from?.id });
    if (lastReputation?.lastReputation) {
      const timeout = TIMEOUT; // 10 seconds
      const now = Date.now();
      const diff = now - lastReputation.lastReputation;
      if (diff < timeout) {
        const seconds = Math.floor((timeout - diff) / 1000) % 60;
        ctx.reply(
          `Ви не можете збільшити репутацію так швидко! Спробуйте через ${seconds} секунд`
        );
        return;
      }
    }
  } catch (_e) {
    ctx.reply("Щось пішло не так, спробуйте ще раз!");
  }

  if (reply?.from?.id === from?.id) {
    ctx.reply("Ви не можете збільшити репутацію самому собі!");
    return;
  }

  try {
    const reputationInc = getRandomNumber();
    const toUser = await db
      .collection("users")
      .findOneAndUpdate(
        { userId: reply.from?.id },
        { $inc: { reputation: reputationInc } }
      );
    const fromUser = await db
      .collection("users")
      .findOneAndUpdate(
        { userId: from?.id },
        { $set: { lastReputation: Date.now() } }
      );

    ctx.reply(
      `🥳 ${mention(from)}(${
        fromUser?.value?.reputation
      }) збільшив(-ла) репутацію ${mention(reply.from)}(${
        toUser.value?.reputation
      }) на ${getPostfix(reputationInc)}.`,
      { parse_mode: "HTML" }
    );
  } catch (_e) {
    ctx.reply("Щось пішло не так, спробуйте ще раз!");
  }
};
