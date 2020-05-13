import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Cep from "../models/cep.model";
import * as EXTERNAL_CEP_SERVICES from "../services/externalCep.serv";
import * as INTERNAL_CEP_SERVICES from "../services/internalCep.serv";

/**
 * Handles for external consult
 */
class CepController {
  public async getCep(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(406).send({ errorMessage: errors.array() });
      } else {
        // TODO: search in own database
        const cep = await INTERNAL_CEP_SERVICES.getCepFromDatabase(
          typeof req.query.cep == "string" ? req.query.cep : ""
        );
        if (!cep) {
          console.log("viacep");
          const externalData = await EXTERNAL_CEP_SERVICES.consultViaCep(
            typeof req.query.cep == "string" ? req.query.cep : ""
          );
          if (externalData.cep) {
            INTERNAL_CEP_SERVICES.saveCepToDataBase(externalData);
            res.status(200).send(externalData);
          } else {
            res.status(404).send(externalData);
          }
        } else {
          console.log("mongo");
          res.status(200).send(cep.cep_data);
        }
      }
    } catch (error) {
      // uses the app.ts error handler
      const err = new Error(error);
      return next(err);
    }
  }
}

export default new CepController();
