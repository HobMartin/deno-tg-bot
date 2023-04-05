import { MongoClient } from "mongodb";
import { load } from "dotenv";
const env = await load();

const MONGO_URI = env["MONGO_URI"] || Deno.env.get("MONGO_URI");

const username = encodeURIComponent(env["username"] || "");
const password = encodeURIComponent(env["password"] || "");

const MONGO_DB = env["MONGO_DB"] || Deno.env.get("MONGO_DB") || "test";
if (!MONGO_URI) throw new Error("MONGO_URI not found");

const URI = MONGO_URI.replace("<username>", username).replace(
  "<password>",
  password
);

// connect to mongodb
const client = new MongoClient(URI);

await client.connect();

export const db = client.db(MONGO_DB);
