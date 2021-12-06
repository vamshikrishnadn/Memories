import bcrypt from "bcrypt";
import jws from "jsonwebtoken";
import User from "../models/Users.js";

const secret = "adsfadlkfjaslfasjfask";

export const signup = async (req, res, cb) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json(`User Already Exist With this email: ${email}`);
    }
    const user = await new User({ email, password, name });
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    user.save();
    const token = jws.sign(
      { email: user.email, password: user.password },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ user, token });
    cb(null, user);
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wong in creating new user");
  }
};

export const signin = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json(`User Does Not Exist With this email: ${email}`);
    }
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res.status(400).send("Password Incorrect.");
    }
    const token = jws.sign(
      { email: existingUser.email, password: existingUser.password },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).send({ user: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(409).send("Some thing went wong in Signup user");
  }
};
