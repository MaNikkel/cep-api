import { Router, Request, Response } from "express";
import { query } from "express-validator";

import CepController from "../controllers/Cep.controller";

const router: Router = Router();

router.get(
  "/search",
  [
    query("cep")
      .exists()
      .isString()
  ],
  CepController.saveCep
);

export default router;
