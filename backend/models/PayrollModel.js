import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    earnings: {
      basic: { type: Number, required: true },
      hra: { type: Number, default: 0 },
      conveyance: { type: Number, default: 0 },
      medicalAllowance: { type: Number, default: 0 },
      specialAllowance: { type: Number, default: 0 },
      overtimePay: { type: Number, default: 0 },
      bonus: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
    },

    deductions: {
      pf: { type: Number, default: 0 },
      esi: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      professionalTax: { type: Number, default: 0 },
      leaveDeduction: { type: Number, default: 0 },
      otherDeductions: { type: Number, default: 0 },
      totalDeductions: { type: Number, default: 0 },
    },

    netSalary: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

// Auto-calc total earnings, deductions & net salary
payrollSchema.pre("save", function () {
  const E = this.earnings;
  const D = this.deductions;

  E.totalEarnings =
    (E.basic || 0) +
    (E.hra || 0) +
    (E.conveyance || 0) +
    (E.medicalAllowance || 0) +
    (E.specialAllowance || 0) +
    (E.overtimePay || 0) +
    (E.bonus || 0);

  D.totalDeductions =
    (D.pf || 0) +
    (D.esi || 0) +
    (D.tax || 0) +
    (D.professionalTax || 0) +
    (D.leaveDeduction || 0) +
    (D.otherDeductions || 0);

  this.netSalary = E.totalEarnings - D.totalDeductions;
});

export default mongoose.model("Payroll", payrollSchema);
