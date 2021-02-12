import * as cache from "../utils/redis.util";

export async function setCep(cep: string, cepData: object): Promise<void> {
  cache.set(cep, JSON.stringify(cepData));
}

export async function getCep(cep: string): Promise<any> {
  try {
    return await cache.get(cep);
  } catch (error) {
    // uses the app.ts error handler
    console.log("getCep err::", error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}
