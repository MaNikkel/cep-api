import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as EXTERNAL_CEP_SERVICES from "../services/externalCep.serv";
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
        const cep = String(req.query.cep);
        const externalData = await EXTERNAL_CEP_SERVICES.back4APPCep(cep);
        if (externalData.results) {
          CACHE_SERVICES.setCep(cep, externalData).catch(err => {
            console.log("err set cep controller :: ", err);
          });
          res.status(200).send(externalData);
        } else {
          res.status(404).send(externalData);
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
