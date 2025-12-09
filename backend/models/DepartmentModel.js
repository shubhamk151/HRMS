import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    code: {
      type: String,
      unique: true,
      uppercase: true,
      required: true,
    },

    description: {
      type: String,
    },

    // Department Head (HR/Admin can assign)
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    // Status control
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
