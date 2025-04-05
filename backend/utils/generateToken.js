export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt-crm', token, {
    httpOnly: true,
    secure: false, // only true in production (with HTTPS)
    sameSite: 'lax', // allow cross-origin with form submissions & axios
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
