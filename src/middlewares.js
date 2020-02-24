import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({//s3유저과 관련된것  reset
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	// region: "ap-northeast-2" //지역설정인데 S3에서는 안해줘도 작동된다고 뜸
});

const multerVideo = multer({
	storage: multerS3({
		s3,
		acl: "public-read",  //access contoroll list
		bucket: "mitube/video" //video update하면 bucket으로 감
	}) //다양한 storage를 mutler에 설정 가능
});
const multerAvater =  multer({
	storage: multerS3({
		s3,
		acl: "public-read",  
		bucket: "mitube/avatar"
	})
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvater = multerAvater.single("avatar");

export const localsMiddleware = (req, res, next) => {
	res.locals.siteName = ":: WeTube";
	res.locals.routes = routes;
	res.locals.loggedUser = req.user || null; // user가 존재하지 않으면 빈 object를 줌
	next();
};

export const onlyPublic = (req, res, next) => {
	if(req.user) {
		res.redirect(routes.home);
	} else {
		next();
	}
};

export const onlyPrivate = (req, res, next) => {
	if(req.user) {
		next();
	} else {
		res.redirect(routes.home);
	}
}

