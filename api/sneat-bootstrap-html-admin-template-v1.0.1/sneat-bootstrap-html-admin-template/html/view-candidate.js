const token = localStorage.getItem('token')

// function loadContent(section) {
//     // Replace the content dynamically based on the section
//     const contentContainer = document.getElementById('contentContainer');

//     switch (section) {
//         case 'personnel':
//             contentContainer.innerHTML = '<p>Personnel Information</p>';
//             break;
//         case 'discussion':
//             contentContainer.innerHTML = '<p>Discussion Information</p>';
//             break;
//         case 'contract':
//             contentContainer.innerHTML = '<p>Contract Information</p>';
//             break;
//         case 'document':
//             contentContainer.innerHTML = '<p>Document Information</p>';
//             break;
//         case 'bank':
//             contentContainer.innerHTML = '<p>Bank Information</p>';
//             break;
//         case 'travel':
//             contentContainer.innerHTML = '<p>Travel Information</p>';
//             break;
//         case 'medical':
//             contentContainer.innerHTML = '<p>Medical Information</p>';
//             break;
//         case 'nkd':
//             contentContainer.innerHTML = '<p>NKD Information</p>';
//             break;
//         default:
//             contentContainer.innerHTML = '<p>No Information Available</p>';
//     }
// }
function formatDate(dateString) {
    // Assuming dateString is in the format "YYYY-MM-DD HH:mm:ss"
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
function loadContent(section) {
    // Hide all content divs
    document.getElementById('personnelContent').style.display = 'none';
    document.getElementById('discussionContent').style.display = 'none';
    document.getElementById('contractContent').style.display = 'none';
    document.getElementById('documentContent').style.display = 'none';
    document.getElementById('bankContent').style.display = 'none';
    document.getElementById('travelContent').style.display = 'none';
    document.getElementById('medicalContent').style.display = 'none';
    document.getElementById('nkdContent').style.display = 'none';

    // Show the selected content div
    document.getElementById(`${section}Content`).style.display = 'block';
}





async function displayContract() {
    try {
        const id = localStorage.getItem('memId')
        const response = await axios.get(`http://localhost:3000/candidate/get-contract-details/${id}`, {
            headers: { "Authorization": token }
        });
        const contract = response.data[0]; // Assuming the response is an array with a single contract object
        console.log(contract);

        document.getElementById('contractId').value = contract.id;
        document.getElementById('editcontract_rank').value = contract.rank;
        document.getElementById('editcontract_company').value = contract.company;
        document.getElementById('editcontract_vsl').value = contract.vslName;
        document.getElementById('editcontract_vesseltype').value = contract.vesselType;
        document.getElementById('editcontract_signonport').value = contract.sign_on_port;
        document.getElementById('editcontract_signon').value = formatDate(contract.sign_on);
        document.getElementById('editcontract_wage_start').value = formatDate(contract.wage_start);
        document.getElementById('editcontract_eoc').value = formatDate(contract.eoc);
        document.getElementById('editcontract_wages').value = contract.wages;
        document.getElementById('editcontract_currency').value = contract.currency;
        document.getElementById('editcontract_wagestype').value = contract.wages_types;
        document.getElementById('editcontract_signoff').value = formatDate(contract.sign_off);
        document.getElementById('editcontract_signoffport').value = contract.sign_off_port;
        document.getElementById('editcontracts_reason').value = contract.reason_for_sign_off;
        document.getElementById('editcontract_aoa_num').value = contract.aoa_number;
        document.getElementById('editcontract_emigrate').value = contract.emigrate_number;
    } catch (error) {
        console.error('Error displaying contract details:', error);
    }
}



async function displayDocument() {
    try {
        // Assuming you have the documentId stored in a variable, replace 'YOUR_DOCUMENT_ID' with the actual variable
        const documentId = localStorage.getItem('memId');
        
        // Fetch document data based on the document ID
        const response = await axios.get(`http://localhost:3000/candidate/get-document-details/${documentId}`, {
            headers: { "Authorization": token }
        });
        const documents = response.data[0]; // Assuming the response is an array with a single document object
        console.log(documents);

        // Assuming formatDate is defined as mentioned in previous messages
        document.getElementById('doc_id').value = documents.id;
        document.getElementById('documents').value = documents.document;
        document.getElementById('document_number').value = documents.document_number;
        document.getElementById('issue_date').value = formatDate(documents.issue_date);
        document.getElementById('issue_place').value = documents.issue_place;
        document.getElementById('document_files').value = documents.document_files;
        document.getElementById('stcw').value = documents.stcw;
        console.log(documents.id,documents.document,documents.document_number,formatDate(documents.issue_date), documents.issue_place,documents.document_files,documents.stcw)

    } catch (error) {
        console.error('Error displaying document details:', error);
    }
}


async function displayBank() {
    try {
        // Assuming you have the candidateId stored in a variable, replace 'YOUR_CANDIDATE_ID' with the actual variable
        const candidateId = localStorage.getItem('memId');
        
        // Fetch bank data based on the candidate ID
        const response = await axios.get(`http://localhost:3000/candidate/get-bank-details/${candidateId}`, {
            headers: { "Authorization": token }
        });
        const bank = response.data[0]; // Assuming the response is an array with a single bank object
        console.log(bank);

        document.getElementById('bank_id').value = bank.id;
        document.getElementById('bank_name').value = bank.bank_name;
        document.getElementById('account_num').value = bank.account_num;
        document.getElementById('bank_addr').value = bank.bank_addr;
        document.getElementById('ifsc_code').value = bank.ifsc_code;
        document.getElementById('swift_code').value = bank.swift_code;
        document.getElementById('beneficiary').value = bank.beneficiary;
        document.getElementById('beneficiary_addr').value = bank.beneficiary_addr;
        document.getElementById('pan_num').value = bank.pan_num;
        // document.getElementById('passbook').value = bank.passbook || null;
        // document.getElementById('pan_card').value = bank.pan_card || null;
        document.getElementById('nri_bank_name').value = bank.nri_bank_name;
        document.getElementById('nri_account_num').value = bank.nri_account_num;
        document.getElementById('nri_bank_addr').value = bank.nri_bank_addr;
        document.getElementById('nri_ifsc_code').value = bank.nri_ifsc_code;
        document.getElementById('nri_swift_code').value = bank.nri_swift_code;
        document.getElementById('nri_beneficiary').value = bank.nri_beneficiary;
        document.getElementById('nri_beneficiary_addr').value = bank.nri_beneficiary_addr;
        // document.getElementById('nri_passbook').value = bank.nri_passbook;

    } catch (error) {
        console.error('Error displaying bank details:', error);
    }
}



async function displayTravel() {
    try {
        // Assuming you have the candidateId stored in localStorage with the key 'memId'
        const candidateId = localStorage.getItem('memId');

        // Fetch travel data based on the candidate ID
        const response = await axios.get(`http://localhost:3000/candidate/get-travel-details/${candidateId}`, {
            headers: { "Authorization": token }
        });
        const travel = response.data[0]; // Assuming the response is an array with a single travel object
        console.log(travel);

        document.getElementById('travel_id').value = travel.id;
        document.getElementById('travel_date').value = formatDate(travel.travel_date);
        document.getElementById('travel_from').value = travel.travel_from;
        document.getElementById('travel_to').value = travel.travel_to;
        document.getElementById('travel_mode').value = travel.travel_mode;
        document.getElementById('travel_status').value = travel.travel_status;
        document.getElementById('travel_ticket').value = travel.ticket_number;
        document.getElementById('travel_agent_name').value = travel.agent_name;
        document.getElementById('travel_port_agent').value = travel.portAgent;
        document.getElementById('travel_amount').value = travel.travel_amount;
    }
    catch(err)
    {
        console.log(err)
    }
}



async function displayMedical() {
    try {
        // Assuming you have the candidateId stored in localStorage with the key 'memId'
        const candidateId = localStorage.getItem('memId');

        // Fetch medical data based on the candidate ID
        const response = await axios.get(`http://localhost:3000/candidate/get-hospital-details/${candidateId}`, {
            headers: { "Authorization": token }
        });
        const medical = response.data[0]; // Assuming the response is an array with a single medical object
        console.log(medical);

        document.getElementById('med_id').value = medical.id;
        document.getElementById('hospital_name').value = medical.hospitalName;
        document.getElementById('hospital_place').value = medical.place;
        document.getElementById('hospital_date').value = formatDate(medical.date);
        document.getElementById('hospital_exp_date').value = formatDate(medical.expiry_date);
        document.getElementById('hospital_done').value = medical.done_by;
        document.getElementById('hospital_status').value = medical.status;
        document.getElementById('hospital_amount').value = medical.amount;

    } catch (error) {
        console.error('Error displaying medical details:', error);
    }
}




async function displayNKDDetails() {
    try {
        // Assuming you have the candidateId stored in localStorage with the key 'memId'
        const candidateId = localStorage.getItem('memId');

        // Fetch NKD details based on the candidate ID
        const response = await axios.get(`http://localhost:3000/candidate/get-nkd-details/${candidateId}`, {
            headers: { "Authorization": token }
        });
        const nkdDetails = response.data[0]; // Assuming the response is an array with a single NKD object
        console.log(nkdDetails);

        document.getElementById('nkd_id').value = nkdDetails.id;
        document.getElementById('nkd_kin_name').value = nkdDetails.kin_name;
        document.getElementById('nkd_kin_relationship').value = nkdDetails.kin_relation;
        document.getElementById('nkd_kin_contact').value = nkdDetails.kin_contact_number;
        document.getElementById('nkd_contact_address').value = nkdDetails.kin_contact_address;
        document.getElementById('priority').value = nkdDetails.kin_priority;

    } catch (error) {
        console.error('Error displaying NKD details:', error);
    }
}


   





function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
const decodedToken = decodeToken(token);

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const candidateId = localStorage.getItem('memId');

        await displayCandidateDetails();
        await displayContract();
        await displayDocument();
        await displayBank();
        await displayTravel();
        await displayMedical();
        await displayNKDDetails();
 const hasUserManagement = decodedToken.userManagement;
    console.log(hasUserManagement)
    if (hasUserManagement) {
      document.getElementById('userManagementSection').style.display = 'block';
      document.getElementById('userManagementSections').style.display = 'block';

    }
        // You can call loadContent function here if needed
        // loadContent('personnel'); // Example: Load personnel information by default

async function displayCandidateDetails() {
    try {
        // Fetch candidate data based on the candidate ID
        const id = localStorage.getItem('memId')
        const response = await axios.get(`http://localhost:3000/candidate/get-candidate/${id}`,{headers:{"Authorization":token}});
        const candidateData = response.data.candidate;
        document.getElementById('candidateId').value = candidateData.candidateId;
        document.getElementById('edit_candidate_c_rank').value = candidateData.c_rank;
        document.getElementById('edit_candidate_nationality').value = candidateData.nationality;
        document.getElementById('edit_candidate_c_vessel').value = candidateData.c_vessel;
        document.getElementById('edit_candidate_experience').value = candidateData.experience;
        document.getElementById('edit_candidate_grade').value = candidateData.grade;
        document.getElementById('edit_candidate_I_country').value = candidateData.l_country;
       
        document.getElementById('edit_candidate_fname').value = candidateData.fname;
        document.getElementById('edit_candidate_lname').value = candidateData.lname;
        document.getElementById('edit_candidate_avb_date').value = formatDate(candidateData.avb_date);
        document.getElementById('edit_candidate_dob').value = formatDate(candidateData.dob);  
        document.getElementById('edit_candidate_company_status').value = candidateData.company_status;
        document.getElementById('edit_candidate_birth_place').value = candidateData.birth_place;
        document.getElementById('edit_candidate_work_nautilus').value = candidateData.work_nautilus;
        document.getElementById('edit_candidate_experience').value = candidateData.experience;
        document.getElementById('edit_candidate_zone').value = candidateData.zone;
        
        document.getElementById('edit_candidate_boiler_suit_size').value = candidateData.boiler_suit_size;
        document.getElementById('edit_candidate_safety_shoe_size').value = candidateData.safety_shoe_size;
        document.getElementById('edit_candidate_height').value = candidateData.height;
        document.getElementById('edit_candidate_weight').value = candidateData.weight;
        document.getElementById('edit_candidate_I_country').value = candidateData.l_country;
        document.getElementById('edit_candidate_indos_number').value = candidateData.indos_number;
        document.getElementById('edit_company_status').value = candidateData.m_status;
        document.getElementById('edit_candidate_group').value = candidateData.group;
        document.getElementById('edit_candidate_vendor').value = candidateData.vendor;

        document.getElementById('edit_candidate_c_ad1').value = candidateData.c_ad1;
        document.getElementById('edit_candidate_city').value = candidateData.c_city;
        document.getElementById('edit_candidate_c_state').value = candidateData.c_state;
        document.getElementById('edit_candidate_pin').value = candidateData.c_pin;
        document.getElementById('edit_candidate_c_mobi1').value = candidateData.c_mobi1;
        document.getElementById('edit_candidate_email1').value = candidateData.email1;
        document.getElementById('edit_candidate_c_tel1').value = candidateData.c_tel1;
        document.getElementById('edit_candidate_c_ad2').value = candidateData.c_ad2;
        document.getElementById('edit_candidate_p_city').value = candidateData.p_city;
        document.getElementById('edit_candidate_p_state').value = candidateData.p_state;
        document.getElementById('edit_candidate_p_pin').value = candidateData.p_pin;
        document.getElementById('edit_candidate_c_mobi2').value = candidateData.c_mobi2;
        document.getElementById('edit_candidate_c_tel2').value = candidateData.c_tel2;
        document.getElementById('edit_candidate_email2').value = candidateData.email2;

        // Hidden fields
    } catch (error) {
        console.error('Error displaying candidate details:', error);
    }
}

    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
});

