const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const registerController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    // if (!profession) {
    //   return res.send({ message: "Profession  is Required" });
    // }
    if (password.length < 6) {
      return res.send({ message: "Password should have 6 charecters" });
    }
    // if (!phone) {
    //   return res.send({ message: "Phone no is Required" });
    // }
    if (!confirmPassword) {
      return res.send({ message: "confirmpassword is Required" });
    }
    if (password !== confirmPassword) {
      return res.send({ message: "password and confirmpassword should match" });
    }

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(16).toString("hex");

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      verificationToken,
    }).save();

    const mailOptions = {
      from: "fyp2batch19@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Click on the following link to verify your email: http://localhost:5173/verify/${verificationToken}`,
    };

    // Send a verification email to the user
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "fyp2batch19@gmail.com", // Replace with your Gmail email
        pass: "cxqe lhsh qtyf xune", // Replace with your Gmail password
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        // Handle the error (e.g., return an error response)
        return res.status(500).send({
          success: false,
          message: "Error sending verification email",
        });
      }
      console.log("Verification email sent: " + info.response);
    });

    res.status(201).send({
      success: true,
      message:
        "User Register Successfully. Please check your email for verification instructions. ",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errror in Registeration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // Check if the user's email is verified
    if (!user.isEmailVerified) {
      return res.status(403).send({
        success: false,
        message:
          "Email is not verified. Please check your email for verification instructions.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // if (user.userType === 'client') {
    //   // Redirect the client to the main client dashboard
    //   res.redirect('/client-dashboard'); // Replace with the actual client dashboard route
    // } else if (user.userType === 'creator') {
    //   // Redirect the creator to the main creator dashboard
    //   res.redirect('/creator-dashboard'); // Replace with the actual creator dashboard route
    // }

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
        profession: user.profession,
        myVideos: user.myVideos,
        userType: user.userType,
        language: user.language,
        city: user.city,
        country: user.country,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const getUserVideos = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    userVideos = user.myVideos;
    res.status(200).send({ userVideos });
  } catch (error) {
    res.status(404).send({ message: "error occured" });
  }
};

module.exports = {
  registerController,
  loginController,
  getUserVideos,
};
