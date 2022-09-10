const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isModified("cpassword")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    // SECRET_KEY can be anything.
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = [...this.tokens, { token }];
    await this.save();
    return token;
  } catch (error) {
    console.log("ERROR WHILE GENERATING TOKEN --->", error);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
