import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as EXTERNAL_CEP_SERVICES from "../services/externalCep.serv";
import * as INTERNAL_CEP_SERVICES from "../services/internalCep.serv";
import * as CACHE_SERVICES from "../services/cacheCep.serv";

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
        // const cep = await INTERNAL_CEP_SERVICES.getCepFromDatabase(
        //   typeof req.query.cep == "string" ? req.query.cep : ""
        // );
        const cep = await INTERNAL_CEP_SERVICES.getCepFromPostgres(
          typeof req.query.cep == "string" ? req.query.cep : ""
        );
        if (!cep) {
          const externalData = await EXTERNAL_CEP_SERVICES.consultViaCep(
            typeof req.query.cep == "string" ? req.query.cep : ""
          );
          if (externalData.cep) {
            //INTERNAL_CEP_SERVICES.saveCepToDataBase(externalData);
            INTERNAL_CEP_SERVICES.saveCepToPostgres(externalData);
            CACHE_SERVICES.setCep(
              req.query.cep == "string" ? req.query.cep : "",
              externalData
            );
            res.status(200).send(externalData);
          } else {
            res.status(404).send(externalData);
          }
        } else {
          console.log("postgres");
          CACHE_SERVICES.setCep(req.query.cep.toString(), cep.Cep_data || {});
          res.status(200).send(cep.Cep_data);
          // console.log("mongo");
          // CACHE_SERVICES.setCep(req.query.cep.toString(), cep.cep_data || {});
          // res.status(200).send(cep.cep_data);
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
