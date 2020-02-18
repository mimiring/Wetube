import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
	res.locals.siteName = ":: WeTube";
	res.locals.routes = routes;
	res.locals.user = req.user || null; // user가 존재하지 않으면 빈 object를 줌
	next();
};

export const uploadVideo = multerVideo.single("videoFile");