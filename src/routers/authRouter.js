import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  getJoin,
  logout,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin,
} from "../controller/userController";
import { onlyPublic } from "../middlewares";

const authRouter = express.Router();

authRouter.get(routes.join, onlyPublic, getJoin);
authRouter.post(routes.join, onlyPublic, postJoin, postLogin); //회원가입하면 로그인 화면으로 넘어감

authRouter.get(routes.login, onlyPublic, getLogin);
authRouter.post(routes.login, onlyPublic, postLogin);

authRouter.get(routes.logout, logout);

authRouter.get(routes.github, githubLogin);

authRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

authRouter.get(routes.facebook, facebookLogin);
authRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

authRouter.get(routes.me, getMe);

export default authRouter;
