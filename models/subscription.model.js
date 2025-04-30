import mongoose from "mongoose";

const subsciptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Price must be greater than 0"],
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP"],
    required: [true, "Subscription currency is required"],
    default: "USD",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
  },
  category: {
    type: String,
    enum: [
      "food",
      "travel",
      "entertainment",
      "sports",
      "tech",
      "finance",
      "politics",
      "other",
    ],
    required: [true],
  },
  paymentMethod: {
    type: String,
    // enum: ["creditCard", "debitCard", "paypal", "other"],
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "cancelld", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: "Start date must be in the past",
    },
    default: Date.now,
  },
  renewalDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "Renewal date must be after the start date",
    },
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  duration: {
    type: Number,
    required: [true, "Subscription duration is required"],
    min: 1,
  },
});

subsciptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 0,
      yearly: 365,
    };

    // Creates a new Date object based on startDate to avoid modifying the original
    this.renewalDate = new Date(this.startDate);
    // Calculates the renewal date by:
    // 1. Getting the current day of the month using getDate()
    // 2. Multiplying the subscription duration by the renewal period (e.g. 1 for daily, 7 for weekly etc)
    // 3. Adding this number of days to the start date to get the final renewal date
    this.renewalDate.setDate(
      this.renewalDate.getDate() +
        this.duration * renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subsciptionSchema);
export default Subscription;
