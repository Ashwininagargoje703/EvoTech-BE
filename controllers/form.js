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
    let userId = req.query.userId;
    if (!userId) return res.json(Response.parse(false, "userId is missing"));
    let data = await Form.find({ userId: ObjectId(userId) });
    return res.json(Response.parse(true, data));
  } catch (error) {
    return res.json(Response.parse(false, error.message));
  }
};

exports.updateForm = async (req, res) => {
  try {
    let formId = req.body.formId;

    if (!formId) res.json(Response.parse(false, "formId is missing..."));

    let updateObj = {};

    if (req.body.imageUrl) updateObj.imageUrl = req.body.imageUrl;
    if (req.body.title) updateObj.title = req.body.title;
    if (req.body.description) updateObj.description = req.body.description;

    console.log(updateObj, formId);
    await Form.updateOne({ _id: ObjectId(formId) }, { $set: updateObj });
    res.json(Response.parse(false, "updated Successfully"));
  } catch (error) {
    res.json(Response.parse(false, error.message));
  }
};

exports.deleteForm = async (req, res) => {
  try {
    let formId = req.body.formId;

    if (!formId) res.json(Response.parse(false, "formId is missing..."));

    let f = await Form.findByIdAndDelete(ObjectId(formId));
    res.json(Response.parse(false, f));
  } catch (error) {
    res.json(Response.parse(false, error.message));
  }
};
