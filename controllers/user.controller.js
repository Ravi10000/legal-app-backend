import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export async function signupUser(req, res) {
  const { email, password, confirmPassword, name, phoneNumber } = req.body;

  if (!email || !password || !confirmPassword || !name || !phoneNumber) {
    return res.status(400).json({
      status: "error",
      message:
        "required fields: email, password, confirmPassword, name, phoneNumber",
    });
  }

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ status: "error", message: "Password doesn't match" });

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      hash,
      name,
      phoneNumber,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
