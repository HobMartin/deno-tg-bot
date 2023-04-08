import { User } from "https://deno.land/x/grammy@v1.8.3/platform.deno.ts";

export function buildName(from?: User) {
  if (!from?.first_name && !from?.last_name) return;
  const name = `${from.first_name} ${from.last_name ?? ""}`;
  return !name.trim().length ? from?.username : name;
}

export function mention(from?: User) {
  if (!from?.id) return;
  return `<a href="tg://user?id=${from.id}">${buildName(from)}</a>`;
}
