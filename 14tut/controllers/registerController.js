const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const {user, pwd} = req.body;
  if(!user ||  !pwd) return res.status(401).json({"message": "Username and password are required."});
  //check for duplicate user in the db
  const duplicate = await User.findOne({ username: user}).exec();
  if(duplicate) return  res.sendStatus(409);
  try {
    //encrypt the password
    const hashePwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashePwd
    });
    console.log(result);
    res.status(201).json({ "succcess": `New user ${user} created!` })
  } 
  catch (err) {
    res.status(500).json({"message": err.message });  
  }
}

module.exports = { handleNewUser }