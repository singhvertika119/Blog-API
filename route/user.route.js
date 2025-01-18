import { Router } from "express";
import { signup, login, getUserProfile, updateUserProfile, deleteUserProfile } from "../controller/user.controller.js";

const router = Router();

//Routes for creating a user 
router.post("/signup", signup);
router.post("/login", login);
router.get("/:userId", getUserProfile);
router.put("/:userId", updateUserProfile);
router.delete("/:userId", deleteUserProfile);

//Export the router
export { router };
