import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import { 
	getJoin,
	login,
	logout,
	postJoin,
	getLogin,
	postLogin
} from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin); //회원가입하면 로그인 화면으로 넘어감

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, (req,res,next) => {
	console.log(req.body);
	next();
},postLogin);

globalRouter.get(routes.logout, logout);


export default globalRouter;