import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    leaveType: {
      type: String,
      enum: [
        "sickLeave",
        "casualLeave",
        "paidLeave",
        "maternityLeave",
        "paternityLeave",
        "unpaidLeave",
        "emergencyLeave",
        "compOff",
      ],
      // required: true,
    },

    startDate: {
      type: Date,
      // required: true,
    },

    endDate: {
      type: Date,
      // required: true,
    },

    totalDays: {
      type: Number,
      default: 0,
    },

    reason: {
      type: String,
      required: true,
    },

    comments: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

// Calculate totalDays automatically
leaveSchema.pre("save", function () {
  if (this.startDate && this.endDate) {
    const diff = this.endDate - this.startDate;
    this.totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  }
});

export default mongoose.model("Leave", leaveSchema);
