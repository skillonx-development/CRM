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
      secure: true,            // Important for cross-site cookies!
      sameSite: 'None',        // Must be 'None' when frontend and backend are on different domains
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    

    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate authentication token');
  }
};
