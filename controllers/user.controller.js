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
