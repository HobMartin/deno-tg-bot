import { load } from "../deps.deno.ts";

const env = await load();

export const getEnv = (key: string) => {
  return env[key] || Deno.env.get(key) || "";
};
