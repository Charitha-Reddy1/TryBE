import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
const getusers = async (req, res) => {
  const users = await userModel.find();
  res.render("users/index", { users });
};

const adduser = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  await userModel.create(body);
  res.redirect("/users");
};

const adduserForm = async (req, res) => {
  res.render("users/add");
};

const deleteuser = async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.redirect("/users");
};

const edituserForm = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ _id: id });
  res.render("users/edit", { user });
};

const saveuser = async (req, res) => {
  const id = req.params.id;

  const body = req.body;

  if(body.password){

    const hashedPassword =
      await bcrypt.hash(body.password, 10);

    body.password = hashedPassword;

  }

  await userModel.findByIdAndUpdate(
    id,
    body
  );

  res.redirect("/users");
};

const updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const { name } = req.body;

    const updatedUser =
      await userModel.findByIdAndUpdate(

        id,

        {
          name,
        },

        {
          new: true,
        }

      );

    res.json(updatedUser);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to update user",
    });

  }

};

export {
  getusers,
  adduser,
  adduserForm,
  deleteuser,
  edituserForm,
  saveuser,
  updateUser,
};
