const Company = require("../models/company");
const User = require('../models/user')


function validate(inputString) {
    return inputString !== undefined && inputString.length !== 0;
}

const add_company = async (req, res) => {
    try {
        
        const {
            c_name,
            b_type,
            c_contact,
            c_email,
            c_addr,
            c_mgmt,
            c_ph,
            c_last_update
        } = req.body;

        if (!validate(c_name) || !validate(b_type) || !validate(c_contact) || !validate(c_email) || !validate(c_addr) || !validate(c_mgmt) || !validate(c_ph) || !validate(c_last_update)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        console.log(c_name, b_type, c_contact, c_email, c_addr, c_mgmt, c_ph, c_last_update);

        // Check for existing data
        const existingCompany = await Company.findOne({
            where: {
                company_name: c_name,
                // Add more conditions if needed for uniqueness
            }
        });

        if (existingCompany) {
            return res.status(409).json({ message: "Duplicate Entry", success: false });
        }

        // If no duplicate, create a new entry
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

                
            const newCompany = await Company.create({
                address: c_addr,
                b_type: b_type,
                company_name: c_name,
                contact_person: c_contact,
                email: c_email,
                last_update: c_last_update,
                management: c_mgmt,
                phone: c_ph,

            });
            res.status(201).json({ message: "Successfully Created New Company!", success: true });
            }
            else{
                res.status(404).json({message:"Not an Admin",success:false})
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err, message: "Internal Server Error", success: false });
        }
    }
    

     catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

// const getAllCompany = async (req, res) => {
//     try {
//         // Get the user ID from the authenticated user (assuming it's stored in req.user.id)
//         const userId = req.user.id;
//             console.log(userId)
//             let userGroup;
//             const user = await User.findAll({ where: { id: userId } });
//             if (user.length > 0) {
//                  userGroup = user[0].dataValues.userGroup;
//                 console.log('User Group:', userGroup);
//             } else {
//                 console.log('User not found');
//             }
//                 if(userGroup === 'admin')
//                 {
//             const allCompanies=await Company.findAll()
//             res.status(200).json({ company: allCompanies, success: true });

//         }else{
//         // Find all companies where UserId matches the authenticated user's ID
//         const allCompanies = await Company.findAll({
//             where: {
//                 company_id: userId
//             }
//         });

//         res.status(200).json({ company: allCompanies, success: true });
//     }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err, message: "Internal Server Error", success: false });
//     }
// };

const getAllCompany = async (req, res) => {
    try {
        // Get the user ID from the authenticated user (assuming it's stored in req.user.id)
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
        let page = parseInt(req.query.page) || 1; // Get the page from query parameters, default to 1
        let limit = parseInt(req.query.limit) || 10; // Get the limit from query parameters, default to 10

        // Calculate the offset based on the page and limit
        let offset = (page - 1) * limit;

        if (userGroup === 'admin') {
            // For admin, fetch all companies with pagination
            const result = await Company.findAndCountAll({
                offset,
                limit,
            });

            res.status(200).json({
                company: result.rows,
                totalCount: result.count,
                totalPages: Math.ceil(result.count / limit),
                currentPage: page,
                success: true,
            });
        } else {
            // For other users, fetch companies where UserId matches the authenticated user's ID with pagination
            const result = await Company.findAndCountAll({
                where: {
                    company_id: userId
                },
                offset,
                limit,
            });

            res.status(200).json({
                company: result.rows,
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


// const paginated_company=async (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     const offset = (page - 1) * limit;

//     try {
//         const companies = await Company.findAll({
//             limit: +limit,
//             offset: +offset,
//         });

//         res.json({ company: companies });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// const total_pages=async(req,res)=>{ 
//     const pageSize = 10; // Assuming 10 companies per page
// const totalPages = Math.ceil(companies.length / pageSize);
// res.json({ totalPages });
// }



const delete_company= async (req, res) => {
    const companyId = req.params.id;

    try {
        // Delete company with the specified company_id (companyId)
        // Replace the following line with your database deletion logic
        const deletedCompany = await Company.destroy({ where: { company_id: companyId } });

        // Check if the company was deleted
        // Adjust the condition based on your Sequelize delete operation
        if (deletedCompany > 0) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ error: 'Company not found', success: false });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
};


// Update a company by ID
const update_company = async (req, res) => {
    const companyId = req.params.id;

    try {
        // Find the company by ID
        const company = await Company.findByPk(companyId);

        // If the company does not exist, return a 404 response
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Update the company fields with the new data
        company.company_name = req.body.c_name;
        company.b_type = req.body.b_type;
        company.contact_person = req.body.c_contact;
        company.email = req.body.c_email;
        company.address = req.body.c_addr;
        company.management = req.body.c_mgmt;
        company.phone = req.body.c_ph;
        company.last_update = req.body.c_last_update;

        // Save the updated company
        await company.save();

        // Fetch the updated company after saving changes
        const updatedCompany = await Company.findByPk(companyId);

        res.status(200).json({
            message: 'Company updated successfully',
            company: updatedCompany
        });
    } catch (error) {
        console.error('Error during company update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


  



module.exports = {
    add_company,
    getAllCompany,
    delete_company,
    update_company,
    // paginated_company,
    // total_pages
    // checkCompanyAssociations
};
