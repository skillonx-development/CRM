import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, team, res) => {
  try {
    const token = jwt.sign({
      id: userId,
      team: team
    }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt-crm', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // important for cross-site cookies
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    

    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate authentication token');
  }
};
