import { Router, Request, Response } from "express";
import { query } from "express-validator";

import CepController from "../controllers/Cep.controller";
import CacheController from "../controllers/Cache.controller";

const router: Router = Router();

router.get(
  "/search",
  [
    query("cep")
      .exists()
      .isString()
      .custom((cep: string) => {
        const cepFormat = /^[0-9]{8}$/;
        if (cepFormat.test(cep)) return true;
        else return false;
      })
  ],
  CacheController.getCachedCep,
  CepController.getCep
);

export default router;
