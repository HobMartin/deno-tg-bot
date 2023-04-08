import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts";

const env = await load();

export const getEnv = (key: string) => {
  return env[key] || Deno.env.get(key) || "";
};
