import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
} from "../controller/videoController";
import { deleteComment } from "../controller/commentController";
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  // /api/5e4d260558b92a0968cb9b6a/comment/delete
  console.log(req.user);
  next();
});
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post("/:id/comment/delete", deleteComment); // /:id/comment/delete
apiRouter.post(routes.addComment, postAddComment); // /:id/comment => 얘가 위에꺼를 잡아먹어서 안됐던것

export default apiRouter;
