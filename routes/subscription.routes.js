import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "GET all subs" }));

export default subscriptionRouter;
