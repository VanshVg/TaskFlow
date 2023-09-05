const jwt = require("jsonwebtoken");
require("dotenv").config();

const blackListModel = require("../models/blackListModel");

let isAuthenticated = async (req, res, next) => {
  const { userToken } = req.cookies;

  if (!userToken) {
    return res.status(403).send({
      message: "Login Required",
    });
  }

  try {
    let userTokenBlackList = await blackListModel.findOne({ type: "userToken" });
    if (userTokenBlackList) {
      if (userTokenBlackList.blackList.includes(userToken)) {
        return res.status(401).json({
          type: "jwt",
          message: "Invalid Token",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      type: "jwt",
      message: "Error while verifying token",
      error: error,
    });
  }

  try {
    let decoded = await jwt.verify(userToken, process.env.SECRET_TOKEN);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({
        type: "jwt",
        message: "Invalid Token",
      });
    }
  } catch (error) {
    res.status(500).send({
      type: "jwt",
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = isAuthenticated;
