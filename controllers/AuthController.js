const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const register = (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  bcrypt.hash(req.body.password, 10, function (err, hashedpass) {
    if (err) {
      return res.status(500).json({ message: "An error occurred" });
    }
    let user = new User({
      username: req.body.username,
      password: hashedpass,
    });
    user
      .save()
      .then((user) => {
        const token = jwt.sign(
          { id: user._id },
          `${process.env.JWT_SECRET_KEY}`,
          { expiresIn: "1h" }
        );
        res.status(201).json({
          message: "User has been created",
          token: token,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "An error occurred",
          error: err,
        });
      });
  });
};

const login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { phone: username }],
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { name: user.username },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { name: user.username },
      `${process.env.Refresh_token}`,
      {
        expiresIn: "48h",
      }
    );

    res.status(202).json({
      message: "Log in successful",
      token,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "MongoError") {
      res.status(500).json({ message: "Database connection error" });
    } else if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired" });
    } else {
      res.status(500).json({ message: "An error occurred" });
    }
  }
};

const refreshToken = (req,res,next) => {
  const refreshToken = req.body.refreshToken
  jwt.verify(refreshToken, `${process.env.Refresh_token}`,function(err,decode){
    if(err){
      res.status(400).json({
        err
      })
    }else{
      let token = jwt.sign({name:decode.username},`${process.env.JWT_SECRET_KEY}`);
      let refreshtoken  = req.body.refreshToken
      res.status(200).json({
        message:"Token refreshed successfully",
        token,
        refreshtoken   
      })
    }
  })
}

module.exports = {
  register,
  login,
  refreshToken
};
