const Candidate = require("../models/candidate");
const CandidateNkd = require('../models/nkd');
const Medical= require('../models/medical') 
const Travel= require('../models/travel')
const Bank = require('../models/bank')
const Documents = require('../models/cdocument')
const Contract = require('../models/contract')
const Discussion_plus = require('../models/discussionplus')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            zone,
            group,
            vendor,
            password,
            nemo_source,
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
            const userId = req.user.id
            console.log(userId)
            
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
                group,
                vendor,
                password,
                nemo_source,
                userId:userId
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
       

        let includeModels = [];
        // Add include options for associated models
        includeModels = [
            { model: CandidateNkd },
            { model: Medical },
            { model: Travel },
            { model: Bank },
            { model: Documents },
            { model: Contract },
            { model: Discussion_plus },
            // Add other associated models as needed
        ];

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

                
            const allCandidates = await Candidate.findAll({
                include: includeModels,
            });
            res.status(200).json({ candidates: allCandidates, success: true });
        } else {
            // Find all candidates where vendor_id matches the authenticated user's ID
            const allCandidates = await Candidate.findAll({
                where: {
                    userId: userId,
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
        console.log(candidateId)

        // Destructure the data from the request body
        const {
            document,
            document_number,
            issue_date,
            issue_place,
            document_files,
            stcw
        } = req.body;

        // Validate required fields
        if (!validate(document) || !validate(document_number) || !validate(issue_date)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        // Create a new DocumentDetails entry
        await Documents.create({
            document: document,
            document_number: document_number,
            issue_date: issue_date,
            issue_place: issue_place,
            document_files: document_files,
            stcw: stcw,
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
            userId,
            userName,
            discussion_date,
            ntbr
        } = req.body;

        // Validate required fields
        // if (!rank || !vessel_type || !status) {
        //     return res.status(400).json({ message: 'Bad Parameters', success: false });
        // }

        // Create a new Discussion entry
        const discussionEntry = await Discussion.create({
            userId,
            userName,
            discussion_date,
            ntbr,
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

const get_contractdetails= async (req, res) => {
    try {
        const candidateId = req.params.id;
        console.log(':::::>>>>>',candidateId)
        const contractDetails = await Contract.findAll({
            where: { candidateId: candidateId }
        });

        res.status(200).json(contractDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const update_contractdetails = async (req, res) => {
    const contractId = req.params.id;
    const updatedContractData = req.body;
    console.log(updatedContractData)

    try {
        const contract = await Contract.findByPk(contractId);

        if (contract) {
            // Update fields
            contract.rank = updatedContractData.rank;
            contract.company = updatedContractData.company;
            contract.vslName = updatedContractData.vslName;
            contract.vesselType = updatedContractData.vesselType;
            contract.sign_on_port = updatedContractData.signOnPort;
            contract.sign_on = updatedContractData.signOnDate;
            contract.wage_start = updatedContractData.wagesStart;
            contract.eoc = updatedContractData.eoc;
            contract.wages = updatedContractData.wages;
            contract.currency = updatedContractData.currency;
            contract.wages_types = updatedContractData.wagesType;
            contract.sign_off_port = updatedContractData.signOffPort;
            contract.sign_off = updatedContractData.signOffDate;
            contract.reason_for_sign_off = updatedContractData.reasonForSignOff;
            contract.aoa_number = updatedContractData.aoaNum;
            contract.emigrate_number = updatedContractData.emigrateNumber;
            contract.documents = updatedContractData.documentFile; // Assuming 'documents' is a file path or something similar
            contract.aoa = updatedContractData.aoaFile; // Assuming 'aoa' is a file path or something similar

            // Save the changes
            await contract.save();

            res.json({ success: true, message: 'Contract updated successfully', updatedContract: contract });
        } else {
            res.status(404).json({ success: false, message: 'Contract not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating contract' });
    }
};




const get_documentdetails = async (req, res) => {
    try {
        const candidateId = req.params.id;
        console.log(':::::>>>>>', candidateId);
        
        // Assuming you have a Document model
        const documentDetails = await Documents.findAll({
            where: { candidateId: candidateId }
        });

        res.status(200).json(documentDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const get_BankDetails = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const bankDetails = await Bank.findAll({
            where: { candidateId: candidateId }
        });

        res.status(200).json(bankDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const update_BankDetails = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const updatedFields = req.body;

        // Find the bank record by candidateId
        const bank = await Bank.findOne({
            where: { id: candidateId },
        });

        // If the bank record exists, update the fields
        if (bank) {
            await bank.update(updatedFields);
            res.status(200).json({ message: 'Bank details updated successfully' });
        } else {
            res.status(404).json({ message: 'Bank record not found' });
        }
    } catch (err) {
        console.error('Error updating bank details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const get_TravelDetails = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const travelDetails = await Travel.findAll({
            where: { candidateId: candidateId }
        });

        res.status(200).json(travelDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};
const update_TravelDetails = async (req, res) => {
    try {
        const travelId = req.params.id;
        const updatedFields = req.body;

        // Find the travel record by travelId
        const travel = await Travel.findOne({
            where: { id: travelId },
        });

        // If the travel record exists, update the fields
        if (travel) {
            await travel.update(updatedFields);
            res.status(200).json({ message: 'Travel details updated successfully' });
        } else {
            res.status(404).json({ message: 'Travel record not found' });
        }
    } catch (err) {
        console.error('Error updating travel details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const get_HospitalDetails = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const hospitalDetails = await Medical.findAll({
            where: { candidateId: candidateId }
        });

        res.status(200).json(hospitalDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const get_NKDDetails = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const nkdDetails = await CandidateNkd.findAll({
            where: { candidateId: candidateId }
        });

        res.status(200).json(nkdDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Internal Server Error", success: false });
    }
};

const update_HospitalDetails = async (req, res) => {
    try {
        console.log('its working')
        const memId = req.params.id;
        const updatedFields = req.body;

        // Find the hospital record by memId
        const hospital = await Medical.findOne({
            where: { id: memId },
        });
        console.log(hospital)
        // If the hospital record exists, update the fields
        if (hospital) {
            await hospital.update(updatedFields);
            res.status(200).json({ message: 'Hospital details updated successfully' });
        } else {
            res.status(404).json({ message: 'Hospital record not found' });
        }
    } catch (err) {
        console.error('Error updating hospital details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const update_NKDDetails = async (req, res) => {
    try {
        const memId = req.params.id;
        const updatedFields = req.body;

        console.log('Received data:', updatedFields); // Log the received data

        // Find the NKD record by memId
        const nkdRecord = await CandidateNkd.findOne({
            where: { id: memId },
        });

        // If the NKD record exists, update the fields
        if (nkdRecord) {
            await nkdRecord.update(updatedFields);
            res.status(200).json({ message: 'NKD details updated successfully' });
        } else {
            res.status(404).json({ message: 'NKD record not found' });
        }
    } catch (err) {
        console.error('Error updating NKD details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const update_documentdetails = async (req, res) => {
    try {
        const documentId = req.params.id; // Assuming the documentId is used to identify the document record
        const updatedFields = req.body;

        console.log('Received data:', updatedFields); // Log the received data

        // Find the document record by documentId
        const documentRecord = await Documents.findOne({
            where: { id: documentId },
        });

        // If the document record exists, update the fields
        if (documentRecord) {
            await documentRecord.update(updatedFields);
            res.status(200).json({ message: 'Document details updated successfully' });
        } else {
            res.status(404).json({ message: 'Document record not found' });
        }
    } catch (err) {
        console.error('Error updating document details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const generateAccessToken = (id, indosNumber) => {
    return jwt.sign({ candidateId: id, indosNumber: indosNumber }, 'secretkey');
  };
  
  const login = async (req, res, next) => {
    try {
      const { indosNumber, email, password } = req.body;
  
      // Find the candidate with the provided indosNumber
      const candidate = await Candidate.findOne({ where: { indos_number: indosNumber, email1: email } });
  
      if (candidate) {
        // Compare the provided password with the stored hashed password in the database
        bcrypt.compare(password, candidate.password, (err, passwordMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
          }
  
          if (passwordMatch) {
            // Password is correct, generate JWT token
            const token = generateAccessToken(candidate.candidateId, candidate.indos_number);
            console.log(token);
            return res.status(200).json({
              success: true,
              message: 'Candidate Logged in Successfully',
              token: token,
              indosNumber: candidate.indos_number,
              candidateId: candidate.candidateId,
              // Include other candidate-related data as needed
            });
          } else {
            // Password is invalid
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid credentials' });
          }
        });
      } else {
        // Candidate does not exist
        return res.status(404).json({ success: false, message: 'Candidate not found' });
      }
    } catch (err) {
      console.error('Error during candidate login:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

  // candidateControllers.js

// ... (previous code)

const delete_NKD = async (req, res) => {
    const nkdId = req.params.id;

    try {
        // Implement logic to delete the NKD entry with the given ID
        // Example: await NKD.destroy({ where: { id: nkdId } });

        res.json({ success: true, message: 'NKD entry deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting NKD entry' });
    }
};

const delete_Hospital = async (req, res) => {
    // Similar implementation for deleting hospital details
};

const delete_Travel = async (req, res) => {
    // Similar implementation for deleting travel details
};

const delete_Bank = async (req, res) => {
    // Similar implementation for deleting bank details
};

const delete_Document = async (req, res) => {
    // Similar implementation for deleting document details
};

const delete_contract = async (req, res) => {
    // Similar implementation for deleting contract details
};

const delete_discussion = async (req, res) => {
    // Similar implementation for deleting discussion details
};

const delete_discussionplus = async (req, res) => {
    // Similar implementation for deleting discussion plus details
};

// ... (remaining code)

  

      


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
    
    get_contractdetails,
    get_documentdetails,
    get_BankDetails,
    
    get_TravelDetails,
    get_HospitalDetails,
    get_NKDDetails,
    update_contractdetails,
    update_BankDetails,
    update_TravelDetails,
    update_HospitalDetails,
    update_NKDDetails,
    update_documentdetails,
    login,
    delete_Travel,
    delete_Hospital,
    delete_NKD,
    delete_discussionplus,
    delete_discussion,
    delete_contract,
    delete_Document,
    delete_Bank

};
