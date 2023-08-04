const express = require("express");

const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", isAuthenticated, userController.userProfile);
router.post("/logout", isAuthenticated, userController.logout);
router.put("/updateProfile", isAuthenticated, userController.updateProfile);
router.delete("/deleteAccount", isAuthenticated, userController.deleteAccount);
router.put("/updatePassword", isAuthenticated, userController.updatePassword);
router.post("/forgotPassword", isAuthenticated, userController.forgotPassword);

module.exports = router;
