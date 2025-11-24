const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { success, error } = require('../utils/response');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt.config');

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return error(res, "Name, email and password are required");
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return error(res, "Email already registered", 409);
    }

    // 3. Hash password
    const hash = await bcrypt.hash(password, 10);

    // 4. Create user
    const newUser = await User.create({
      name,
      email,
      password: hash,
      role: role || "patient"
    });

    // 5. Return response (never send password)
    return success(res, "User registered successfully", {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};



module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return error(res, "Email and password are required");
    }

    // 2. Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return error(res, "Invalid email or password", 401);
    }

    // 3. Compare password
    const bcrypt = require('bcrypt');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return error(res, "Invalid email or password", 401);
    }

    // 4. Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn
    });

    // 5. Return user + token
    return success(res, "Login successful", {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    return error(res, "Something went wrong", 500);
  }
};