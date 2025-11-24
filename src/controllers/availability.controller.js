const AvailabilitySlot = require('../models/availability.model');
const Doctor = require('../models/doctor.model');
const { success, error } = require('../utils/response');

module.exports.createSlot = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { userId:req.user.id } });
    console.log('==> doctor who is setting this up', doctor);
    const { date, startTime, endTime } = req.body;

    if (!doctor || !date || !startTime || !endTime) {
      return error(res, "doctor, date, startTime, and endTime are required");
    }
    const doctorId=doctor.id;

    // Optional: Check if slot already exists for this doctor
    const existingSlot = await AvailabilitySlot.findOne({
      where: { doctorId, date, startTime, endTime }
    });
    if (existingSlot) {
      return error(res, "Slot already exists for this doctor", 409);
    }
    
    const slot = await AvailabilitySlot.create({
      doctorId,
      date,
      startTime,
      endTime
    });

    return success(res, "Availability slot created", slot);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};

module.exports.getSlotsByDoctor = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId) {
      return error(res, "doctorId is required");
    }

    // Fetch slots, optionally filter by date
    const whereObj = { doctorId };
    if (date){whereObj.date = date;}

    const slots = await AvailabilitySlot.findAll({ where:whereObj });

    return success(res, "Slots fetched", slots);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};
