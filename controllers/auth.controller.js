import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";

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

    const verification = await Verification.create({
      user: user._id,
    });
    // frontend verification page link -> trigger api call to backend verification api
    const verificationLink = `${process.env.CLIENT_URL}/verify/${verification._id}`;

    // send verification email
    console.log({ verificationLink });

    return res.status(201).json({
      status: "success",
      message: "Verification Email Sent",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function verifyEmail(req, res) {
  const { verificationId } = req.params;
  if (!verificationId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid verfiication link",
    });
  }
  try {
    const verification = await Verification.findById(verificationId);

    if (!verification) {
      return res.status(400).json({
        status: "error",
        message: "Invalid verifiication Id",
      });
    }

    console.log({ verification });
    const isLinkExpired =
      Date.now().valueOf() - verification.createdAt.valueOf() > 1000 * 60 * 10;

    if (isLinkExpired) {
      return res.status(400).json({
        status: "error",
        message: "Link Expired",
      });
    }

    const user = await User.findByIdAndUpdate(
      verification.user,
      {
        isVerified: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "No User Found",
      });
    }

    const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      status: "success",
      message: "Email Verified",
      user: {
        authToken,
        _id: user._id,
        email: user.email,
        name: user.name,
        usertype: user.usertype,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function resendVerificationEmail(req, res) {
  const { verificationId } = req.params;
  if (!verificationId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid verfiication Id",
    });
  }
  try {
    const verification = await Verification.findById(verificationId);
    if (!verification) {
      return res.status(400).json({
        status: "error",
        message: "Invalid verfiication Id",
      });
    }
    const newVerification = await Verification.create({
      user: verification.user,
    });
    // frontend verification page link -> trigger api call to backend verification api
    const verificationLink = `${process.env.CLIENT_URL}/verify/${newVerification._id}`;
    console.log({ verificationLink });
    // send verification email

    return res.status(200).json({
      status: "success",
      message: "Verification Email Sent",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function signInUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "required fields: email, password",
    });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Not Registered User",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "Wrong Password",
      });
    }
    if (!user.isVerified) {
      const verification = await Verification.create({
        user: user._id,
      });
      // frontend verification page link -> trigger api call to backend verification api
      const verificationLink = `${process.env.CLIENT_URL}/verify/${verification._id}`;
      console.log({ verificationLink });
      // send verification email

      return res.status(200).json({
        status: "success",
        message: "Verification Pending",
      });
    }
    const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      status: "success",
      message: "Login Successful",
      user: {
        authToken,
        _id: user._id,
        email: user.email,
        name: user.name,
        usertype: user.usertype,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
