const jwt = require("jsonwebtoken");
const { hashPassword, comparePasswords, throwError } = require("./helpers");
const User = require("./user.model");

exports.register = async (req, res, next) => {
  try {
    const { email, phone, password, name } = req.body;

    if (phone.length < 10)
      throwError("Minimum of 10 digits for phone number required", 400);

    const userExists = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (userExists) throwError("Email or Phone number exists", 409);

    //   encrypt password
    const hashedPassword = hashPassword(password);

    const user = new User({
      name: name,
      phone: phone,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throwError("User is not registered", 404);

    const passMatch = comparePasswords(password, user.password);

    if (!passMatch) throwError("Incorrect Password", 401);

    //   generate token
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ userId: user._id.toString(), user, token });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) throwError("User not found!", 404);

    res.status(200).json(user);
  } catch (err) {
    next(next);
  }
};
