import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import { 
	getJoin,
	login,
	logout,
	postJoin,
	getLogin,
	postLogin,
	githubLogin,
	postGithubLogin
} from "../controller/userController";
import {onlyPublic} from '../middlewares';


const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); //회원가입하면 로그인 화면으로 넘어감

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
	routes.githubCallback,
	passport.authenticate("github", { failureRedirect: "/login" }),
	postGithubLogin
);

export default globalRouter;