import axios from "axios";
import { CepInterface } from "../interfaces";

export async function back4APPCep(cep: string): Promise<CepInterface | null> {
  try {
    const where = encodeURIComponent(
      JSON.stringify({
        CEP: cep
      })
    );
    const { data } = await axios.get(
      `${process.env.BACK4APPCEP}?count=1&limit=10&order=CEP&where=${where}`,
      {
        headers: {
          "X-Parse-Application-Id": process.env.BACK4APPID,
          "X-Parse-REST-API-Key": process.env.BACK4APPKEY
        }
      }
    );

    return !!data.results[0] ? data.results[0] : null;
  } catch (error) {
    // uses the app.ts error handler
    console.log("err back4APPCep serv :: ", error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}
