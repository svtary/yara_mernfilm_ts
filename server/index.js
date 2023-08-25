import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import { createRequire } from "module";

const app = express();
// 用于构造 require 函数的文件名。必须是文件 URL 对象、文件 URL 字符串或绝对路径字符串。
const require = createRequire(import.meta.url);
// bodyParser.json是用来解析json数据格式的。bodyParser.urlencoded则用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//app.use将一个函数添加至处理链中，为所有的路由和动词添加该函数
// Cross-Origin Resource Sharing (CORS)跨源资源共享
// 该机制通过允许服务器标示除了它自己以外的其他源（域、协议或端口），使得浏览器允许这些源访问加载自己的资源。
// 跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的“预检”请求。在预检中，浏览器发送的头中标示有 HTTP 方法和真实请求中会用到的头。
// express 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// // 使用cookie-parser解析客户端传入的cookie  加密解密
app.use(cookieParser());

// app.use("/api/v1", routes);
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected");
    console.log(server);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });

//test
//terminal : yarn start
