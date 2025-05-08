import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    await workflowClient.trigger({
      url: `${SERVER_URL}`,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error(
        "You are not the authorized owner of this account"
      );
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.user._id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ success: true, message: "Subscription successfully deleted" });
  } catch (e) {
    next(e);
  }
};

export const cancelSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.updateMany(
      { user: req.user._id, status: "active" },
      { status: "cancelled" }
    );

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};
