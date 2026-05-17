import {
  getusers,
  adduserForm,
  adduser,
  deleteuser,
  edituserForm,
  saveuser,
  updateUser,
} from "../controllers/userController.js";
import express from "express";
const userRouter = express.Router();

userRouter.get("/", getusers);
userRouter.get("/add", adduserForm);
userRouter.post("/add", adduser);
userRouter.get("/:id/delete", deleteuser);
userRouter.get("/:id/edit", edituserForm);
userRouter.post("/:id/save", saveuser);
userRouter.put("/update/:id",updateUser);

export default userRouter;
