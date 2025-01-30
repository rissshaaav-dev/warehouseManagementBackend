const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    } else {
      res.status(403);
      throw new Error("Not authorized as admin");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = admin;