async function editCandidate() {
    // Get values from the form
    var id = document.getElementById('candidateId').value; // Add the ID value if applicable
    var fname = document.getElementById('edit_candidate_fname').value;
    var lname = document.getElementById('edit_candidate_lname').value;
    var rank = document.getElementById('edit_candidate_c_rank').value;
    var avbDate = document.getElementById('edit_candidate_avb_date').value;
    var nationality = document.getElementById('edit_candidate_nationality').value;
    var maritalStatus = document.getElementById('edit_company_status').value;
    var dob = document.getElementById('edit_candidate_dob').value;
    var birthPlace = document.getElementById('edit_candidate_birth_place').value;
    var workNautilus = document.getElementById('edit_candidate_work_nautilus').value;
    var vesselType = document.getElementById('edit_candidate_c_vessel').value;
    var experience = document.getElementById('edit_candidate_experience').value;
    var zone = document.getElementById('edit_candidate_zone').value;
    var grade = document.getElementById('edit_candidate_grade').value;
    var boilerSuitSize = document.getElementById('edit_candidate_boiler_suit_size').value;
    var safetyShoeSize = document.getElementById('edit_candidate_safety_shoe_size').value;
    var height = document.getElementById('edit_candidate_height').value;
    var weight = document.getElementById('edit_candidate_weight').value;
    var licenseCountry = document.getElementById('edit_candidate_I_country').value;
    var indosNumber = document.getElementById('edit_candidate_indos_number').value;
    var candidateStatus = document.getElementById('edit_candidate_company_status').value;
    var group = document.getElementById('edit_candidate_group').value;
    var vendor = document.getElementById('edit_candidate_vendor').value;
    var photo = document.getElementById('edit_candidate_photos').value; // Assuming this is a file input, consider handling file uploads appropriately
    var resume = document.getElementById('edit_candidate_resume').value; // Assuming this is a file input, consider handling file uploads appropriately
    var address1 = document.getElementById('edit_candidate_c_ad1').value;
    var address2 = document.getElementById('edit_candidate_c_ad2').value;
    var city = document.getElementById('edit_candidate_city').value;
    var state = document.getElementById('edit_candidate_c_state').value;
    var permanentCity = document.getElementById('edit_candidate_p_city').value;
    var permanentState = document.getElementById('edit_candidate_p_state').value;
    var pincode = document.getElementById('edit_candidate_pin').value;
    var permanentPincode = document.getElementById('edit_candidate_p_pin').value;
    var mobile1 = document.getElementById('edit_candidate_c_mobi1').value;
    var mobile2 = document.getElementById('edit_candidate_c_mobi2').value;
    var landline1 = document.getElementById('edit_candidate_c_tel1').value;
    var landline2 = document.getElementById('edit_candidate_c_tel2').value;
    var email1 = document.getElementById('edit_candidate_email1').value;
    var email2 = document.getElementById('edit_candidate_email2').value;

    // Construct the URL with the values
    var url = `edit-candidate-2.html?memId=${id}&fname=${fname}&lname=${lname}&rank=${rank}&avbDate=${avbDate}&nationality=${nationality}&maritalStatus=${maritalStatus}&dob=${dob}&birthPlace=${birthPlace}&workNautilus=${workNautilus}&vesselType=${vesselType}&experience=${experience}&zone=${zone}&grade=${grade}&boilerSuitSize=${boilerSuitSize}&safetyShoeSize=${safetyShoeSize}&height=${height}&weight=${weight}&licenseCountry=${licenseCountry}&indosNumber=${indosNumber}&candidateStatus=${candidateStatus}&group=${group}&vendor=${vendor}&photo=${photo}&resume=${resume}&address1=${address1}&address2=${address2}&city=${city}&state=${state}&permanentCity=${permanentCity}&permanentState=${permanentState}&pincode=${pincode}&permanentPincode=${permanentPincode}&mobile1=${mobile1}&mobile2=${mobile2}&landline1=${landline1}&landline2=${landline2}&email1=${email1}&email2=${email2}`;

    // Redirect to the edit-candidate-2.html page
    window.location.href = url;
}

