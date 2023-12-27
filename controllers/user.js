const User = require("../models/User");
let Response = require("../services/response");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  if (req.body.fullName == undefined) {
    return res.json(Response.parse(false, "fullName is missing"));
  }
  if (req.body.password == undefined) {
    return res.json(Response.parse(false, "password is missing"));
  }
  if (req.body.email == undefined) {
    return res.json(Response.parse(false, "email is missing"));
  }

  try {
    let data = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    console.log("data", data);

    let userData = await User.create(data);
    res.json(Response.parse(false, userData));
  } catch (error) {
    console.log(error);
    res.json(Response.parse(true, "Something went wrong"));
  }
};

exports.login = async (req, res) => {
  if (req.body.email == undefined) {
    return res.json(Response.parse(false, "email is missing"));
  }
  if (req.body.password == undefined) {
    return res.json(Response.parse(false, "password is missing"));
  }

  let userData = await User.findOne({ email: req.body.email }).lean();

  if (userData) {
    let isMatched = bcrypt.compareSync(req.body.password, userData.password);
    if (isMatched) {
      let { token } = await User.generateAuthToken(req.body.email);
      userData.token = token;
      delete userData.password;
      res.json(Response.parse(false, userData));
    } else {
      res.json(Response.parse(false, "Invalid credentials"));
    }
  } else {
    res.json(Response.parse(false, "Invalid credentials"));
  }
};
