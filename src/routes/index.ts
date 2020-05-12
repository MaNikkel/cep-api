import { Router, Request, Response } from "express";
import cepRouter from "./cepSearch.routes";
const router: Router = Router();

router.use("/", cepRouter);

router.use("/", (req: Request, res: Response) => {
  res.status(404).send(`cannot ${req.method} => ${req.url}`);
});

export default router;
