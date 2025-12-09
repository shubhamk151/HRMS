import mongoose from "mongoose";

const leaveAllocationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    leaveBalance: {
      sickLeave: {
        allocated: { type: Number, default: 7 },
        used: { type: Number, default: 0 },
        remaining: { type: Number, default: 7 },
      },
      casualLeave: {
        allocated: { type: Number, default: 7 },
        used: { type: Number, default: 0 },
        remaining: { type: Number, default: 7 },
      },
      paidLeave: {
        allocated: { type: Number, default: 12 },
        used: { type: Number, default: 0 },
        remaining: { type: Number, default: 12 },
      },
      compOff: {
        allocated: { type: Number, default: 0 },
        used: { type: Number, default: 0 },
        remaining: { type: Number, default: 0 },
      },
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Auto-update remaining leave
leaveAllocationSchema.pre("save", function () {
  const types = Object.keys(this.leaveBalance);
  types.forEach((type) => {
    const l = this.leaveBalance[type];
    l.remaining = l.allocated - l.used;
  });
  this.updatedAt = new Date();
});

export default mongoose.model("LeaveAllocation", leaveAllocationSchema);
