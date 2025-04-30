import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (req, res) => res.send({ title: "GET all users" }));
userRouter.get("/:id", (req, res) => res.send({ title: "GET users details" }));
userRouter.post("/", (req, res) => res.send({ title: "CREATE all users" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE users" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE users" }));

export default userRouter;
