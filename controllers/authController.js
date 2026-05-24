import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "mysecret";

const login = async (req, res) => {
  res.render("auth/login");
};

const validateUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.redirect("/auth/login");
    }
  } else {
    res.redirect("/auth/login");
  }
};

const register = async (req, res) => {
  res.render("auth/register");
};


const registerUser = async (req, res) => {
  const body = req.body;

  const hashedPassword = await bcrypt.hash(body.password, 10);

  body.password = hashedPassword;

  await userModel.create(body);

  res.redirect("/auth/login");
};


const signup = async (req, res) => {

  try {

    console.log(req.body);

    let {name, email, password } = req.body;

    const existingUser =
      await userModel.findOne({ email });

    if (existingUser) {

      return res.json({
        error: "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const response =
      await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

    res.json(response);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

};

const signin = async (req, res) => {

  try {

    let { email, password } = req.body;

    const user =
      await userModel.findOne({ email });

    if (user) {

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (isMatch) {

        const userObj = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign(
          userObj,
          SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.json({
          ...userObj,
          token,
        });

      } else {

        res.json({
          error: "Invalid Password",
        });

      }

    } else {

      res.json({
        error: "Invalid User",
      });

    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

};

const logout = (req, res) => {
  req.session.destroy();

  res.locals.user = null;

  res.render("auth/login");
};

export {
  login,
  validateUser,
  register,
  registerUser,
  logout,
  signup,
  signin,
};