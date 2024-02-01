// app.js
const User = require('../models/user'); // Adjust the path if needed


const create_user = async (req, res) => {
    const {
      userName,
      userEmail,
      userPassword,
      userCPassword,
      userGroup,
      userVendor,
      userClient,
      disableUser
    } = req.body;
  
    try {
      // Create a new user in the database
      const newUser = await User.create({
        userName:userName,
        userEmail:userEmail,
        userPassword:userPassword,
        userCPassword:userCPassword,
        userGroup:userGroup,
        userVendor:userVendor,
        userClient:userClient,
        disableUser:disableUser
      });
  
      res.status(200).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error adding user' });
    }
  };
  
  // Endpoint to edit a user
  const edit_user = async (req, res) => {
    
  };
  const search = async(req,res)=>{

   try{ 
    const searchResult = await User.findAll({
        where: req.body // Assuming your User model matches the structure of the form
    });

    res.status(200).json({ message: 'Search successful', result: searchResult });
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error searching for users' });
  };
}
  
module.exports = {
  create_user,
  edit_user,
  search
};
