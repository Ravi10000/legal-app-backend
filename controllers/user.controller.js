import User from "../models/user.model.js";

export async function getAllUsers(req, res) {
  const { type } = req.query;
  const q = {};
  const validUsertypes = ["ADMIN", "VENDOR", "CLIENT", "EXECUTIVE"];
  if (type) {
    if (!validUsertypes.includes(type))
      return res
        .status(400)
        .json({ status: "error", message: "Invalid usertype" });
    q.usertype = type;
  }
  try {
    const users = await User.find(q);
    return res.status(200).json({ status: "success", users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function getUserDetails(req, res) {
  if (!req.user) {
    return res.status(400).json({ status: "error", message: "Not Logged In" });
  }
  res.status(200).json({ status: "success", user: req.user });
}

export async function getUserById(req, res) {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json({ status: "error", message: "required fields: userId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid userId" });
    }
    return res.status(200).json({ status: "success", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
export async function deleteUser(req, res) {
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json({ status: "error", message: "required fields: userId" });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid userId" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "User Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function updateUserDetails(req, res, next) {
  try {
    const { name, email, phoneNumber, is_deactivated, userId } = req.body;
    console.log({ body: req.body });
    console.log({ is_deactivated });
    const profilePic = req?.file;
    const isAdmin = req.user.usertype === "ADMIN";
    if (email !== req.user.email || phoneNumber !== req.user.phoneNumber) {
      const query = [];
      if (email !== req.user.email) query.push({ email });
      if (phoneNumber !== req.user.phoneNumber) query.push({ phoneNumber });
      const existingUser = await User.findOne({
        $or: query,
      });
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "Email or Phone Number already exists",
        });
      }
    }
    if (isAdmin && !userId)
      return res
        .status(400)
        .json({ status: "error", message: "required fields: userId" });

    console.log({ type: typeof is_deactivated });
    const updatedUser = await User.findByIdAndUpdate(
      isAdmin ? userId : req.user._id,
      {
        ...(name && { name }),
        ...(profilePic && { profilePic }),
        ...(email && email !== req.user.email && { email }),
        ...(phoneNumber &&
          phoneNumber !== req.user.phoneNumber && { phoneNumber }),
        ...(typeof is_deactivated === "boolean" && { is_deactivated }),
      }
    );
    console.log({ updatedUser });
    if (!updatedUser) {
      return res.status(400).json({
        status: "error",
        message: "Invalid userId",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User Details Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
}
