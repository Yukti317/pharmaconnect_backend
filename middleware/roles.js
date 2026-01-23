// export const adminOnly = (req, res, next) => {
//   if (req.user.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({ success: false, message: "Admin access only" });
// };

// export const bdeOnly = (req, res, next) => {
//   if (req.user.role === "bde") {
//     return next();
//   }
//   return res.status(403).json({ success: false, message: "BDE access only" });
// };

// export const managerOnly = (req, res, next) => {
//   if (req.user.role === "manager") {
//     return next();
//   }
//   return res.status(403).json({ success: false, message: "Manager access only" });
// };


export const allowRoles = (...roles) => {

  return (req, res, next) => {
    if (roles?.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({
      success: false,
      message: "Access denied"
    });
  };
};
