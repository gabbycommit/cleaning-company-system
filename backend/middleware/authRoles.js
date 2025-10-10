const authRoles = (...allowRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "Auth in JWT failed" });
    }
    if (!allowRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }

    next();
  };
};

export default authRoles;
