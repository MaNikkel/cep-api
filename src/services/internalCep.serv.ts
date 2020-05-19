import { PrismaClient } from "@prisma/client";
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

export async function saveCepToPostgres(cep: CepInterface): Promise<void> {
  try {
    const postgresPrisma = new PrismaClient();

    postgresPrisma.cep
      .create({
        data: {
          cep: cep.cep.replace("-", ""),
          Cep_data: {
            create: {
              bairro: cep.bairro,
              cep: cep.cep,
              complemento: cep.complemento,
              gia: cep.gia,
              localidade: cep.localidade,
              logradouro: cep.logradouro,
              uf: cep.uf,
              unidade: cep.unidade
            }
          }
        }
      })
      .then(cep => {
        console.log(`CEP ${cep.id} created`);
      })
      .finally(() => {
        postgresPrisma.disconnect();
      });
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

export async function getCepFromPostgres(cep: string): Promise<any> {
  try {
    const postgresPrisma = new PrismaClient();
    const cepData = await postgresPrisma.cep.findMany({
      where: {
        cep: {
          equals: cep
        }
      },
      include: {
        Cep_data: true
      }
    });
    return cepData[0];
  } catch (error) {
    // uses the app.ts error handler
    console.log(error);
    const err = new Error(error);
    throw {
      error: err
    };
  }
}
