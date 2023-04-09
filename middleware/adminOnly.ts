import {
  Context,
  NextFunction,
} from "https://deno.land/x/grammy@v1.8.3/mod.ts";

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
