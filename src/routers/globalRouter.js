import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import { getMe } from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.me, getMe);
globalRouter.get(routes.search, search);

export default globalRouter;
