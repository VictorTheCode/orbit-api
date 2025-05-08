import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

export const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendReminders);
