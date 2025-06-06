const User = require('../model/User');

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken


  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser =  await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true,  sameSite: 'None', secure: true});
    return res.sendStatus(204); //No content
  }

  // Delete refreshToken in db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt',{ httpOnly: true,  sameSite: 'None', secure: true}); // secure: true 
  res.sendStatus(204);
  
}
   

module.exports = { handleLogout };