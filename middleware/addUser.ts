import { Context, NextFunction } from "../deps.deno.ts";
import { db } from "../db/index.ts";

export async function addUser(
  _ctx: Context,
  next: NextFunction
): Promise<void> {
  const user = await db.collection("users").findOne({ userId: _ctx.from?.id });
  if (user) return next();

  await db.collection("users").insertOne({
    userId: _ctx.from?.id,
    username: _ctx.from?.username,
    firstName: _ctx.from?.first_name,
    lastName: _ctx.from?.last_name,
    reputation: 0,
    messages: 0,
  });
  await next();
}
