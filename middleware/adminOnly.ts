import { Context, NextFunction } from "../deps.deno.ts";

export const adminOnly = async (
  { message, api }: Context,
  next: NextFunction
) => {
  const member = await api.getChatMember(
    message?.chat?.id ?? "",
    message?.from?.id ?? 0
  );
  if (
    member &&
    (member.status === "creator" || member.status === "administrator")
  ) {
    return next();
  }
  return 0;
};
