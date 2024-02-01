const User = require('../models/user'); 
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")


const search =async(req,res)=>{
}

function generateAccessToken(id, userName, 
  disableUser, 
  userGroup,
  readOnly,
  Write,
  imports ,
  exports,
  userManagement ,
  reports,) {
  return jwt.sign({ userId: id, userName: userName,disableUser:disableUser,userGroup:userGroup,readOnly:readOnly,Write:Write,imports:imports,exports:exports,userManagement:userManagement,reports:reports}, 'secretkey');
}


const create_user = async (req, res, next) => {
  try {
    const {
      userName,
      lastName,
      userEmail,
      userPassword,
      userCPassword,
      userPhone,
      userGroup,
      userVendor,
      userClient,
      createdDate,
      disableUser,
      readOnly,
        Write,
        
        imports,
        exports,
        userManagement,
        reports
          } = req.body;
    
    console.log(req.body)
    const saltrounds = 10;

    bcrypt.hash(userPassword, saltrounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      try {
        const newUser = await User.create({
          userName,
          lastName,
          userEmail,
          userPassword: hash,
          userCPassword,
          userPhone,
          userGroup,
          userVendor,
          userClient,
          createdDate,
          disableUser,
          readOnly,
          Write,
          imports,
          exports,
          userManagement,
          reports,
        });

        res.status(201).json({ message: "Successfully Created New User", user: newUser });
      } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({
          message: "Error creating user",
          error: err
        });
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({
      message: "Unexpected error",
      error: err
    });
  }
};

  // Endpoint to edit a user
// Endpoint to edit a user
const edit_user = async (req, res) => {
  const userId = req.params.id;
  console.log(req.body);

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If the user does not exist, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user fields with the new data
    user.userName = req.body.userName;
    user.lastName = req.body.lastName;
    user.userEmail = req.body.userEmail;
    user.userPhone = req.body.userPhone;
    user.userGroup = req.body.userGroup;
    user.userVendor = req.body.userVendor;
    user.userClient = req.body.userClient;
    user.createdDate = req.body.createdDate;
    user.disableUser = req.body.disableUser;
    user.readOnly = req.body.readOnly;
    user.Write = req.body.Write;
    user.imports = req.body.imports;
    user.exports = req.body.exports;
    user.userManagement = req.body.userManagement;
    user.reports = req.body.reports;

    // Check if a new password is provided
    if (req.body.userPassword.length >50) { console.log('No changes present')}
    else{
      const saltrounds = 10;

      // Hash the new password
      const hash = await bcrypt.hash(req.body.userPassword, saltrounds);
      user.userPassword = hash;
    }
    // Save the updated user
    await user.save();

    // Fetch the updated user after saving changes
    const updatedUser = await User.findByPk(userId);

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error during user update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const login = async (req, res, next) => {
  try {
    const { userName, userPassword } = req.body;

    // Find the user with the provided username
    const user = await User.findOne({ where: { userName: userName } });

    if (user) {
      // Compare the provided password with the stored hashed password in the database
      bcrypt.compare(userPassword, user.userPassword, (err, passwordMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        if (passwordMatch) {
          // Password is correct, generate JWT token
          const token = generateAccessToken(user.id, user.userName, user.disableUser,user.userGroup,user.readOnly,user.Write,user.imports,user.exports,user.userManagement,user.reports);
          console.log(token);
          return res.status(200).json({
            success: true,
            message: 'User Logged in Successfully',
            token: token,
            username: user.userName,
            userId:user.id,
            // disableUser:user.disableUser,
            // userGroup:user.userGroup,
            // readOnly:user.readOnly,
            // Write:user.Write,
           
            // imports:user.imports,
            // exports:user.exports,
            // userManagement:user.userManagement,
            // reports:user.reports,
            
          });
        } else {
          // Password is invalid
          return res.status(400).json({ success: false, message: 'Password is invalid' });
        }
      });
    } else {
      // User does not exist
      return res.status(404).json({ success: false, message: 'User does not exist' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const view_user = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    let userGroup;

    // Fetch user data by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    userGroup = user.dataValues.userGroup;
    console.log('User Group:', userGroup);

    if (userGroup === 'admin') {
      // If the user is an admin, fetch only their own data (excluding disabled users)
      const allUsers = await User.findAll({
        where: {
          disableUser: false // Exclude users with disableUser set to true
        }
      });

      res.status(200).json({ users: allUsers, success: true });
    }
     else if (userGroup === 'vendor') {
      // If the user is a vendor, fetch only the users associated with them
      const allUsers = await User.findAll({
        where: {
          id:userId,
          disableUser: false // Exclude users with disableUser set to true
        }
      });

      res.status(200).json({ users: allUsers, success: true });
    }
     else if (userGroup === 'SA') {
      // If the user is SA, fetch all users (including disabled)
      const allUsers = await User.findAll();

      res.status(200).json({ users: allUsers, success: true });
    } else {
      // Handle other user groups or restrict access as needed
      res.status(403).json({ message: 'Access forbidden', success: false });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err, message: 'Internal Server Error', success: false });
  }
};




const delete_user=async(req,res)=>{
const id=req.params.id;
try {
    // Delete company with the specified company_id (companyId)
    // Replace the following line with your database deletion logic
    const deletedUser = await User.destroy({ where: { id: id } });

    // Check if the company was deleted
    // Adjust the condition based on your Sequelize delete operation
    if (deletedUser > 0) {
        res.status(200).json({ success: true });
    } else {
        res.status(404).json({ error: 'Company not found', success: false });
    }
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
}
}


  
module.exports = {
  create_user,
  edit_user,
  search,
  login,
  view_user,
  delete_user,
  // searchAll
};
