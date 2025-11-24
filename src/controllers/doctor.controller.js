const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');
const { success, error } = require('../utils/response');

module.exports.createDoctor = async (req, res) => {
  try {
    
    const { userId, specialization, experience, bio, fees } = req.body;
        const docUser=await User.findByPk(userId);
    if (!userId || !specialization) {
      return error(res, "userId and specialization are required");
    }
    if(docUser.role!=="doctor"){
      return error(res, "Sorry the user is not a Doctor");
    }

    
    const doctor = await Doctor.create({ userId, specialization, experience, bio, fees });

    return success(res, "Doctor profile created", doctor);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};

module.exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({ include: ['user'] });
    return success(res, "All doctors fetched", doctors);
  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};
