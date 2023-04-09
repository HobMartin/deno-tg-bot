import { MongoClient } from "https://unpkg.com/mongodb@5.2.0/src/index.ts";
import { getEnv } from "../lib/getEnv.ts";

const MONGO_URI = getEnv("MONGO_URI");

const username = encodeURIComponent(getEnv("username"));
const password = encodeURIComponent(getEnv("password"));

const MONGO_DB = getEnv("MONGO_DB") || "anime";
if (!MONGO_URI) throw new Error("MONGO_URI not found");

const URI = MONGO_URI.replace("<username>", username).replace(
  "<password>",
  password
);

// connect to mongodb
const client = new MongoClient(URI);

await client.connect();

export const db = client.db(MONGO_DB);
