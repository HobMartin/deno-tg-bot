import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { getEnv } from "../lib/getEnv.ts";

const MONGO_URI = getEnv("MONGO_URI");

const MONGO_DB = getEnv("MONGO_DB") || "anime";
if (!MONGO_URI) throw new Error("MONGO_URI not found");

// connect to mongodb
const client = new MongoClient();
try {
  await client.connect(MONGO_URI);
} catch (e) {
  console.log(MONGO_URI);

  console.log(e);
}

export const db = client.database(MONGO_DB);
