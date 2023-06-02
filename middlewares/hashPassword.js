import bcrypt from "bcrypt";

const hashPassword = (req, res, next) => {
  const { password, newPassword } = req.body;

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      req.body.password = hashedPassword;
      next();
    });
  } else if (newPassword) {
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      req.body.newPassword = hashedPassword;
      next();
    });
  }
};

export default hashPassword;
