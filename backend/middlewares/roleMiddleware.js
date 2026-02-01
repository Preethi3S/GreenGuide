import asyncHandler from 'express-async-handler';

export const checkRole = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403);
      throw new Error('Access denied: insufficient permissions');
    }

    next();
  });

export const isAdmin = checkRole('admin');
