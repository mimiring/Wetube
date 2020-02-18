// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
//const express = require("express");
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
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
// app.set("views","views"); // view 폴더 지정.
app.set("view engine", "pug"); // ejs, pug등 view engine설정
app.use(cookieParser());
app.use(bodyParser.json()); // { "name": "mimiring" }
app.use(bodyParser.urlencoded({ extended: true })); // form 에서 오는 데이터 extended의 기본값이 true / true qs로 쿼리문을 해석하겠다. false querystring으로 해석한다.
app.use(morgan("dev")); // log 두도잘몰라

app.use(localsMiddleware); // middleware는 req -> middleware -> res

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;