import mongoose from "mongoose";

const pastEmployeeSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },

    name: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      middleName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
    bankDetails: {
      accountHolderName: String,
      accountNumber: Number,
      ifscCode: String,
      brankName: String,
    },

    address: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "HR", "employee"],
      default: "employee",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      // required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Permanent", "Contract", "Intern"],
      default: "Permanent",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave", "Resigned"],
      default: "Active",
    },

    attendanceRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],

    leaveRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leave",
      },
    ],

    payrollRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payroll",
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.model("PastEmployee", pastEmployeeSchema);
