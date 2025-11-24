

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/sequelize');
const User = require('./user.model'); // A doctor is also a user

const Doctor = sequelize.define(
  'Doctor',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // years of experience
    },
    bio: {
      type: DataTypes.TEXT,
    },
    fees: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    }
  },
  {
    tableName: 'doctors',
    timestamps: true
  }
);

// Relationship: Doctor belongs to a User
Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Doctor;
