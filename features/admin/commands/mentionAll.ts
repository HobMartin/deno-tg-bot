import { db } from "../../../db/index.ts";
import { Context } from "../../../deps.deno.ts";
import { hiddenMention } from "../../../lib/username.ts";

export const mentionsAll = async (ctx: Context) => {
  const users = await db.collection("users").find().toArray();
  const mentionAllUsers = users.map((user) => hiddenMention(user.userId));
  ctx.reply(`Джутсу виклику!!! ${mentionAllUsers.join("")}`, {
    parse_mode: "HTML",
  });
};
