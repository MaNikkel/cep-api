import redis from "redis";
import { promisify } from "util";

const client = redis.createClient(process.env.REDIS_URL || "");

export default {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.setex).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
