import axios from "axios";
import { CepInterface } from "../interfaces";

export async function consultViaCep(cep: string): Promise<CepInterface> {
  try {
    const { data } = await axios.get(`${process.env.VIACEP_URL}/${cep}/json/`);

    return data;
  } catch (error) {
    // uses the app.ts error handler
    console.log(error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}
