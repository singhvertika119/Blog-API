import { Router } from "express";
import { signup, login, getUserById, updateUserById, deleteUserById, getAllUsers } from "../controller/user.controller.js";

const router = Router();

//Routes for creating a user 
router.post("/signup", signup);
router.post("/login", login);
router.get("/:userId", getUserById);
router.get("/all", getAllUsers);
router.put("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);

//Export the router
export { router };
