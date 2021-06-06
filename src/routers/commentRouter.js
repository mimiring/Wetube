import express from "express";
import routes from "../routes";
import { deleteComment } from "../controller/commentController";
import { onlyPrivate, uploadAvater } from "../middlewares";

const commentRouter = express.Router();

commentRouter.get(routes.deleteComment, deleteComment);

export default commentRouter;
