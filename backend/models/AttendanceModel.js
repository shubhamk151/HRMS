import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    checkIn: {
      type: Date,
    },

    checkOut: {
      type: Date,
    },

    workHours: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Half-Day", "Leave", "Late"],
      default: "Present",
    },

    markedBy: {
      type: String,
      enum: ["System", "Employee", "HR", "Admin"],
      default: "System",
    },
  },
  { timestamps: true }
);

// Auto-calc work hours before save
attendanceSchema.pre("save", function () {
  if (this.checkIn && this.checkOut) {
    const diffMs = this.checkOut - this.checkIn;
    this.workHours = Number((diffMs / (1000 * 60 * 60)).toFixed(2));
  }
});

export default mongoose.model("Attendance", attendanceSchema);
