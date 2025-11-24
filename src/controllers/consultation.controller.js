const Consultation = require("../models/consultation.model");
const AvailabilitySlot = require("../models/availability.model");
const { success, error } = require("../utils/response");
const Doctor = require("../models/doctor.model");

module.exports.bookConsultation = async (req, res) => {
  try {
    const patientId = req.user.id; // logged-in user
    const { doctorId, slotId } = req.body;

    if (!doctorId || !slotId) {
      return error(res, "doctorId and slotId are required");
    }

    // Step 1: Check if slot exists
    const slot = await AvailabilitySlot.findByPk(slotId);
    if (!slot) {
      return error(res, "Slot does not exist");
    }

    // Step 2: Slot must belong to the same doctor being booked
    if (slot.doctorId !== doctorId) {
      return error(res, "Slot does not belong to this doctor");
    }

    // Step 3: Slot must not be booked
    if (slot.isBooked) {
      return error(res, "Slot already booked", 409);
    }

    // Step 4: Create consultation
    const consultation = await Consultation.create({
      patientId,
      doctorId,
      slotId,
      status: "booked",
    });

    // Step 5: Mark slot as booked
    await slot.update({ isBooked: true });

    return success(res, "Consultation booked successfully", consultation);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};


module.exports.getMyConsultations = async (req, res) => {
  try {
    const patientId = req.user.id;

    const list = await Consultation.findAll({
      where: { patientId },
      include: ["doctor", "slot"],
    });

    return success(res, "Consultations fetched", list);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};


module.exports.getDoctorConsultations = async (req, res) => {
  try {
    const userId = req.user.id;
     // Find doctor record via userId
    const doctor = await Doctor.findOne({ where: { userId } });
    if (!doctor) {
      return error(res, "Doctor profile not found");
    }
    const list = await Consultation.findAll({
      where: { doctorId:doctor.id },
      include: ["patient", "slot"],
    });

    return success(res, "Consultations fetched", list);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};
