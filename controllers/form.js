const Form = require("../models/Form");
let Response = require("../services/response");
const bcrypt = require("bcrypt");
exports.submitForm = async (req, res) => {
  try {
    if (req.body.title == undefined) {
      return res.json(Response.parse(false, "title is missing"));
    }
    if (req.body.imageUrl == undefined) {
      return res.json(Response.parse(false, "imageUrl is missing"));
    }
    if (req.body.description == undefined) {
      return res.json(Response.parse(false, "description is missing"));
    }

    if (req.body.userId == undefined) {
      return res.json(Response.parse(false, "userId is missing"));
    }

    let data = {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      userId: ObjectId(req.body.userId),
    };
    let userData = await Form.create(data);
    res.json(Response.parse(false, userData));
  } catch (error) {
    console.log(error);
    res.json(Response.parse(true, "Something went wrong"));
  }
};

exports.getAllForm = async (req, res) => {
  try {
    let userId = req.body.userId;

    if (!userId) res.json(Response.parse(false, "userId is missing..."));

    let data = await from.find({ userId: ObjectId(userId) });
    res.json(Response.parse(false, data));
  } catch (error) {
    res.json(Response.parse(false, error.message));
  }
};
