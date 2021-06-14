import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import authRouter from "./routers/authRouter";
import apiRouter from "./routers/apiRouter";
// import commentRouter from './routers/commentRouter';
import routes from "./routes";

import "./passport";
// import mongoose from "mongoose";

// const URL = "mongodb+srv://mimiring:" + process.env.MONGOPASSWORD + "@cluster0-nnim0.mongodb.net/test?retryWrites=true&w=majority";
// console.log(URL);

// mongoose.Promise = global.Promise;
// mongoose.connect(URL,
//   { useNewUrlParser: true }
// );
// mongoose.connection
//     .once('open', () => console.log('Connected to MongoLab instance.'))
//     .on('error', error => console.log('Error connecting to MongoLab:', error));

const app = express(); // const app = createApplication();

app.use(helmet()); // response header에 보안관련된 항목을 추가해줌.
app.set("view engine", "ejs"); // ejs추가
// app.set("views","views"); // view 폴더 지정.
app.set("views", path.join(__dirname, "views"));
// app.use("/uploads", express.static("uploads")); //AWS S3에 upload 하므로 불필요
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(express.json()); // { "name": "mimiring" }
app.use(express.urlencoded({ extended: true })); // form 에서 오는 데이터 extended의 기본값이 true / true qs로 쿼리문을 해석하겠다. false querystring으로 해석한다.
app.use(morgan("dev")); // log 두도잘몰라
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); // middleware는 req -> middleware -> res

app.use(routes.home, globalRouter);
app.use(routes.home, authRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
// app.use(routes.comments, commentRouter); // /comments경로

export default app;