// Add an event listener to the form submission
document.getElementById('view-candidate-form').addEventListener('submit', function(event) {
    event.preventDefault();
    editCandidate();
});

function editContract() {
    var id = document.getElementById('contractId').value; // assuming this field is hidden and contains the contract ID
var ranks_contract = document.getElementById('editcontract_rank').value;
var company = document.getElementById('editcontract_company').value;
var vslName = document.getElementById('editcontract_vsl').value;
var vesselType = document.getElementById('editcontract_vesseltype').value;
var sign_on_port = document.getElementById('editcontract_signonport').value;
var sign_on = document.getElementById('editcontract_signon').value;
var wage_start = document.getElementById('editcontract_wage_start').value;
var eoc = document.getElementById('editcontract_eoc').value;
var wages = document.getElementById('editcontract_wages').value;
var currency = document.getElementById('editcontract_currency').value;
var wages_types = document.getElementById('editcontract_wagestype').value;
var sign_off = document.getElementById('editcontract_signoff').value;
var sign_off_port = document.getElementById('editcontract_signoffport').value;
var reason_for_sign_off = document.getElementById('editcontracts_reason').value;
var documents = document.getElementById('editcontract_document').value; // Assuming this is a file input
var aoa = document.getElementById('editcontract_aoa').value; // Assuming this is a file input
var aoa_number = document.getElementById('editcontract_aoa_num').value;
var emigrate_number = document.getElementById('editcontract_emigrate').value;


    // Construct the URL with the values
    var url = `edit-c-contract.html?id=${id}&rank=${ranks_contract}&company=${company}&vslName=${vslName}&vesselType=${vesselType}&sign_on_port=${sign_on_port}&sign_on=${sign_on}&wage_start=${wage_start}&eoc=${eoc}&wages=${wages}&currency=${currency}&wages_types=${wages_types}&sign_off=${sign_off}&sign_off_port=${sign_off_port}&reason_for_sign_off=${reason_for_sign_off}&aoa_number=${aoa_number}&emigrate_number=${emigrate_number}&documents=${documents}&aoa=${aoa}`;

    console.log(url)
    // Redirect to the edit-contract-2.html page
    window.location.href = url;
}

