const usersDB = {
  users: require('../model/users.json'),
  setUsers: function(data) {this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const {user, pwd} = req.body;
  if(!user ||  !pwd) return res.status(401).json({"message": "Username and password are required."});
  //check for duplicate user in the db
  const duplicate = usersDB.users.find(person => person.username === user);
  if(duplicate) return  res.sendStatus(409);
  try {
    //encrypt the password
    const hashePwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = { 
      "username": user,
      "roles": {
        "User": 2001
      }, 
      "password": hashePwd 
    }
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users,null,2)
    );
    console.log(usersDB.users);
    res.status(201).json({ "succcess": `New user ${user} created!` })
  } 
  catch (err) {
    res.status(500).json({"message": err.message });  
  }
}

module.exports = { handleNewUser }