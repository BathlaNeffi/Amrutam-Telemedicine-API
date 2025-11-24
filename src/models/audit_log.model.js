const { DataTypes } = require("sequelize");
const {sequelize} = require("../db/sequelize");

const AuditLog = sequelize.define("AuditLog", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entityId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  meta: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true
  }
},{
    tableName:"audit_logs",
    timestamps:true
}
);

module.exports = AuditLog;
