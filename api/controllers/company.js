const Company = require("../models/company");

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
            await Company.create({
                address: c_addr,
                b_type: b_type,
                company_name: c_name,
                contact_person: c_contact,
                email: c_email,
                last_update: c_last_update,
                management: c_mgmt,
                phone: c_ph
            });
            res.status(201).json({ message: "Successfully Created New Company!", success: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err, message: "Internal Server Error", success: false });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const getAllCompany = async (req, res) => {
    try {
        const allCompanies = await Company.findAll();
        // console.log(allCompanies);
        res.status(200).json({ company: allCompanies, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};


module.exports = {
    add_company,
    getAllCompany
};
