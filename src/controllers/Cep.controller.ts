import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as EXTERNAL_CEP_SERVICES from "../services/externalCep.serv";

/**
 * Handles for external consult
 */
class CepController {
  public async saveCep(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(406).send({ errorMessage: errors.array() });
      } else {
        // TODO: search in custom database
        const externalData = await EXTERNAL_CEP_SERVICES.consultViaCep(
          typeof req.query.cep == "string" ? req.query.cep : ""
        );
        console.log(externalData.data);
        res.status(200).send(externalData.data);
      }
    } catch (error) {
      // uses the app.ts error handler
      const err = new Error(error);
      return next(err);
    }
  }
}

export default new CepController();