// Add an event listener to the form submission
document.getElementById('contractForm').addEventListener('submit', function(event) {
    event.preventDefault();
    editContract();
});



  // Add an event listener to the edit button
  document.getElementById('editdocForm').addEventListener('submit', async function handleEditButtonClick(e) {
    // Get the values from the input fields
    e.preventDefault();
    try{
    const documentId = document.getElementById('doc_id').value;
    const documents = document.getElementById('documents').value;
    const documentNumber = document.getElementById('document_number').value;
    const issueDate = document.getElementById('issue_date').value;
    const issuePlace = document.getElementById('issue_place').value;
    const documentFiles = document.getElementById('document_files').value;
    const stcw = document.getElementById('stcw').value;

    console.log(documentId,documents,documentNumber,issueDate,issuePlace,documentFiles,stcw)
    // Redirect to edit-c-document.html with query parameters
    const url = `edit-c-document.html?documentId=${documentId}&documents=${documents}&documentNumber=${documentNumber}&issueDate=${issueDate}&issuePlace=${issuePlace}&documentFiles=${documentFiles}&stcw=${stcw}`; 
        window.location.href=url;
}

  catch(err){
    console.log(err)
  }
});



document.getElementById('bankForm').addEventListener('submit',async function sendBankDataAndRedirect(e) {
e.preventDefault();
    const id = document.getElementById('bank_id').value;
    const bank_name = document.getElementById('bank_name').value;
    const account_num = document.getElementById('account_num').value;
    const bank_addr = document.getElementById('bank_addr').value;
    const ifsc_code = document.getElementById('ifsc_code').value;
    const swift_code = document.getElementById('swift_code').value;
    const beneficiary = document.getElementById('beneficiary').value;
    const beneficiary_addr = document.getElementById('beneficiary_addr').value;
    const pan_num = document.getElementById('pan_num').value;
    const passbook = document.getElementById('passbook').value;
    const pan_card = document.getElementById('pan_card').value;

    const nri_bank_name = document.getElementById('nri_bank_name').value;
    const nri_account_num = document.getElementById('nri_account_num').value;
    const nri_bank_addr = document.getElementById('nri_bank_addr').value;
    const nri_ifsc_code = document.getElementById('nri_ifsc_code').value;
    const nri_swift_code = document.getElementById('nri_swift_code').value;
    const nri_beneficiary = document.getElementById('nri_beneficiary').value;
    const nri_beneficiary_addr = document.getElementById('nri_beneficiary_addr').value;
    const nri_passbook = document.getElementById('nri_passbook').value;

    // Construct the URL with query parameters
    var url = `edit-c-bank.html?id=${id}&bank_name=${bank_name}&account_num=${account_num}&bank_addr=${bank_addr}&ifsc_code=${ifsc_code}&swift_code=${swift_code}&beneficiary=${beneficiary}&beneficiary_addr=${beneficiary_addr}&pan_num=${pan_num}&passbook=${passbook}&pan_card=${pan_card}&nri_bank_name=${nri_bank_name}&nri_account_num=${nri_account_num}&nri_bank_addr=${nri_bank_addr}&nri_ifsc_code=${nri_ifsc_code}&nri_swift_code=${nri_swift_code}&nri_beneficiary=${nri_beneficiary}&nri_beneficiary_addr=${nri_beneficiary_addr}&nri_passbook=${nri_passbook}`;
    // Redirect to the edit-c-bank.html page
    window.location.href = url;
})

