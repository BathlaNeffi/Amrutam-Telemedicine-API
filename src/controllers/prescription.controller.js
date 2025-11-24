const Prescription = require("../models/prescription.model");
const Consultation = require("../models/consultation.model");
const Doctor = require("../models/doctor.model");
const { success, error } = require("../utils/response");

module.exports.createPrescription = async (req, res) => {
  try {
    const doctorUserId = req.user.id;
    const { consultationId, diagnosis, medicines, notes } = req.body;

    if (!consultationId || !diagnosis || !medicines) {
      return error(res, "consultationId, diagnosis, and medicines are required");
    }

    // Step 1: Find doctor profile for logged-in user
    const doctor = await Doctor.findOne({ where: { userId: doctorUserId } });
    if (!doctor) return error(res, "Doctor profile not found", 404);

    // Step 2: Find consultation
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) return error(res, "Consultation not found", 404);

    // Step 3: Ensure doctor owns the consultation
    if (consultation.doctorId !== doctor.id) {
      return error(res, "You are not the doctor of this consultation", 403);
    }

    // Step 4: Allow only booked or completed consultations
    if (consultation.status === "cancelled") {
      return error(res, "Cannot write prescription for cancelled consultation");
    }

    // Step 5: Create prescription
    const prescription = await Prescription.create({
      consultationId,
      diagnosis,
      medicines,
      notes,
    });

    // Step 6: Automatically mark consultation completed (optional)
    await consultation.update({ status: "completed" });

    return success(res, "Prescription created successfully", prescription);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};


module.exports.getPrescriptionForConsultation = async (req, res) => {
  try {
    const { consultationId } = req.params;

    const prescription = await Prescription.findOne({
      where: { consultationId },
      include: ["consultation"],
    });

    if (!prescription) return error(res, "Prescription not found", 404);

    return success(res, "Prescription fetched", prescription);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};
