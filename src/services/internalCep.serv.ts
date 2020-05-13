import Cep, { ICep } from "../models/cep.model";
import { CepInterface } from "../interfaces";

export async function saveCepToDataBase(cep: CepInterface): Promise<void> {
  try {
    const cep_instance = new Cep();
    return cep_instance.saveCep(cep);
  } catch (error) {
    // uses the app.ts error handler
    console.log(error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}

export async function getCepFromDatabase(cep: string): Promise<ICep> {
  try {
    const cep_instance = await Cep.findByCep(cep);
    return cep_instance;
  } catch (error) {
    // uses the app.ts error handler
    console.log(error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}
