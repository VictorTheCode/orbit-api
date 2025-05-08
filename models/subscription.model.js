// import mongoose from "mongoose";

// const subsciptionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Subscription name is required"],
//     trim: true,
//     minLength: 2,
//     maxLength: 100,
//   },
//   price: {
//     type: Number,
//     required: [true, "Subscription price is required"],
//     min: [0, "Price must be greater than 0"],
//   },
//   currency: {
//     type: String,
//     enum: ["USD", "EUR", "GBP"],
//     required: [true, "Subscription currency is required"],
//     default: "USD",
//   },
//   frequency: {
//     type: String,
//     enum: ["daily", "weekly", "monthly", "yearly"],
//   },
//   category: {
//     type: String,
//     enum: [
//       "food",
//       "travel",
//       "entertainment",
//       "sports",
//       "tech",
//       "finance",
//       "politics",
//       "other",
//     ],
//     required: [true],
//   },
//   paymentMethod: {
//     type: String,
//     // enum: ["creditCard", "debitCard", "paypal", "other"],
//     required: true,
//     trim: true,
//   },
//   status: {
//     type: String,
//     enum: ["active", "cancelled", "expired"],
//     default: "active",
//   },
//   startDate: {
//     type: Date,
//     required: true,
//     validate: {
//       validator: (value) => value <= new Date(),
//       message: "Start date must be in the past",
//     },
//     default: Date.now,
//   },
//   renewalDate: {
//     type: Date,
//     required: true,
//     validate: {
//       validator: function (value) {
//         return value > this.startDate;
//       },
//       message: "Renewal date must be after the start date",
//     },
//     default: Date.now,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//     index: true,
//   },
//   duration: {
//     type: Number,
//     min: 1,
//   },
// });

// subsciptionSchema.pre("save", function (next) {
//   if (!this.renewalDate) {
//     const renewalPeriods = {
//       daily: 1,
//       weekly: 7,
//       monthly: 0,
//       yearly: 365,
//     };

//     // Creates a new Date object based on startDate to avoid modifying the original
//     this.renewalDate = new Date(this.startDate);
//     // Calculates the renewal date by:
//     // 1. Getting the current day of the month using getDate()
//     // 2. Multiplying the subscription duration by the renewal period (e.g. 1 for daily, 7 for weekly etc)
//     // 3. Adding this number of days to the start date to get the final renewal date
//     this.renewalDate.setDate(
//       this.renewalDate.getDate() +
//         this.duration * renewalPeriods[this.frequency]
//     );
//   }

//   // To keep status "active", ensure renewalDate is set to a future date
//   // Example: If today is 2024-01-10, set renewalDate to something like 2024-12-31
//   if (this.renewalDate < new Date()) {
//     this.status = "expired";
//   }
//   next();
// });

// const Subscription = mongoose.model("Subscription", subsciptionSchema);
// export default Subscription;

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
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
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calculate renewal date if missing.
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
