import Redis from "ioredis";

let redis: Redis.Redis;
let started = false;

const startRedis = () => {
  redis = started ? redis : new Redis(process.env.REDIS_URL);
  started = true;
};

export const get = async (key: string): Promise<any> => {
  startRedis();
  let value = await redis.get(key);
  if (value) value = JSON.parse(value);
  return value;
};

export const set = (key: string, val: any): void => {
  startRedis();
  redis.set(key, JSON.stringify(val)).catch(err => {
    console.log("err set redis :: ", err);
  });
};
