const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");
const User = require("./user.model");
const Doctor = require("./doctor.model");
const AvailabilitySlot = require("./availability.model");

const Consultation = sequelize.define(
  "Consultation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("booked", "completed", "cancelled","paid"),
      defaultValue: "booked",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    tableName: "consultations",
    timestamps: true,
  }
);

// Relationships
Consultation.belongsTo(User, { foreignKey: "patientId", as: "patient" });
Consultation.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });
Consultation.belongsTo(AvailabilitySlot, { foreignKey: "slotId", as: "slot" });

module.exports = Consultation;
