const checkRole = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ status: "fail", message: "Forbidden" });
    }
  };
};

export { checkRole };
