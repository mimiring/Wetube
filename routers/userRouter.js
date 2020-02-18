import express from "express";
import routes from "../routes";
import {
	userDetail,
	getEditProfile,
	postEditProfile,
	changePassword
} from "../controller/userController";
import { onlyPrivate, uploadAvater } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvater, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;