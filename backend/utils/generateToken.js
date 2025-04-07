import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, type, res) => {
  const token = jwt.sign({ id: userId, type }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt-crm', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
