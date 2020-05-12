import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as INDEX_SERVICES from "../services/index.serv";

/**
 * Handles Authorization: Baerer Token and JWT
 */
class IndexController {
  /**
   * Hello World
   * * METHOD WILL BE DEPRACIEATED
   */
  public helloWorld(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(406).send({ errorMessage: errors.array() });
      } else {
        const message = INDEX_SERVICES.helloWorld();
        res.status(200).send(message);
      }
    } catch (error) {
      // uses the app.ts error handler
      const err = new Error(error);
      return next(err);
    }
  }
}

export default new IndexController();
