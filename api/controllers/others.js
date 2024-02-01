const Vessel = require("../models/vessel")
const VSL = require("../models/VSL")
const Experience = require("../models/experience")
const Rank = require("../models/rank")
const Grade = require("../models/grade")
const Port = require("../models/port")
const PortAgent = require("../models/port_agent")
const Hospital = require("../models/hospital")
const Document = require("../models/document")
const Vendor = require("../models/vendor")
const User = require('../models/user')
const Country = require('../models/country')
const CrewPlanner=require('../models/crew-planner')

const { Op } = require('sequelize');


const create_vessel =  async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const { vesselName } = req.body;
      const newVessel = await Vessel.create({ vesselName });
      res.json({ message: 'Vessel created successfully' });
    }
    else{
      res.status(404).json({message:"Not an Admin",success:false})
    }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const create_VSL =  async (req, res) => {
    const { vesselName, vesselType, vsl_company, imoNumber, vesselFlag } = req.body;
    console.log(req.body)
  
    try {
      // Check if the VSL with the provided imoNumber already exists
      const existingVSL = await VSL.findOne({
        where: {
          imoNumber: {
            [Op.eq]: imoNumber,
          },
        },
      });
  
      if (existingVSL) {
        return res.status(400).json({ error: 'VSL with the provided IMO number already exists.' });
      }
  
      // Create a new VSL
      const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const newVSL = await VSL.create({
        vesselName,
        vesselType,
        vsl_company:vsl_company,
        imoNumber,
        vesselFlag,
       
      });
  
      res.json({ message: 'VSL created successfully', vsl: newVSL });
    }
    else{
      res.status(404).json({message:"Not an admin"})
    }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const create_exp= async (req, res) => {
    const { experience } = req.body;

    try {
        // Create a new Experience
        const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
        const newExperience = await Experience.create({ experience });

        res.json({ message: 'Experience created successfully', experience: newExperience });
          }
          else{
            res.status(404).json({message:"Not an admin"})
          }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const create_rank = async (req, res) => {
  const { rank, rankOrder, category } = req.body;

  try {
      // Create a new Rank
      const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const newRank = await Rank.create({
          rank,
          rankOrder,
          category,
      });

      res.json({ message: 'Rank created successfully', rank: newRank });
    }
    else{
      res.status(404).json({message:"Not an admin"})
    }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create_grade = async (req, res) => {
  const { gradeExp } = req.body;

  try {
    const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const newGrade = await Grade.create({ gradeExp });

      res.json({ message: 'Grade created successfully', grade: newGrade });
          }
          else{
            res.staus(404).json({message:"Not an Admin"})
          }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
const create_port = async (req, res) => {
  const { portName } = req.body;

  try {
      // Create a new Port
      const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const newPort = await Port.create({ portName });

      res.json({ message: 'Port created successfully', port: newPort });
          }
          else{
            res.status(404).json({message:"not an admin"})
          }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create_port_agent =  async (req, res) => {
  const { portAgentName, contactPerson, address, phone, email, city, state, country } = req.body;

  try {
      // Create a new PortAgent
      const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const newPortAgent = await PortAgent.create({
          portAgentName,
          contactPerson,
          address,
          phone,
          email,
          city,
          state,
          country,
      });

      res.json({ message: 'Port Agent created successfully', portAgent: newPortAgent });
    }
    else{
      res.status(404).json({message:"not an admin"})
    }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
const create_hospital = async (req, res) => {
  const { hospitalName, doctorName, doctorAddress, doctorCity, doctorState, doctorPhone, doctorEmail, doctorUpload } = req.body;

  try {
    const userId = req.user.id;
    console.log(userId)
    let userGroup;
    const user = await User.findAll({ where: { id: userId } });
    if (user.length > 0) {
         userGroup = user[0].dataValues.userGroup;
        console.log('User Group:', userGroup);
    } else {
        console.log('User not found');
    }
        if(userGroup === 'admin')
        {
      const newHospital = await Hospital.create({
          hospitalName,
          doctorName,
          doctorAddress,
          doctorCity,
          doctorState,
          doctorPhone,
          doctorEmail,
          doctorUpload,
      });

      res.json({ message: 'Hospital created successfully', hospital: newHospital });
    }
    else{
      res.status(404).json({message:"not an admin"})
    }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const create_document =async (req, res) => {
  const { documentType, hideExpiryDate } = req.body;

  try {
      // Create a new Document
      const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const newDocument = await Document.create({
          documentType,
          hideExpiryDate,
      });

      res.json({ message: 'Document created successfully', document: newDocument });
    }
    else{
      res.status(404).json({message:"not an admin"})
    }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const create_vendor = async (req, res) => {
  const { vendorName, vendorAddress } = req.body;

  try {
      // Create a new Vendor
      const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const newVendor = await Vendor.create({
          vendorName,
          vendorAddress,
      });

      res.json({ message: 'Vendor created successfully', vendor: newVendor });
    }
    else{
      res.status(404).json({message:"not an admin"})
    }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};





//view 
// others.js

// ... (previous code)

// View routes
const view_vessel = async (req, res) => {
  try {
      const userId = req.user.id;
      console.log(userId);

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found' });
      }

      const userGroup = user.dataValues.userGroup;
      console.log('User Group:', userGroup);

      let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
      let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

      // Calculate the offset based on the page and limit
      let offset = (page - 1) * limit;

      if (userGroup === 'admin') {
          // For admin, fetch all vessels with pagination
          const result = await Vessel.findAndCountAll({
              offset,
              limit,
          });

          res.status(200).json({
              vessels: result.rows,
              totalCount: result.count,
              totalPages: Math.ceil(result.count / limit),
              currentPage: page,
              success: true,
          });
      } else {
          // For other users, fetch vessels where UserId matches the authenticated user's ID with pagination
          const result = await Vessel.findAndCountAll({
              where: {
                  UserId: userId
              },
              offset,
              limit,
          });

          res.status(200).json({
              vessels: result.rows,
              totalCount: result.count,
              totalPages: Math.ceil(result.count / limit),
              currentPage: page,
              success: true,
          });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err, message: "Internal Server Error", success: false });
  }
};



const view_VSL = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const userGroup = user.dataValues.userGroup;
    console.log('User Group:', userGroup);

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all VSLs with pagination
      const result = await VSL.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        vsls: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, handle accordingly (You can customize this based on your business logic)
      res.status(403).json({ message: 'Access forbidden', success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: 'Internal Server Error', success: false });
  }
};



const view_experience = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const userGroup = user.dataValues.userGroup;
    console.log('User Group:', userGroup);

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all experiences with pagination
      const result = await Experience.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        experiences: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, fetch experiences where UserId matches the authenticated user's ID with pagination
      const result = await Experience.findAndCountAll({
        where: {
          UserId: userId,
        },
        offset,
        limit,
      });

      res.status(200).json({
        experiences: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: 'Internal Server Error', success: false });
  }
};


const view_rank = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const userGroup = user.dataValues.userGroup;
    console.log('User Group:', userGroup);

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all ranks with pagination
      const result = await Rank.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        ranks: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, fetch ranks where UserId matches the authenticated user's ID with pagination
      const result = await Rank.findAndCountAll({
        where: {
          UserId: userId,
        },
        offset,
        limit,
      });

      res.status(200).json({
        ranks: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: 'Internal Server Error', success: false });
  }
};


const view_grade = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    let userGroup;
    const user = await User.findAll({ where: { id: userId } });

    if (user.length > 0) {
      userGroup = user[0].dataValues.userGroup;
      console.log('User Group:', userGroup);
    } else {
      console.log('User not found');
    }

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all grades with pagination
      const result = await Grade.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        grades: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, return an error response
      res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const view_port = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    let userGroup;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    userGroup = user.dataValues.userGroup;
    console.log('User Group:', userGroup);

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all ports with pagination
      const result = await Port.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        ports: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, return an error response
      res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const view_port_agent = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    let userGroup;
    const user = await User.findAll({ where: { id: userId } });
    if (user.length > 0) {
      userGroup = user[0].dataValues.userGroup;
      console.log('User Group:', userGroup);
    } else {
      console.log('User not found');
    }

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all port agents with pagination
      const result = await PortAgent.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        portAgents: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, return an error response
      res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const view_hospital = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    let userGroup;
    const user = await User.findAll({ where: { id: userId } });
    if (user.length > 0) {
      userGroup = user[0].dataValues.userGroup;
      console.log('User Group:', userGroup);
    } else {
      console.log('User not found');
    }

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all hospitals with pagination
      const result = await Hospital.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        hospitals: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, return an error response
      res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const view_document = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    let userGroup;
    const user = await User.findAll({ where: { id: userId } });
    if (user.length > 0) {
      userGroup = user[0].dataValues.userGroup;
      console.log('User Group:', userGroup);
    } else {
      console.log('User not found');
    }

    let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
    let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

    // Calculate the offset based on the page and limit
    let offset = (page - 1) * limit;

    if (userGroup === 'admin') {
      // For admin, fetch all documents with pagination
      const result = await Document.findAndCountAll({
        offset,
        limit,
      });

      res.status(200).json({
        documents: result.rows,
        totalCount: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        success: true,
      });
    } else {
      // For other users, return an error response
      res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const view_vendor = async (req, res) => {
  try {
    const userId = req.user.id;
      console.log(userId)
      let userGroup;
      const user = await User.findAll({ where: { id: userId } });
      if (user.length > 0) {
           userGroup = user[0].dataValues.userGroup;
          console.log('User Group:', userGroup);
      } else {
          console.log('User not found');
      }
          if(userGroup === 'admin')
          {
      const allVendors = await Vendor.findAll()
      res.json({ vendors:allVendors });

    }  else{
      // Find all companies where UserId matches the authenticated user's ID
      
              res.status(404).json({message:"not an admin"})
            }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const delete_vessel= async (req, res) => {
  const vesselId = req.params.id;

  try {
      // Delete company with the specified company_id (companyId)
      // Replace the following line with your database deletion logic
      const deletedVessel = await Vessel.destroy({ where: { id: vesselId } });

      // Check if the company was deleted
      // Adjust the condition based on your Sequelize delete operation
      if (deletedVessel > 0) {
          res.status(200).json({ success: true });
      } else {
          res.status(404).json({ error: 'Vessel not found', success: false });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

// ... (previous code)

const delete_VSL = async (req, res) => {
  const vslId = req.params.id;

  try {
    const deletedVSL = await VSL.destroy({ where: { id: vslId } });

    if (deletedVSL > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'VSL not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_experience = async (req, res) => {
  const experienceId = req.params.id;

  try {
    const deletedExperience = await Experience.destroy({ where: { id: experienceId } });

    if (deletedExperience > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Experience not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_rank = async (req, res) => {
  const rankId = req.params.id;

  try {
    const deletedRank = await Rank.destroy({ where: { id: rankId } });

    if (deletedRank > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Rank not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_grade = async (req, res) => {
  const gradeId = req.params.id;

  try {
    const deletedGrade = await Grade.destroy({ where: { id: gradeId } });

    if (deletedGrade > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Grade not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_port = async (req, res) => {
  const portId = req.params.id;

  try {
    const deletedPort = await Port.destroy({ where: { id: portId } });

    if (deletedPort > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Port not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_port_agent = async (req, res) => {
  const portAgentId = req.params.id;

  try {
    const deletedPortAgent = await PortAgent.destroy({ where: { id: portAgentId } });

    if (deletedPortAgent > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Port Agent not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_hospital = async (req, res) => {
  const hospitalId = req.params.id;

  try {
    const deletedHospital = await Hospital.destroy({ where: { id: hospitalId } });

    if (deletedHospital > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Hospital not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_document = async (req, res) => {
  const documentId = req.params.id;

  try {
    const deletedDocument = await Document.destroy({ where: { id: documentId } });

    if (deletedDocument > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Document not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const delete_vendor = async (req, res) => {
  const vendorId = req.params.id;

  try {
    const deletedVendor = await Vendor.destroy({ where: { id: vendorId } });

    if (deletedVendor > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Vendor not found', success: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

// ... (previous code)

const update_vessel=async(req,res)=>{
    const id = req.params.id;

    try {
        // Find the company by ID
        const vessel = await Vessel.findByPk(id);

        // If the company does not exist, return a 404 response
        if (!vessel) {
            return res.status(404).json({ message: 'Vessel not found' });
        }

        // Update the company fields with the new data
        vessel.vesselName = req.body.vesselName;
      

        // Save the updated company
        await vessel.save();

        // Fetch the updated company after saving changes
        const updatedVessel = await Vessel.findByPk(id);

        res.status(200).json({
            message: 'Vessel updated successfully',
            vessel: updatedVessel
        });
    } catch (error) {
        console.error('Error during Vessel update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update_VSL=async(req,res)=>{
  const id = req.params.id;

  try {
      // Find the company by ID
      const vsl = await VSL.findByPk(id);
    console.log(vsl)
      // If the company does not exist, return a 404 response
      if (!vsl) {
          return res.status(404).json({ message: 'VSL not found' });
      }

      // Update the company fields with the new data
      vsl.vesselName = req.body.vesselName;
      vsl.vesselType = req.body.vesselType;
      vsl.vsl_company = req.body.vsl_company;
      vsl.imoNumber = req.body.imoNumber;
      vsl.vesselFlag = req.body.vesselFlag;
    

      // Save the updated company
      await vsl.save();

      // Fetch the updated company after saving changes
      const updatedVSL = await VSL.findByPk(id);

      res.status(200).json({
          message: 'VSL updated successfully',
          vsls: updatedVSL
      });
  } catch (error) {
      console.error('Error during VSL update:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
 

const update_experience = async (req, res) => {
  const id = req.params.id;

  try {
    const experience = await Experience.findByPk(id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    experience.experience = req.body.experience;

    await experience.save();

    const updatedExperience = await Experience.findByPk(id);

    res.status(200).json({
      message: 'Experience updated successfully',
      experience: updatedExperience,
    });
  } catch (error) {
    console.error('Error during Experience update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update_rank = async (req, res) => {
  const id = req.params.id;

  try {
    const rank = await Rank.findByPk(id);

    if (!rank) {
      return res.status(404).json({ message: 'Rank not found' });
    }

    rank.rank = req.body.rank;
    rank.rankOrder = req.body.rankOrder;
    rank.category = req.body.category;

    await rank.save();

    const updatedRank = await Rank.findByPk(id);

    res.status(200).json({
      message: 'Rank updated successfully',
      rank: updatedRank,
    });
  } catch (error) {
    console.error('Error during Rank update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update_grade = async (req, res) => {
  const id = req.params.id;

  try {
    const grade = await Grade.findByPk(id);

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    grade.gradeExp = req.body.gradeExp;

    await grade.save();

    const updatedGrade = await Grade.findByPk(id);

    res.status(200).json({
      message: 'Grade updated successfully',
      grade: updatedGrade,
    });
  } catch (error) {
    console.error('Error during Grade update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update_port = async (req, res) => {
  const id = req.params.id;

  try {
    const port = await Port.findByPk(id);

    if (!port) {
      return res.status(404).json({ message: 'Port not found' });
    }

    port.portName = req.body.portName;

    await port.save();

    const updatedPort = await Port.findByPk(id);

    res.status(200).json({
      message: 'Port updated successfully',
      port: updatedPort,
    });
  } catch (error) {
    console.error('Error during Port update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update_port_agent = async (req, res) => {
  const id = req.params.id;

  try {
    const portAgent = await PortAgent.findByPk(id);

    if (!portAgent) {
      return res.status(404).json({ message: 'Port Agent not found' });
    }

    portAgent.portAgentName = req.body.portAgentName;
    portAgent.contactPerson = req.body.contactPerson;
    portAgent.address = req.body.address;
    portAgent.phone = req.body.phone;
    portAgent.email = req.body.email;
    portAgent.city = req.body.city;
    portAgent.state = req.body.state;
    portAgent.country = req.body.country;

    await portAgent.save();

    const updatedPortAgent = await PortAgent.findByPk(id);

    res.status(200).json({
      message: 'Port Agent updated successfully',
      portAgent: updatedPortAgent,
    });
  } catch (error) {
    console.error('Error during Port Agent update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update_hospital = async (req, res) => {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findByPk(id);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    hospital.hospitalName = req.body.hospitalName;
    hospital.doctorName = req.body.doctorName;
    hospital.doctorAddress = req.body.doctorAddress;
    hospital.doctorCity = req.body.doctorCity;
    hospital.doctorState = req.body.doctorState;
    hospital.doctorPhone = req.body.doctorPhone;
    hospital.doctorEmail = req.body.doctorEmail;
    hospital.doctorUpload = req.body.doctorUpload;

    await hospital.save();

    const updatedHospital = await Hospital.findByPk(id);

    res.status(200).json({
      message: 'Hospital updated successfully',
      hospital: updatedHospital,
    });
  } catch (error) {
    console.error('Error during Hospital update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update_document = async (req, res) => {
  const id = req.params.id;

  try {
    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    document.documentType = req.body.documentType;
    document.hideExpiryDate = req.body.hideExpiryDate;

    await document.save();

    const updatedDocument = await Document.findByPk(id);

    res.status(200).json({
      message: 'Document updated successfully',
      document: updatedDocument,
    });
  } catch (error) {
    console.error('Error during Document update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const update_vendor = async (req, res) => {
  const id = req.params.id;

  try {
    const vendor = await Vendor.findByPk(id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.vendorName = req.body.vendorName;
    vendor.vendorAddress = req.body.vendorAddress;

    await vendor.save();

    const updatedVendor = await Vendor.findByPk(id);

    res.status(200).json({
      message: 'Vendor updated successfully',
      vendor: updatedVendor,
    });
  } catch (error) {
    console.error('Error during Vendor update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const view_country =  async (req, res) => {
  try {
      const countryCodes = await Country.findAll();
      res.json({ countryCodes });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const get_experience=async(req,res)=>{
    try {
        const experience = await Experience.findAll();
        res.json({ experience });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const create_crewPlanner = async (req, res) => {
  try {
    const {
      rank,
      client,
      vesselType,
      vesselName,
      cocAccepted,
      trading,
      wages,
      doj,
      otherInfo,
      status,
    } = req.body;

    // Create a new CrewPlanner entry
    const newCrewPlanner = await CrewPlanner.create({
      rank,
      client,
      vesselType,
      vesselName,
      cocAccepted,
      trading,
      wages,
      doj,
      otherInfo,
      status,
    });

    // Send the newly created CrewPlanner back as a response
    res.status(201).json(newCrewPlanner);
  } catch (error) {
    console.error('Error creating CrewPlanner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// File: crewPlannerController.js

const updateCrewPlanner = async (req, res) => {
  try {
      const crewPlannerId = req.params.id; // Assuming the CrewPlanner ID is passed as a route parameter
      const {
          rank,
          client,
          vesselType,
          vesselName,
          cocAccepted,
          trading,
          wages,
          doj,
          otherInfo,
          status,
      } = req.body;

      // Find the CrewPlanner entry by ID
      const crewPlanner = await CrewPlanner.findByPk(crewPlannerId);

      if (!crewPlanner) {
          return res.status(404).json({ error: 'CrewPlanner not found' });
      }

      // Update the CrewPlanner entry
      await crewPlanner.update({
          rank,
          client,
          vesselType,
          vesselName,
          cocAccepted,
          trading,
          wages,
          doj,
          otherInfo,
          status,
      });

      // Send the updated CrewPlanner back as a response
      res.status(200).json(crewPlanner);
  } catch (error) {
      console.error('Error updating CrewPlanner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const delete_crewPlanner = async (req, res) => {
  try {
    const crewPlannerId = req.params.id; // Assuming the CrewPlanner ID is passed as a route parameter

    // Find the CrewPlanner entry by ID
    const crewPlanner = await CrewPlanner.findByPk(crewPlannerId);

    if (!crewPlanner) {
      return res.status(404).json({ error: 'CrewPlanner not found' });
    }

    // Delete the CrewPlanner entry
    await crewPlanner.destroy();

    res.status(204).json(); // 204 No Content - Successful deletion
  } catch (error) {
    console.error('Error deleting CrewPlanner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const view_crewPlanner = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    let userGroup;
    const user = await User.findAll({ where: { id: userId } });

    if (user.length > 0) {
      userGroup = user[0].dataValues.userGroup;
      console.log('User Group:', userGroup);
    } else {
      console.log('User not found');
    }

    if (userGroup === 'admin') {
      const allCrewPlanners = await CrewPlanner.findAll();
      res.json({ crewplanners: allCrewPlanners });
    } else {
      // Find all crewplanners where UserId matches the authenticated user's ID
      // Adjust the condition and query based on your Sequelize model and database structure

      res.status(404).json({ message: "not an admin" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  module.exports = {
    create_vessel,
    create_VSL,
    create_exp,
    create_rank,
    create_grade,
    create_port,
    create_port_agent,
    create_hospital,
    create_document,
    create_vendor,
    view_vessel,
    view_VSL,
    view_experience,
    view_rank,
    view_grade,
    view_port,
    view_port_agent,
    view_hospital,
    view_document,
    view_vendor,
    delete_vessel,
    delete_VSL,
    delete_experience,
    delete_rank,
    delete_grade,
    delete_port,
    delete_port_agent,
    delete_hospital,
    delete_document,
    delete_vendor,
    update_vessel,
    update_VSL,
    update_experience,
    update_rank,
    update_grade,
    update_port,
    update_port_agent,
    update_hospital,
    update_document,
    update_vendor,
    view_country,
    create_crewPlanner,
    updateCrewPlanner,
    delete_crewPlanner,
    view_crewPlanner,
    get_experience
  }

  
