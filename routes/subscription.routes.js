import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all subsciptions" })
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET subsciption details" })
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "CREATE subsciption" })
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE subsciption" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE subsciption" })
);
subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user subsciptions" })
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL subsciptions" })
);
subscriptionRouter.put("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;
