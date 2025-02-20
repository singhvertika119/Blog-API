import express from "express";
import { refreshToken } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/refresh", refreshToken);

export default router;
