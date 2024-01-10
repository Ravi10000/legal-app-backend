import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// export const fetchUser = async (req, res, next) => {
//   try {
//     console.log("fetching user");
//     console.log("body on fetch user ", req.body);
//     console.log("params on fetch user ", req.params);
//     console.log("query on fetch user ", req.query);
//     console.log("files on fetch user ", req?.file);
//     console.log("headers on fetch user ", req.headers);

//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1];
//       console.log({ token });
//       if (token == "null" || !token) {
//         req.user = null;
//         return next();
//       }
//       let user = null;
//       try {
//         user = jwt.verify(token, process.env.JWT_SECRET);
//       } catch (err) {
//         console.log(err?.message);
//         req.user = null;
//         return next();
//       }
//       req.user = user;
//       console.log("user fetched successfully");
//       console.log({ user });
//     } else {
//       console.log("no user found");
//     }
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error", message: err.message });
//   }
// };

export const fetchUser = async (req, res, next) => {
  req.user = null;
  if (req?.headers?.authorization) {
    console.log(req?.headers?.authorization);
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token == "null" || !token) {
        req.tokenError = "no token provided";

        return next();
      }
      console.log({ token });

      const jwtExpiry = jwt.decode(token).exp;
      const now = Date.now() / 1000;

      if (jwtExpiry < now) {
        return res
          .status(401)
          .json({ status: "error", message: "token expired" });
      }

      req.user = jwt.verify(token, process.env.JWT_SECRET);

      return next();
    } catch (err) {
      console.log(err.message);
      req.tokenError = err.message;
      req.user = null;

      return next();
    }
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  const user = req?.user;
  if (user?.usertype !== "ADMIN") {
    return res.status(401).json({ message: "Admin Access Denied" });
  }
  next();
};

export async function isValidUser(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Access Denied" });
  const user = await User.findById(req.user._id);
  console.log({ user });
  if (!user) return res.status(401).json({ message: "Access Denied" });
  req.user = user;
  next();
}

export async function checkIfAdmin(req, res, next) {
  if (req.user.usertype === "ADMIN") req.user.isAdmin = true;
  else req.user.isAdmin = false;
  next();
}
