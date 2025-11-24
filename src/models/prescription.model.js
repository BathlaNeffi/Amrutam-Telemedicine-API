const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");
const Consultation = require("./consultation.model");

const Prescription = sequelize.define(
  "Prescription",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    consultationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    medicines: {
      type: DataTypes.JSONB, 
      allowNull: false,
      defaultValue: [],
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    tableName: "prescriptions",
    timestamps: true,
  }
);

// Relationship
Prescription.belongsTo(Consultation, {foreignKey: "consultationId",as: "consultation"});

module.exports = Prescription;
