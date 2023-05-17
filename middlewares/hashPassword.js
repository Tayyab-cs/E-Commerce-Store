import bcrypt from "bcrypt";

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    req.body.password = hashedPassword;
    next();
  });
};

export default hashPassword;
