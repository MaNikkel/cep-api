import { Router, Request, Response } from "express";
import indexRouter from "./index.routes";
const router: Router = Router();

router.use("/", indexRouter);

router.use("/", (req: Request, res: Response) => {
  res.status(404).send(`cannot ${req.method} => ${req.url}`);
});

export default router;
