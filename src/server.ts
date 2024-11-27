import "@/auth/github";
import { githubOAuth2 } from "@/auth/github";
import controllers from "@/controllers";
import middlewares from "@/middlewares";
import { v1 } from "@/routes/v1";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(session({ secret: process.env.SESSION_SECRET!, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(githubOAuth2);
app.use("/healthcheck", controllers.healthcheck);
app.use("/api/v1", v1);

app.use("*", middlewares.notFound);
app.use(middlewares.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