document.getElementById('travelForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect form data
    const travel_id = document.getElementById('travel_id').value;
    const travel_date = document.getElementById('travel_date').value;
    const travel_from = document.getElementById('travel_from').value;
    const travel_to = document.getElementById('travel_to').value;
    const travel_mode = document.getElementById('travel_mode').value;
    const travel_status = document.getElementById('travel_status').value;
    const travel_ticket = document.getElementById('travel_ticket').value;
    const travel_agent_name = document.getElementById('travel_agent_name').value;
    const travel_port_agent = document.getElementById('travel_port_agent').value;
    const travel_amount = document.getElementById('travel_amount').value;

    // Construct the URL with query parameters
    var url = `edit-c-travel.html?id=${travel_id}&travel_date=${travel_date}&travel_from=${travel_from}&travel_to=${travel_to}&travel_mode=${travel_mode}&travel_status=${travel_status}&ticket_number=${travel_ticket}&agent_name=${travel_agent_name}&portAgent=${travel_port_agent}&travel_amount=${travel_amount}`;

    // Redirect to the edit-c-travel.html page
    window.location.href = url;
});

document.getElementById('updateForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const med_id = document.getElementById('med_id').value;
    const hospital_name = document.getElementById('hospital_name').value;
    const hospital_place = document.getElementById('hospital_place').value;
    const hospital_date = document.getElementById('hospital_date').value;
    const hospital_exp_date = document.getElementById('hospital_exp_date').value;
    const hospital_done = document.getElementById('hospital_done').value;
    const hospital_status = document.getElementById('hospital_status').value;
    const hospital_amount = document.getElementById('hospital_amount').value;
    const hospital_upload = document.getElementById('hospital_upload').value;

    // Construct the URL with query parameters
    var url = `edit-c-medicals.html?id=${med_id}&hospitalName=${hospital_name}&place=${hospital_place}&date=${hospital_date}&expiry_date=${hospital_exp_date}&done_by=${hospital_done}&status=${hospital_status}&amount=${hospital_amount}&upload=${hospital_upload}`;

    // Redirect to the edit-medical.html page
    window.location.href = url;
});


document.getElementById('edit_nkd_form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    // Collect form data
const nkd_id = document.getElementById('nkd_id').value;
const nkd_kin_name = document.getElementById('nkd_kin_name').value;
const nkd_kin_relationship = document.getElementById('nkd_kin_relationship').value;
const nkd_kin_contact = document.getElementById('nkd_kin_contact').value;
const nkd_contact_address = document.getElementById('nkd_contact_address').value;
const priority = document.getElementById('priority').value;

// Construct the URL with query parameters
var url = `edit-c-nkd.html?id=${nkd_id}&kinName=${nkd_kin_name}&kinRelation=${nkd_kin_relationship}&kinContactNumber=${nkd_kin_contact}&kinContactAddress=${nkd_contact_address}&kinPriority=${priority}`;

// Redirect to the edit-c-nkd.html page
window.location.href = url;

    // Redirect to the edit-c-nkd.html page
    window.location.href = url;
});
