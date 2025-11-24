const { DataTypes } = require("sequelize");
const { sequelize } = require('../db/sequelize');

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  consultationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  razorpayOrderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  razorpayPaymentId: {
    type: DataTypes.STRING,
  },

  razorpaySignature: {
    type: DataTypes.STRING,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  currency: {
    type: DataTypes.STRING,
    defaultValue: "INR",
  },

  status: {
    type: DataTypes.ENUM("created", "paid", "failed"),
    defaultValue: "created",
  },
},{
    tableName: "payments",
    timestamps: true,
  }
);

module.exports = Payment;
