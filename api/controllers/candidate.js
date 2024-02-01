const Candidate = require("../models/candidate");
const CandidateNkd = require('../models/nkd');
const Medical= require('../models/medical') 
const Travel= require('../models/travel')
const Bank = require('../models/bank')
const Documents = require('../models/cdocument')
const Contract = require('../models/contract')
const Discussion = require('../models/discussion')
const Discussion_plus = require('../models/discussionplus')
const User = require('../models/user')

const validate = (inputString) => inputString !== undefined && inputString.length !== 0;

const add_candidate = async (req, res) => {
    try {
        const {
            active_details,
            area_code1,
            area_code2,
            avb_date,
            birth_place,
            boiler_suit_size,
            category,
            company_status,
            createdby,
            cr_date,
            cr_time,
            c_ad1,
            c_ad2,
            c_city,
            c_mobi1,
            c_mobi2,
            c_pin,
            c_rank,
            c_state,
            c_tel1,
            c_tel2,
            c_vessel,
            dob,
            editedby,
            email1,
            email2,
            experience,
            fname,
            grade,
            height,
            imp_discussion,
            indos_number,
            ipaddress,
            joined_date,
            last_company,
            last_salary,
            las_date,
            las_time,
            lname,
            l_country,
            mobile_code1,
            mobile_code2,
            m_status,
            nationality,
            other_mobile_code,
            other_numbers,
            photos,
            p_ad1,
            p_ad2,
            p_city,
            p_country,
            p_mobi1,
            p_mobi2,
            p_pin,
            p_rank,
            p_state,
            p_tel1,
            p_tel2,
            ref_check,
            resume,
            resume_upload_date,
            safety_shoe_size,
            skype,
            stcw,
            vendor_id,
            weight,
            work_nautilus,
            zone
        } = req.body;

        // Validate required fields
        if (!validate(fname) || !validate(lname) || !validate(email1) || !validate(c_mobi1)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        // Check for existing data
        const existingCandidate = await Candidate.findOne({
            where: {
                email1: email1,
                // Add more conditions if needed for uniqueness
            }
        });

        if (existingCandidate) {
            return res.status(409).json({ message: "Duplicate Entry", success: false });
        }

        // If no duplicate, create a new entry
        try {
            
                        await Candidate.create({
                active_details,
                area_code1,
                area_code2,
                avb_date,
                birth_place,
                boiler_suit_size,
                category,
                company_status,
                createdby,
                cr_date,
                cr_time,
                c_ad1,
                c_ad2,
                c_city,
                c_mobi1,
                c_mobi2,
                c_pin,
                c_rank,
                c_state,
                c_tel1,
                c_tel2,
                c_vessel,
                dob,
                editedby,
                email1,
                email2,
                experience,
                fname,
                grade,
                height,
                imp_discussion,
                indos_number,
                ipaddress,
                joined_date,
                last_company,
                last_salary,
                las_date,
                las_time,
                lname,
                l_country,
                mobile_code1,
                mobile_code2,
                m_status,
                nationality,
                other_mobile_code,
                other_numbers,
                photos,
                p_ad1,
                p_ad2,
                p_city,
                p_country,
                p_mobi1,
                p_mobi2,
                p_pin,
                p_rank,
                p_state,
                p_tel1,
                p_tel2,
                ref_check,
                resume,
                resume_upload_date,
                safety_shoe_size,
                skype,
                stcw,
                vendor_id,
                weight,
                work_nautilus,
                zone,
            });
            res.status(201).json({ message: "Successfully Created New Candidate!", success: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err, message: "Internal Server Error", success: false });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
}
const getAllCandidates = async (req, res) => {
    try {
        const userId = req.user.id;

        let includeModels = [];
        // Add include options for associated models
        includeModels = [
            { model: CandidateNkd },
            { model: Medical },
            { model: Travel },
            { model: Bank },
            { model: Documents },
            { model: Contract },
            { model: Discussion },
            { model: Discussion_plus },
            // Add other associated models as needed
        ];

        if (userId === 2 || userId === 1) {
            const allCandidates = await Candidate.findAll({
                include: includeModels,
            });
            res.status(200).json({ candidates: allCandidates, success: true });
        } else {
            // Find all candidates where vendor_id matches the authenticated user's ID
            const allCandidates = await Candidate.findAll({
                where: {
                    candidateId: userId,
                },
                include: includeModels,
            });
            res.status(200).json({ candidates: allCandidates, success: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};


const get_candidate = async (req, res) => {
    try {
        const candidateId = req.params.id;

        // Fetch candidate data from the database based on the ID
        const candidate = await Candidate.findOne({
            where: { candidateId },
            include: [
                { model: CandidateNkd },
                { model: Medical },
                { model: Travel },
                { model: Bank },
                { model: Documents },
                { model: Contract },
                { model: Discussion },
                { model: Discussion_plus },
                // Add other associated models as needed
            ],
        });

        if (!candidate) {
            // If no candidate found with the specified ID, return a 404 response
            return res.status(404).json({ message: 'Candidate not found', success: false });
        }

        // Send the candidate data to the client side
        res.status(200).json({ candidate, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: 'Internal Server Error', success: false });
    }
};


const get_discussion = async (req, res) => {
    const candidateId = req.params.id;
    console.log("candidate ID :::: ", candidateId);

    try {
        if (!candidateId) {
            return res.status(400).json({ error: 'Candidate ID is missing in the request parameters.' });
        }

        const discussion = await Discussion.findAll({
            where: { candidateId },
        });

        res.json({ discussion });
    } catch (error) {
        console.error('Error fetching discussion details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    // ... (other functions remain unchanged)
    get_discussion,
};



const add_kindetails = async (req, res) => {
    try {
        const candidateId = req.params.id;


        // Destructure the data from the request body
        const {
            kin_name,
            kin_relation,
            kin_contact_number,
            kin_contact_address,
            kin_priority
        } = req.body;

        // Validate required fields
        if (!validate(kin_name) || !validate(kin_relation) || !validate(kin_contact_number)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        // Create a new NKD entry
        await CandidateNkd.create({
            kin_name,
            kin_relation,
            kin_contact_number,
            kin_contact_address,
            kin_priority,
            candidateId: candidateId // Assuming you have a foreign key 'user_id' in your CandidateNkd model
        });

        res.status(201).json({ message: "Successfully Created New NKD Entry!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const add_hospitaldetails = async (req, res) => {
    try {
        const candidateId = req.params.id;

        // Destructure the data from the request body
        const {
            hospitalName,
            place,
            date,
            expiry_date,
            done_by,
            status,
            amount,
            upload
        } = req.body;

        // Validate required fields
        if (!validate(hospitalName) || !validate(date) || !validate(done_by)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        // Create a new hospital entry
        await Medical.create({
            hospitalName,
            place,
            date,
            expiry_date,
            done_by,
            status,
            amount,
            upload,
            candidateId:candidateId
            // Assuming you have a foreign key 'user_id' in your HospitalDetails model
        });

        res.status(201).json({ message: "Successfully Created New Hospital Details Entry!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const add_traveldetails = async (req, res) => {
    try {
        const candidateId = req.params.id;


        // Destructure the data from the request body
        const {
            travel_date,
            travel_from,
            travel_to,
            travel_mode,
            travel_status,
            ticket_number,
            agent_name,
            portAgent,
            travel_amount
        } = req.body;

        // Validate required fields
        if (!validate(travel_date) || !validate(travel_from) || !validate(travel_to) || !validate(travel_mode)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        // Create a new travel entry
        await Travel.create({
      travel_date,
    travel_from,
          travel_to,
          travel_mode,
            travel_status,
    ticket_number,
      agent_name,
          portAgent,
    travel_amount,
            candidateId:candidateId // Assuming you have a foreign key 'user_id' in your Travel model
        });

        res.status(201).json({ message: "Successfully Created New Travel Details Entry!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const add_bankdetails = async (req, res) => {
    try {
        const candidateId = req.params.id;


        // Destructure data from the request body
        const {
            bankName,
            accountNumber,
            bankAddress,
            ifscCode,
            swiftCode,
            beneficiary,
            address,
            panNumber,
            // NRI Bank Details

            nriBankName,
            nriAccountNumber,
            nriBankAddress,
            nriIfscCode,
            nriSwiftCode,
            nriBeneficiary,
            nriAddress
        } = req.body;

        // Validate required fields
        if ( !bankName || !accountNumber || !bankAddress || !ifscCode || !swiftCode || !beneficiary || !address || !panNumber) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        // Create a new BankDetails entry
        const bankDetails = await Bank.create({
            bank_name:bankName,
            account_num:accountNumber,
            bank_addr:bankAddress,
            ifsc_code:ifscCode,
            swift_code:swiftCode,
            beneficiary,
            beneficiary_addr:address,
            pan_num:panNumber,
            // NRI Bank Details
            nri_bank_name:nriBankName,
            nri_account_num:nriAccountNumber,
            nri_bank_addr:nriBankAddress,
            nri_ifsc_code:nriIfscCode,
            nri_swift_code:nriSwiftCode,
            nri_beneficiary:nriBeneficiary,
            nri_beneficiary_addr:nriAddress,
            candidateId: candidateId // Assuming you have a foreign key 'user_id' in your BankDetails model
        });

        
        // Save the updated BankDetails entry
        await bankDetails.save();

        res.status(201).json({ message: "Successfully Created New Bank Details Entry!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};


const add_documentdetails = async (req, res) => {
    try {
        const candidateId = req.params.id;


        // Destructure the data from the request body
        const {
            documentValue,
            documentNumberValue,
            issueDateValue,
            issuePlaceValue,
            documentFilesValue
        } = req.body;

        // Validate required fields
        if (!validate(documentValue) || !validate(documentNumberValue) || !validate(issueDateValue)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        // Create a new DocumentDetails entry
        await Documents.create({
            document: documentValue,
            document_number: documentNumberValue,
            issue_date: issueDateValue,
            issue_place: issuePlaceValue,
            document_files: documentFilesValue,
            candidateId: candidateId // Assuming you have a foreign key 'user_id' in your DocumentDetails model
        });

        res.status(201).json({ message: "Successfully Created New Document Details Entry!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const add_contractdetails = async (req, res) => {
    try {
        // Extract user ID from the authenticated user
        const candidateId = req.params.id;

        // Extract data from the request body
        const {
            rank,
            company,
            vslName,
            vesselType,
            signOnPort,
            signOn,
            wageStart,
            eoc,
            wages,
            currency,
            wagesType,
            signOff,
            signOffPort,
            reasonForSignOff,
            documentFile,
            aoaNumber,
            emigrateNumber,
            aoaFile
        } = req.body;

        // Create a new ContractDetails entry
        const contractDetails = await Contract.create({
            rank,
            company,
            vslName,
            vesselType,
            sign_on_port:signOnPort,
            sign_on:signOn,
            wage_start:wageStart,
            eoc,
            wages,
            currency,
            wages_types:wagesType,
            sign_off:signOff,
            sign_off_port:signOffPort,
            reason_for_sign_off:reasonForSignOff,
            documents:documentFile,
            aoa:aoaFile,
            aoa_number:aoaNumber,
            emigrate_number:emigrateNumber,
            candidateId: candidateId // Assuming you have a foreign key 'user_id' in your ContractDetails model
        });

    
        // Save the updated ContractDetails entry
        await contractDetails.save();

        res.status(201).json({ message: "Successfully Created New Contract Details Entry!", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const add_discussiondetails= async (req, res) => {
    try {
        const candidateId = req.params.id;
        // Extract data from the request body
        const {
            special_comments,
            avb_date,
            last_salary,
            last_company,
            rank,
            vessel_type,
            status,
            userId,
            userName,
            discussion_date
        } = req.body;

        // Validate required fields
        if (!rank || !vessel_type || !status) {
            return res.status(400).json({ message: 'Bad Parameters', success: false });
        }

        // Create a new Discussion entry
        const discussionEntry = await Discussion.create({
            special_comments,
            avb_date,
            last_salary,
            last_company,
            rank,
            vessel_type,
            status,
            userId,
            userName,
            discussion_date,
            candidateId:candidateId
        });

        // Send a success response
        res.status(201).json({ message: 'Successfully Created New Discussion Entry!', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: 'Internal Server Error', success: false });
    }
};


const add_discussionplusdetails=async (req, res) => {
    try {
        const candidateId = req.params.id;

        // Extract data from the request body
        const {
            proposed,
            approved,
            joined,
            rejected,
            set_reminder,
            special_comments,
            ref_check
        } = req.body;

        // Create a new Discussion_plus entry
        const discussionPlusEntry = await Discussion_plus.create({
            proposed,
            approved,
            joined,
            rejected,
            set_reminder,
            special_comments,
            ref_check,
            candidateId:candidateId
        });

        // Send a success response
        res.status(201).json({ message: 'Successfully Created New Discussion_plus Entry!', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: 'Internal Server Error', success: false });
    }
};

const edit_candidate=  async (req, res) => {
    const candidateId = req.params.id;
    const candidateDetails = req.body;

    try {
        const [updatedRows] = await Candidate.update(candidateDetails, {
            where: { candidateId: candidateId },
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const updatedCandidate = await Candidate.findOne({ where: { candidateId: candidateId } });

        res.json(updatedCandidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
  
const delete_candidate=async (req, res) => {
    const candidateId = req.params.id;
    console.log('>>>>',candidateId)
    try {
        // Assuming you have a Sequelize model named Candidate
        const deletedCandidate = await Candidate.destroy({
            where: { candidateId: candidateId },
        });

        if (deletedCandidate === 0) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    add_candidate,
    getAllCandidates,
    add_kindetails,
    add_hospitaldetails,
    add_traveldetails,
    add_bankdetails,
    add_documentdetails,
    add_contractdetails,
    add_discussiondetails,
    add_discussionplusdetails,
    get_candidate,
    edit_candidate,
    delete_candidate,
    get_discussion
};
