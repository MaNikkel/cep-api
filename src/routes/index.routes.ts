import { Router, Request, Response } from "express";

import IndexController from "../controllers/index.controller";

const router: Router = Router();

router.get("/hello-world", IndexController.helloWorld);

export default router;
