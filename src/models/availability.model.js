const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');
const Doctor = require('./doctor.model');

const AvailabilitySlot = sequelize.define(
  'AvailabilitySlot',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    tableName: 'availability_slots',
    timestamps: true
  }
);

// Relationship: AvailabilitySlot belongs to a Doctor
AvailabilitySlot.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

module.exports = AvailabilitySlot;
