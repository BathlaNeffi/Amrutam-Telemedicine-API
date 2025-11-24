const AuditLog = require("../models/audit_log.model");

async function auditLog(req, action, entity, entityId, meta = {}) {
  try {
    await AuditLog.create({
      userId: req.user.id,
      action,
      entity,
      entityId,
      meta,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });
  } catch (err) {
    console.error("Audit error:", err);
  }
}

module.exports = auditLog;
