export const isLibrarian  = (req, res, next) => {
  if (req.user && req.user.role === "librarian") {
    return next();
  }
  return res.status(403).json({
    message: "Access denied : Librarian only",
  });
};