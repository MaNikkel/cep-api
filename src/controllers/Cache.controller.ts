import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as CACHE_SERVICES from "../services/cacheCep.serv";

/**
 * Handles for external consult
 */
class CacheController {
  public async getCachedCep(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(406).send({ errorMessage: errors.array() });
      } else {
        const cep = String(req.query.cep);
        const cachedData = await CACHE_SERVICES.getCep(cep);
        if (cachedData) {
          res.status(200).send(JSON.parse(cachedData));
        } else {
          next();
        }
      }
    } catch (error) {
      // uses the app.ts error handler
      const err = new Error(error);
      return next(err);
    }
  }
}

export default new CacheController();
