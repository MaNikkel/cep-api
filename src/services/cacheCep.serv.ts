import client from "../utils/redis.util";

export async function setCep(cep: string, cepData: object): Promise<void> {
  try {
    await client.setAsync(cep, 15, JSON.stringify(cepData));
  } catch (error) {
    // uses the app.ts error handler
    console.log(error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}

export async function getCep(cep: string): Promise<any> {
  try {
    const result = await client.getAsync(cep.toString());
    return result;
  } catch (error) {
    // uses the app.ts error handler
    console.log(error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}
