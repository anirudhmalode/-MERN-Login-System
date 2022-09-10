const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/connection");

const User = require("../model/userSchema");
const authenticate = require("../middleware/Authenticate");

const throwErrorMessage = (res, statusCode, errorMsg) =>
  res.status(statusCode).json({ error: errorMsg });

const throwSuccessMessage = (res, statusCode, successMsg) =>
  res.status(statusCode).json({ message: successMsg });

router.get("/", (req, res) => {
  res.send("Home Page1");
});

router.get("/about", authenticate, (req, res) => {
  console.log("COMMING About --->", req);
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  console.log("COMMING GetData --->", req);
  res.send(req.rootUser);
});

// By using Promise -->
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return throwErrorMessage(res, 422, "Please, fill out all the fields!")
//   }

//   User.findOne({ email })
//     .then((userExists) => {
//       if (userExists) {
//         return throwErrorMessage(res, 422, "Email already exists!")
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() =>
// throwSuccessMessage(res, 201, "User registered successfully!");
//         )
//         .catch((err) =>
// throwErrorMessage(res, 422, "Registration failed!");
//         );
//     })
//     .catch((err) => console.log("Users not checked!", err));
// });

// by using Async await --->
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return throwErrorMessage(res, 422, "Please, fill out all the fields!");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return throwErrorMessage(res, 422, "Email already exists!");
    } else if (password !== cpassword) {
      return throwErrorMessage(res, 422, "Passwords are not matching!");
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    // Here the middleware from userSchema will work for hassing password.
    await user.save();
    throwSuccessMessage(res, 201, "User registered successfully!");
  } catch (error) {
    throwErrorMessage(res, 500, "Error while registering!");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throwErrorMessage(res, 422, "Email or password is not given!");

  try {
    const userLoogedIn = await User.findOne({
      email: email,
    });

    if (!userLoogedIn) throwErrorMessage(res, 500, "Invalid Credentials!");

    const isPasswordMatch = await bcrypt.compare(
      password,
      userLoogedIn.password
    );

    const token = await userLoogedIn.generateAuthToken();

    res.cookie("loginsystemjwtoken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 25892000000),
    });

    if (isPasswordMatch) {
      return throwSuccessMessage(res, 201, "User Logged in Successfully!");
    } else {
      return throwErrorMessage(res, 500, "Invalid Credentials!");
    }
  } catch (error) {
    throwErrorMessage(res, 500, "User name or password is wrong!");
  }
});

module.exports = router;
