import { User } from "../deps.deno.ts";

export function buildName(from?: User) {
  const name = `${from?.first_name ?? ""} ${from?.last_name ?? ""}`;
  return !name.trim().length ? from?.username : name;
}

export function mention(from?: User) {
  if (!from?.id) return;
  return `<a href="tg://user?id=${from.id}">${buildName(from)}</a>`;
}

export function hiddenMention(userId: number) {
  return `<a href="tg://user?id=${userId}">⁠</a>`;
}
