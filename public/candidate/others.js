console.log("Hello")


// Function to handle edit button click
// candidates.js (continued)
async function fetchAndDisplayCandidate(candidateId,token) {
    try {
        const serverResponse = await axios.get(`http://localhost:3000/candidate/get-candidate/${candidateId}`, {
            headers: { 'Authorization': token }
        });

        const candidateData = serverResponse.data.candidate;
        console.log(candidateData);
        displayCandidateDetails(candidateData);
    } catch (error) {
        console.error('Error fetching candidate data:', error);
        // Handle error as needed
    }
}

async function displayCandidateDetails(candidateData) {
    try {
        // Fetch Rank options from the server using Axios
        const rankResponse = await axios.get("http://localhost:3000/others/view-rank", { headers: { "Authorization": token } });
        const rankOptions = rankResponse.data.ranks;
        const rankNames = rankOptions.map(rank => rank.rank);

        const portResponse = await axios.get("http://localhost:3000/others/view-port", { headers: { "Authorization": token } });
        const portOptions = portResponse.data.ports;
        const portNames = portOptions.map(port => port.portName);

        const documentResponse = await axios.get("http://localhost:3000/others/view-document", { headers: { "Authorization": token } });
        const documentOptions = documentResponse.data.documents;
        const documentNames = documentOptions.map(document => document.documentType);
        console.log(documentNames)

        
    
        const companyResponse = await axios.get("http://localhost:3000/company/view-company", { headers: { "Authorization": token } });
        const companyOptions = companyResponse.data.company;
        const companyNames = companyOptions.map(company => company.company_name);

    
        const countryResponse = await axios.get("http://localhost:3000/fetch-nationality", { headers: { "Authorization": token } });
        const countries = countryResponse.data.countries; // Access the array using response.data.countries
        const countryNames = countries.map(country => country.country);
    
        const serverResponse = await axios.get("http://localhost:3000/others/view-vsl", { headers: { "Authorization": token } });
        const vessels = serverResponse.data.vsls;
        const vesselTypeNames = vessels.map(vessel=>vessel.vesselName)
        const vesselTypeName = vessels.map(vessel=>vessel.vesselType)

        
        const vesselDropdown_contract = document.getElementById('contract_vsl');
        vesselDropdown_contract.innerHTML = '';
        // Extract only the rank names
        
        const gradeResponse = await axios.get("http://localhost:3000/others/view-grade", { headers: { "Authorization": token } });
        const grades = gradeResponse.data.grades;
        const gradeNames = grades.map(grade => grade.gradeExp);

        const hospitalResponse = await axios.get("http://localhost:3000/others/view-hospital", { headers: { "Authorization": token } });
        const hospitals = hospitalResponse.data.hospitals;
        const hospitalNames = hospitals.map(hospital => hospital.hospitalName);
        const hospitalDropdown = document.getElementById('hospital_name');
        hospitalDropdown.innerHTML = ''; // Clear existing options

        // Populate the Rank dropdown options
        const rankDropdown = document.getElementById('edit_candidate_c_rank');
        rankDropdown.innerHTML = ''; // Clear existing options

        const rankDropdowns = document.getElementById('contract_rank');
        rankDropdowns.innerHTML = ''; 

        // const rankDropdowns_one = document.getElementById('rank');
        // rankDropdowns_one.innerHTML = ''; 
    
        const countryDropdown = document.getElementById('edit_candidate_nationality');
        countryDropdown.innerHTML = '';
    
        const vesselDropdown = document.getElementById('edit_candidate_c_vessel');
        vesselDropdown.innerHTML = '';

        const gradeDropdown = document.getElementById('edit_candidate_grade');
        gradeDropdown.innerHTML = '';

        const licenseDropdown = document.getElementById('edit_candidate_I_country');
        licenseDropdown.innerHTML = '';
    
        // const vesselDropdowns = document.getElementById('vessel_type');
        // vesselDropdowns.innerHTML = '';

        const vesselDropdowns_contract = document.getElementById('contract_vesseltype');
        vesselDropdowns_contract.innerHTML = '';

        const companyDropdown = document.getElementById('contract_company');
        companyDropdown.innerHTML = '';

        const portDropdown = document.getElementById('contract_signonport');
        portDropdown.innerHTML = '';

        const portDropdowns = document.getElementById('contract_signoffport');
        portDropdowns.innerHTML = '';

        const documentDropdowns = document.getElementById('doc_document');
        documentDropdowns.innerHTML = '';

        
        const portAgentResponse = await axios.get("http://localhost:3000/others/view-port-agent", { headers: { "Authorization": token } });
        const portAgents = portAgentResponse.data.portAgents;
        console.log(portAgentResponse,portAgents)
        const portAgentname = portAgents.map(pa => pa.portAgentName);
        const portAgentDropdowns = document.getElementById('travel_port_agent');
        portAgentDropdowns.innerHTML = '';

        for (let i = 0; i < rankNames.length; i++) {
            const option = document.createElement('option');
            option.value = rankNames[i];
            option.text = rankNames[i];
            rankDropdown.appendChild(option);
            rankDropdowns.appendChild(option.cloneNode(true));
            // rankDropdowns_one.appendChild(option.cloneNode(true));
            
        }

        for (let i = 0; i < hospitalNames.length; i++) {
            const option = document.createElement('option');
            option.value = hospitalNames[i];
            option.text = hospitalNames[i];
            hospitalDropdown.appendChild(option);
        }
        for (let i = 0; i < portAgentname.length; i++) {
            const option = document.createElement('option');
            option.value = portAgentname[i];
            option.text = portAgentname[i];
            portAgentDropdowns.appendChild(option);
           
            
        }

        for (let i = 0; i < documentNames.length; i++) {
            const option = document.createElement('option');
            option.value = documentNames[i];
            option.text = documentNames[i];
            documentDropdowns.appendChild(option);
          
            
        }
    
        for (let i = 0; i < countryNames.length; i++) {
            const option = document.createElement('option');
            option.value = countryNames[i];
            option.text = countryNames[i];
            countryDropdown.appendChild(option);
           licenseDropdown.appendChild(option.cloneNode(true));        }

        for (let i = 0; i < vesselTypeNames.length; i++) {
            const option = document.createElement('option');
            option.value = vesselTypeNames[i];
            option.text = vesselTypeNames[i];
            vesselDropdown.appendChild(option);
            // vesselDropdowns.appendChild(option.cloneNode(true));
            vesselDropdown_contract.appendChild(option.cloneNode(true));    
            }

            for (let i = 0; i < vesselTypeName.length; i++) {
                const option = document.createElement('option');
                option.value = vesselTypeName[i];
                option.text = vesselTypeName[i];
                vesselDropdowns_contract.appendChild(option.cloneNode(true));    
                }

                for (let i = 0; i < portNames.length; i++) {
                    const option = document.createElement('option');
                    option.value = portNames[i];
                    option.text = portNames[i];
                    portDropdown.appendChild(option);    
                    portDropdowns.appendChild(option.cloneNode(true));    

                    }
    

            

            for (let i = 0; i < companyNames.length; i++) {
                const option = document.createElement('option');
                option.value = companyNames[i];
                option.text = companyNames[i];
                companyDropdown.appendChild(option);
                // companyDropdown.appendChild(option.cloneNode(true));    
                }
    

        

        for (let i = 0; i < gradeNames.length; i++) {
            const option = document.createElement('option');
            option.value = gradeNames[i];
            option.text = gradeNames[i];
            gradeDropdown.appendChild(option);
        }

        
    
        // Set the selected value for the Rank and Nationality dropdowns
        rankDropdown.value = candidateData.c_rank;
        countryDropdown.value = candidateData.nationality;
        vesselDropdown.value=candidateData.c_vessel;
        gradeDropdown.value=candidateData.grade;
        licenseDropdown.value=candidateData.l_country;
        companyDropdown.value=candidateData.last_company;
        // Continue with the rest of the form population code
        document.getElementById('edit_candidate_fname').value = candidateData.fname;
        document.getElementById('edit_candidate_Iname').value = candidateData.lname;
        document.getElementById('edit_candidate_avb_date').value = formatDate(candidateData.avb_date);
        document.getElementById('edit_candidate_dob').value = formatDate(candidateData.dob);  
              document.getElementById('edit_candidate_company_status').value = candidateData.company_status;
        document.getElementById('edit_candidate_birth_place').value = candidateData.birth_place;
        document.getElementById('edit_candidate_work_nautilus').value = candidateData.work_nautilus;
        // document.getElementById('edit_candidate_c_vessel').value = candidateData.c_vessel;
        document.getElementById('edit_candidate_experience').value = candidateData.experience;
        document.getElementById('edit_candidate_zone').value = candidateData.zone;
        // document.getElementById('edit_candidate_grade').value = candidateData.grade;
        document.getElementById('edit_candidate_boiler_suit_size').value = candidateData.boiler_suit_size;
        document.getElementById('edit_candidate_safety_shoe_size').value = candidateData.safety_shoe_size;
        document.getElementById('edit_candidate_height').value = candidateData.height;
        document.getElementById('edit_candidate_weight').value = candidateData.weight;
        document.getElementById('edit_candidate_I_country').value = candidateData.l_country;
        document.getElementById('edit_candidate_indos_number').value = candidateData.indos_number;
        document.getElementById('edit_company_status').value = candidateData.m_status;
        document.getElementById('edit_candidate_group').value = candidateData.group;
        document.getElementById('edit_candidate_vendor').value = candidateData.vendor;
        displayFileInput('edit_candidate_photos', candidateData.photos);
        displayFileInput('edit_candidate_resume', candidateData.resume);

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
        document.getElementById('edit_candidate_active_details').value = candidateData.active_details;
        document.getElementById('edit_candidate_area_code1').value = candidateData.area_code1;
        document.getElementById('edit_candidate_area_code2').value = candidateData.area_code2;
        document.getElementById('edit_candidate_category').value = candidateData.category;
        document.getElementById('edit_candidate_created_by').value = candidateData.createdby;
        document.getElementById('edit_candidate_created_date').value = candidateData.cr_date;
        document.getElementById('edit_candidate_created_time').value = candidateData.cr_time;
        document.getElementById('edit_candidate_editedby').value = candidateData.editedby;
        document.getElementById('edit_candidate_imp_discussion').value = candidateData.imp_discussion;
        document.getElementById('edit_candidate_ipadress').value = candidateData.ipadress;
        document.getElementById('edit_candidate_joined_date').value = candidateData.joined_date;
        document.getElementById('edit_candidate_last_company').value = candidateData.last_company;
        document.getElementById('edit_candidate_last_salary').value = candidateData.last_salary;
        document.getElementById('edit_candidate_last_date').value = candidateData.las_date;
        document.getElementById('edit_candidate_last_time').value = candidateData.las_time;
        document.getElementById('edit_candidate_mobile_code1').value = candidateData.mobile_code1;
        document.getElementById('edit_candidate_mobile_code2').value = candidateData.mobile_code2;
        document.getElementById('edit_candidate_mobile_status').value = candidateData.mobile_status;
        document.getElementById('edit_candidate_other_mobile_code').value = candidateData.other_mobile_code;
        document.getElementById('edit_candidate_other_numbers').value = candidateData.other_numbers;
        document.getElementById('edit_candidate_p_ad1').value = candidateData.p_ad1;
        document.getElementById('edit_candidate_p_ad2').value = candidateData.p_ad2;
        document.getElementById('edit_candidate_p_country').value = candidateData.p_country;
        document.getElementById('edit_candidate_p_mobi1').value = candidateData.p_mobi1;
        document.getElementById('edit_candidate_p_mobi2').value = candidateData.p_mobi2;
        document.getElementById('edit_candidate_p_rank').value = candidateData.p_rank;
        document.getElementById('edit_candidate_p_tel1').value = candidateData.p_tel1;
        document.getElementById('edit_candidate_p_tel2').value = candidateData.p_tel2;
        document.getElementById('edit_candidate_ref_check').value = candidateData.ref_check;
        document.getElementById('edit_candidate_resume_upload_date').value = candidateData.resume_upload_date;
        document.getElementById('edit_candidate_skype').value = candidateData.skype;
        document.getElementById('edit_candidate_stcw').value = candidateData.stcw;
        document.getElementById('edit_candidate_vendor_id').value = candidateData.vendor_id;
    } catch (error) {
        console.error('Error displaying candidate details:', error);
    }
}


function displayFileInput(inputId, fileName) {
    // Display the file name in the corresponding file input
    const fileInput = document.getElementById(inputId);
    
    // Check if nextElementSibling exists before accessing it
    if (fileInput.nextElementSibling) {
        fileInput.nextElementSibling.innerText = fileName;
    }
}




let currentCandidateId;

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('memId');
    const token = localStorage.getItem('token');

    currentCandidateId=candidateId;
    // console.log(">>>>>>>>>",currentCandidateId)
    if (candidateId) {
        await fetchAndDisplayCandidate(candidateId,token);
        await fetchSpecialComments(currentCandidateId, token); // Pass the token
       await fetchAndDisplayContractDetails(currentCandidateId);
       await fetchAndDisplayDocumentDetails(currentCandidateId);
       await fetchAndDisplayBankDetails(currentCandidateId);
       await fetchAndDisplayTravelDetails(currentCandidateId);
       await fetchAndDisplayHospitalDetails(currentCandidateId);
       await fetchAndDisplayNKDDetails(currentCandidateId);
    //    await fetchAndDisplayRanks();


    } else {
        console.error('Invalid URL. Missing memId parameter.');
    }


    const userDisplay = document.getElementById("user_name");
    userDisplay.innerHTML += localStorage.getItem('username');
});


const addcandidateButton = document.getElementById("candidate-form");
addcandidateButton.addEventListener("submit", async(e) =>{
    e.preventDefault() // Prevent the default form submission behavior

    const candidate_details = {
        fname: document.getElementById('edit_candidate_fname').value,
        lname: document.getElementById('edit_candidate_Iname').value,
        c_rank: document.getElementById('edit_candidate_c_rank').value,
        avb_date: document.getElementById('edit_candidate_avb_date').value,
        
        nationality: document.getElementById('edit_candidate_nationality').value,
        company_status: document.getElementById('edit_candidate_company_status').value,
        dob: document.getElementById('edit_candidate_dob').value,
        birth_place: document.getElementById('edit_candidate_birth_place').value,
        work_nautilus: document.getElementById('edit_candidate_work_nautilus').value,
        c_vessel: document.getElementById('edit_candidate_c_vessel').value,
        experience: document.getElementById('edit_candidate_experience').value,
        zone: document.getElementById('edit_candidate_zone').value,
        grade: document.getElementById('edit_candidate_grade').value,
        boiler_suit_size: document.getElementById('edit_candidate_boiler_suit_size').value,
        safety_shoe_size: document.getElementById('edit_candidate_safety_shoe_size').value,
        height: document.getElementById('edit_candidate_height').value,
        weight: document.getElementById('edit_candidate_weight').value,
        l_country: document.getElementById('edit_candidate_I_country').value,
        indos_number: document.getElementById('edit_candidate_indos_number').value,
        m_status: document.getElementById('edit_company_status').value,
        group: document.getElementById('edit_candidate_group').value || '',
        vendor: document.getElementById('edit_candidate_vendor').value || '',
        photos: document.getElementById('edit_candidate_photos').value,
        resume: document.getElementById('edit_candidate_resume').value,
        c_ad1: document.getElementById('edit_candidate_c_ad1').value,
        c_city: document.getElementById('edit_candidate_city').value,
        c_state: document.getElementById('edit_candidate_c_state').value,
        c_pin: document.getElementById('edit_candidate_pin').value,
        c_mobi1: document.getElementById('edit_candidate_c_mobi1').value,
        email1: document.getElementById('edit_candidate_email1').value,
        c_tel1: document.getElementById('edit_candidate_c_tel1').value,
        c_ad2: document.getElementById('edit_candidate_c_ad2').value,
        p_city: document.getElementById('edit_candidate_p_city').value,
        p_state: document.getElementById('edit_candidate_p_state').value,
        p_pin: document.getElementById('edit_candidate_p_pin').value,
        c_mobi2: document.getElementById('edit_candidate_c_mobi2').value,
        c_tel2: document.getElementById('edit_candidate_c_tel2').value,
        email2: document.getElementById('edit_candidate_email2').value,
        
        active_details: document.getElementById('edit_candidate_active_details').value || 0,
        area_code1: document.getElementById('edit_candidate_area_code1').value || '',
        area_code2: document.getElementById('edit_candidate_area_code2').value || '',
        category: document.getElementById('edit_candidate_category').value || 0,
        createdby: document.getElementById('edit_candidate_created_by').value || '',
        cr_date: document.getElementById('edit_candidate_created_date').value || '',
        cr_time: document.getElementById('edit_candidate_created_time').value || '',
        editedby: document.getElementById('edit_candidate_editedby').value || '',
        imp_discussion: document.getElementById('edit_candidate_imp_discussion').value || '',
        ipadress: document.getElementById('edit_candidate_ipadress').value || '',
        joined_date: document.getElementById('edit_candidate_joined_date').value || '',
        last_company: document.getElementById('edit_candidate_last_company').value || '',
        last_salary: document.getElementById('edit_candidate_last_salary').value || '',
        las_date: document.getElementById('edit_candidate_last_date').value || '',
        las_time: document.getElementById('edit_candidate_last_time').value || '',
        mobile_code1: document.getElementById('edit_candidate_mobile_code1').value || '',
        mobile_code2: document.getElementById('edit_candidate_mobile_code2').value || '',
        mobile_status: document.getElementById('edit_candidate_mobile_status').value || '',
        other_mobile_code: document.getElementById('edit_candidate_other_mobile_code').value || '',
        other_numbers: document.getElementById('edit_candidate_other_numbers').value || '',
        p_ad1: document.getElementById('edit_candidate_p_ad1').value || '',
        p_ad2: document.getElementById('edit_candidate_p_ad2').value || '',
        p_country: document.getElementById('edit_candidate_p_country').value || '',
        p_mobi1: document.getElementById('edit_candidate_p_mobi1').value || '',
        p_mobi2: document.getElementById('edit_candidate_p_mobi2').value || '',
        p_rank: document.getElementById('edit_candidate_p_rank').value || '',
        p_tel1: document.getElementById('edit_candidate_p_tel1').value || '',
        p_tel2: document.getElementById('edit_candidate_p_tel2').value || '',
        ref_check: document.getElementById('edit_candidate_ref_check').value || '',
        resume_upload_date: document.getElementById('edit_candidate_resume_upload_date').value || '',
        skype: document.getElementById('edit_candidate_skype').value || '',
        stcw: document.getElementById('edit_candidate_stcw').value || 0,
        vendor_id: document.getElementById('edit_candidate_vendor_id').value || ''
        
      };
    try {
        const serverResponse = await axios.put(`http://localhost:3000/candidate/update-candidate/${currentCandidateId}`, candidate_details,{headers:{"Authorization":token}});
        console.log('Response:', serverResponse.data);
        alert("Candidate Added Successfully!");
    } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
    }
    console.log(candidate_details);
    // Now you can use axios to send the data to the server if needed
});
// Rest of your code...

function formatDate(dateString) {
    // Assuming dateString is in the format "YYYY-MM-DD HH:mm:ss"
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
  
const toggleBtn = document.getElementById('toggleSidebar');
toggleBtn.addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const content2 = document.getElementById('content2');

    // Toggle the left position of the sidebar
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';

    // Adjust the margin of the content area based on the sidebar visibility
    content.style.marginLeft = sidebar.style.left === '0px' ? '250px' : '0px';
    content2.style.marginLeft = sidebar.style.left === '0px' ? '250px' : '0px';

    // Change border radius of toggleBtn
    toggleBtn.style.borderRadius = sidebar.style.left === '0px' ? '0' : '0%';

    // Change toggle button text based on the sidebar visibility
    toggleBtn.innerHTML = sidebar.style.left === '0px' ? '<' : '>';
});

function updateDateTime() {
    const dateTimeElement = document.getElementById('datetime');
    const now = new Date();

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        month: 'short',
        day: 'numeric',
        ordinal: 'numeric',
    };

    const dateTimeString = now.toLocaleString('en-US', options);

    dateTimeElement.textContent = dateTimeString;
}

// Update date and time initially and every second
updateDateTime();
setInterval(updateDateTime, 1000);

document.getElementById('discussionForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const currentDate = new Date(); // Get current date and time
    const reemploymentStatusDropdown = document.getElementById('reemploymentStatus');
    const selectedReemploymentStatus = reemploymentStatusDropdown.value;

    const discussionData = {
        special_comments: document.getElementById('special_comments').value,
        userId:localStorage.getItem('userId'),
        userName:localStorage.getItem('username'),
        ntbr:selectedReemploymentStatus,
        discussion_date: currentDate.toISOString() // Convert to ISO format for better compatibility
    };

    const candidateData={
        avb_date:document.getElementById('avb_date').value,
        last_salary: document.getElementById('last_salary').value,
        last_company: document.getElementById('last_company').value,
        c_rank: document.getElementById('rank').value,
        c_vessel: document.getElementById('vessel_types').value,
        m_status: document.getElementById('status').value,
    }
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`http://localhost:3000/candidate/discussion-detail/${currentCandidateId}`, discussionData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        });

        const candidateResponse = await axios.put(`http://localhost:3000/candidate/update-candidate/${currentCandidateId}`,candidateData,{
            headers:{
                'Authorization':token,
                'Content-Type': 'application/json',
            }
        })

        console.log(response.data,candidateResponse.data);
        event.target.reset();
        
    } catch (error) {
        console.error(error);
    }
});

// Function to format the discussion date
function formatDiscussionDate(dateString) {
    const date = new Date(dateString);

    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate;
}
async function populateRankandVesselDropdown() {
    try {
        // Fetch Rank options from the server using Axios
        const rankResponse = await axios.get("http://localhost:3000/others/view-rank", { headers: { "Authorization": token } });
        const rankOptions = rankResponse.data.ranks;
        const rankNames = rankOptions.map((rank) => rank.rank);

        const serverResponse = await axios.get("http://localhost:3000/others/view-vsl", { headers: { "Authorization": token } });
        const vessels = serverResponse.data.vsls;
        const vesselTypeName = vessels.map(vessel => vessel.vesselName);

        const vesselDropdown = document.getElementById('vessel_types');
        vesselDropdown.innerHTML = '';

        // Clear existing options
        const rankDropdown = document.getElementById('rank');
        rankDropdown.innerHTML = '';

        // Populate the Rank dropdown options
        for (let i = 0; i < rankNames.length; i++) {
            const option = document.createElement('option');
            option.value = rankNames[i];
            option.text = rankNames[i];
            rankDropdown.appendChild(option);
        }

        // Populate the Vessel dropdown options
        for (let i = 0; i < vesselTypeName.length; i++) {
            const option = document.createElement('option');
            option.value = vesselTypeName[i];
            option.text = vesselTypeName[i];
            vesselDropdown.appendChild(option);
        }
    } catch (error) {
        console.error('Error populating Rank and Vessel dropdown:', error);
        // Handle error as needed
    }
}

async function fetchSpecialComments(candidateId, token) {
    const specialCommentsUrl = `http://localhost:3000/candidate/get-discussion/${candidateId}`;
    const candidateUrl = `http://localhost:3000/candidate/get-candidate/${candidateId}`;

    try {
        await populateRankandVesselDropdown();
        const response = await axios.get(specialCommentsUrl, { headers: { 'Authorization': token } });
        const candidateResponse = await axios.get(candidateUrl, { headers: { 'Authorization': token } });

        const candidateArray = candidateResponse.data.candidate;
        const discussionArray = response.data.discussion;

        console.log('Discussion Details:', discussionArray);
        console.log('Candidate Details:', candidateArray);

   

        if (candidateArray) {
            const formattedDate = formatDate(candidateArray.avb_date);
            console.log(formattedDate);
            document.getElementById('avb_date').value = formattedDate;
            document.getElementById('last_salary').value = candidateArray.last_salary;
            document.getElementById('last_company').value = candidateArray.last_company;
            const rankDropdown = document.getElementById('rank');
            const vesselDropdown = document.getElementById('vessel_types');
            const statusDropdown = document.getElementById('status');

            // Function to set the value and highlight if it matches the fetched value
            function setValueAndHighlight(dropdown, fetchedValue) {
                for (let i = 0; i < dropdown.options.length; i++) {
                    const option = dropdown.options[i];
                    if (option.value == fetchedValue) {
                        // Set the value of the matched option
                        dropdown.value = fetchedValue;
                        break;  // Stop searching once found
                    }
                }
            }

            // Set and highlight values from the fetched data
            try {
                setValueAndHighlight(rankDropdown, candidateArray.c_rank);
                setValueAndHighlight(vesselDropdown, candidateArray.c_vessel);
                setValueAndHighlight(statusDropdown, candidateArray.m_status);
            } catch (err) {
                console.log(err)
            }

            // Now, populate the rank dropdown after fetching the rank options
        } else {
            console.log('error---------')
        }

        discussionArray.forEach(discussion => {
            const discussionElement = document.createElement('div');
            const formattedDate = formatDiscussionDate(discussion.discussion_date);
            document.getElementById('reemploymentStatus').value = discussion.ntbr;

            discussionElement.innerHTML = `<strong>${discussion.userName}:</strong><a style="color:gray;font-size:13px;text-decoration:none" class="float-end">${formattedDate}</a><br>${discussion.special_comments}<br><br>`;

            discussionContainer.appendChild(discussionElement);
        });

        // Now, set the dropdown value outside the forEach loop
    } catch (error) {
        console.error('Error fetching discussion details:', error);
        // Handle error as needed
    }
}




document.getElementById('discussionPlusForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const discussionPlusData = {
        proposed: document.getElementById('proposed').checked,
        approved: document.getElementById('approved').checked,
        joined: document.getElementById('joined').checked,
        rejected: document.getElementById('rejected').checked,
        set_reminder: document.getElementById('set_reminder_checkbox').checked,
        special_comments: document.getElementById('special_comments_checkbox').checked,
        ref_check: document.getElementById('ref_check_checkbox').checked,
    };

    try {
        const response = await axios.post(`http://localhost:3000/candidate/discussion-plus-detail/${currentCandidateId}`, discussionPlusData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data);
        event.target.reset();

    } catch (error) {
        console.error(error);
    }
});

async function handleContractForm(event) {
    event.preventDefault();

    const rank = document.getElementById('contract_rank').value;
    const company = document.getElementById('contract_company').value;
    const vslName = document.getElementById('contract_vsl').value;
    const vesselType = document.getElementById('contract_vesseltype').value;
    const signOnPort = document.getElementById('contract_signonport').value;
    const signOn = document.getElementById('contract_signon').value;
    const wageStart = document.getElementById('contract_wage_start').value;
    const eoc = document.getElementById('contract_eoc').value;
    const wages = document.getElementById('contract_wages').value;
    const currency = document.getElementById('contract_currency').value;
    const wagesType = document.getElementById('contract_wagestype').value;
    const signOff = document.getElementById('contract_signoff').value;
    const signOffPort = document.getElementById('contract_signoffport').value;
    const reasonForSignOff = document.getElementById('contracts_reason').value;
    const documentFile = document.getElementById('contract_document').value;
    const aoaFile = document.getElementById('contract_aoa').value;
    const aoaNumber = document.getElementById('contract_aoa_num').value;
    const emigrateNumber = document.getElementById('contract_emigrate').value;

    const contractDetails = {
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
        aoaFile,
        aoaNumber,
        emigrateNumber
    };

    try {
        const response = await axios.post(`http://localhost:3000/candidate/contract-details/${currentCandidateId}`, contractDetails, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        await fetchAndDisplayContractDetails(currentCandidateId);
        contractForm.reset();
    } catch (err) {
        console.error(err);
    }
}




// Attach the form submission handler to the form
const contractForm = document.getElementById('contractForm');
contractForm.addEventListener('submit', handleContractForm);

async function handleEditContractForm(event) {
    event.preventDefault();
    const id = document.getElementById('contractId').value
    const rank = document.getElementById('editcontract_rank').value;
    const company = document.getElementById('editcontract_company').value;
    const vslName = document.getElementById('editcontract_vsl').value;
    const vesselType = document.getElementById('editcontract_vesseltype').value;
    const signOnPort = document.getElementById('editcontract_signonport').value;
    const signOn = document.getElementById('editcontract_signon').value;
    const wageStart = document.getElementById('editcontract_wage_start').value;
    const eoc = document.getElementById('editcontract_eoc').value;
    const wages = document.getElementById('editcontract_wages').value;
    const currency = document.getElementById('editcontract_currency').value;
    const wagesType = document.getElementById('editcontract_wagestype').value;
    const signOff = document.getElementById('editcontract_signoff').value;
    const signOffPort = document.getElementById('editcontract_signoffport').value;
    const reasonForSignOff = document.getElementById('editcontracts_reason').value;
    const documentFile = document.getElementById('editcontract_document').value;
    const aoaFile = document.getElementById('editcontract_aoa').value;
    const aoaNumber = document.getElementById('editcontract_aoa_num').value;
    const emigrateNumber = document.getElementById('editcontract_emigrate').value;

    const editContractDetails = {
        id,
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
        aoaFile,
        aoaNumber,
        emigrateNumber
    };

    try {
        const response = await axios.put(`http://localhost:3000/candidate/update-contract-details/${id}`, editContractDetails, {
            headers: {
                'Authorization': token,
                // 'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        editContractForm.reset();
    } catch (err) {
        console.error(err);
    }
}




// Attach the form submission handler to the form
const editContractForm = document.getElementById('editContractForm');
editContractForm.addEventListener('submit', handleEditContractForm);


// Function to handle the "Add Document" form submission
async function handleDocumentForm(event) {
    event.preventDefault();

    const documentValue = document.getElementById('doc_document').value;
    const documentNumberValue = document.getElementById('doc_document_num').value;
    const issueDateValue = document.getElementById('doc_issue_date').value;
    const issuePlaceValue = document.getElementById('doc_issue_place').value;
    const documentFilesValue = document.getElementById('doc_docfiles').value;
    const stcw = document.getElementById('contract_stcwCompliance').value;
       const documentDetails={
    documentValue,
    documentNumberValue,
    issueDateValue,
    issuePlaceValue,
    documentFilesValue,
    stcw
   }

    try {
        const response = await axios.post(`http://localhost:3000/candidate/document-details/${currentCandidateId}`, documentDetails, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        // fetchAndDisplayDocumentDetails(currentCandidateId)
        docForm.reset();
    } catch (err) {
        console.error(err);
    }
}

// Attach the form submission handler to the form
const docForm = document.getElementById('docForm');
docForm.addEventListener('submit', handleDocumentForm);


// Function to handle the "Add Bank Details" form submission
async function handleBankDetailsForm(event) {
    event.preventDefault();

    // Regular Bank Account Details
    const bankName = document.getElementById('bank_name').value;
    const accountNumber = document.getElementById('bank_acc_num').value;
    const bankAddress = document.getElementById('bank_acc_addr').value;
    const ifscCode = document.getElementById('bank_ifsc').value;
    const swiftCode = document.getElementById('bank_swift').value;
    const beneficiary = document.getElementById('bank_beneficiary').value;
    const address = document.getElementById('bank_addr').value;
    const panNumber = document.getElementById('bank_pan').value;
    const panCardFile = document.getElementById('bank_pan_card').value;
    const passbookFile = document.getElementById('bank_passbook').value;

    // NRI Bank Account Details
    const nriBankName = document.getElementById('nri_bank_name').value;
    const nriAccountNumber = document.getElementById('nri_bank_acc_num').value;
    const nriBankAddress = document.getElementById('nri_bank_acc_addr').value;
    const nriIfscCode = document.getElementById('nri_bank_ifsc').value;
    const nriSwiftCode = document.getElementById('nri_bank_swift').value;
    const nriBeneficiary = document.getElementById('nri_bank_beneficiary').value;
    const nriAddress = document.getElementById('nri_bank_addr').value;
    const nriPassbookFile = document.getElementById('nri_bank_passbook').value;

    // Create an object to hold all the bank details
    const bankDetails = {
        bankName,
        accountNumber,
        bankAddress,
        ifscCode,
        swiftCode,
        beneficiary,
        address,
        panNumber,
        panCardFile,
        passbookFile,
        nriBankName,
        nriAccountNumber,
        nriBankAddress,
        nriIfscCode,
        nriSwiftCode,
        nriBeneficiary,
        nriAddress,
        nriPassbookFile
    };

    try {
        const response = await axios.post(`http://localhost:3000/candidate/bank-details/${currentCandidateId}`, bankDetails, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        bankDetailsForm.reset();
    } catch (err) {
        console.error(err);
    }
}

// Attach the form submission handler to the form
const bankDetailsForm = document.getElementById('bank_form');
bankDetailsForm.addEventListener('submit', handleBankDetailsForm);



// Function to handle the "Add Travel" form submission
async function handleTravelForm(event) {
    event.preventDefault();

    const travelDate = document.getElementById('travel_date').value;
    const travelFrom = document.getElementById('travel_from').value;
    const travelTo = document.getElementById('travel_to').value;
    const travelMode = document.getElementById('travel_mode').value;
    const travelStatus = document.getElementById('travel_status').value;
    const ticketNumber = document.getElementById('travel_ticket').value;
    const agentName = document.getElementById('travel_agent_name').value;
    const portAgent = document.getElementById('travel_port_agent').value;
    const travelAmount = document.getElementById('travel_amount').value;

    const travelDetails = {
        travel_date:travelDate,
        travel_from:travelFrom,
        travel_to:travelTo,
        travel_mode:travelMode,
        travel_status:travelStatus,
        ticket_number:ticketNumber,
        agent_name:agentName,
        portAgent,
        travel_amount:travelAmount
    };

    try {
        const response = await axios.post(`http://localhost:3000/candidate/travel-details/${currentCandidateId}`, travelDetails, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        travelForm.reset();
    } catch (err) {
        console.error(err);
    }
}

// Attach the form submission handler to the form
const travelForm = document.getElementById('travel_form');
travelForm.addEventListener('submit', handleTravelForm);


// Function to handle the "Add Medical" form submission
async function handleHospitalForm(event) {
    event.preventDefault();

    const hospitalName = document.getElementById('hospital_name').value;
    const place = document.getElementById('hospital_place').value;
    const date = document.getElementById('hospital_date').value;
    const expiryDate = document.getElementById('hospital_exp_date').value;
    const doneBy = document.getElementById('hospital_done').value;
    const status = document.getElementById('hospital_status').value;
    const amount = document.getElementById('hospital_amount').value;
    const uploadFile = document.getElementById('hospital_upload').value;

    const hospitalDetails = {
        hospitalName,
        place,
        date,
        expiry_date:expiryDate,
        done_by:doneBy,
        status,
        amount,
        upload:uploadFile
    };

    try {
        const response = await axios.post(`http://localhost:3000/candidate/hospital-details/${currentCandidateId}`, hospitalDetails, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        hospitalForm.reset();
    } catch (err) {
        console.error(err);
    }
}

// Attach the form submission handler to the form
const hospitalForm = document.getElementById('hospital_form');
hospitalForm.addEventListener('submit', handleHospitalForm);


// Function to handle the "Add NKD" form submission
async function handleNKDForm(event) {
    event.preventDefault();

    const kinName = document.getElementById('nkd_kin_name').value;
    const kinRelationship = document.getElementById('nkd_kin_relationship').value;
    const kinContact = document.getElementById('nkd_kin_contact').value;
    const contactAddress = document.getElementById('nkd_contact_address').value;
    const priority = document.getElementById('nkd_priority').value;

   const nkdDetails ={
    kin_name : kinName,
    kin_relation:kinRelationship,
    kin_contact_number:kinContact,
    kin_contact_address:contactAddress,
    kin_priority:priority
   }

   try{
    const response = await axios.post(`http://localhost:3000/candidate/kin-details/${currentCandidateId}`,nkdDetails,{headers:{"Authorization":token}})
    console.log(response.data)
    nkdForm.reset();
   }
   catch(err)
   {
    console.log(err)
   }
}

// Attach the form submission handler to the form
const nkdForm = document.getElementById('nkd_form');
nkdForm.addEventListener('submit', handleNKDForm);

function toggleInputVisibility(checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const inputDiv = document.getElementById(inputId);

    checkbox.addEventListener('change', function () {
        inputDiv.style.display = checkbox.checked ? 'block' : 'none';
    });
}

toggleInputVisibility('set_reminder_checkbox', 'set_reminder_input');
toggleInputVisibility('special_comments_checkbox', 'special_comments_input');
toggleInputVisibility('ref_check_checkbox', 'ref_check_input');

const logout = document.getElementById("logout")


logout.addEventListener("click",()=>{
    localStorage.clear();
    window.location.href ="../login/login.html"
})

function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
const token = localStorage.getItem('token')

const decodedToken = decodeToken(token);
const userRole = decodedToken.userGroup; // Assuming your user role is stored in userGroup
const hasUserManagement = decodedToken.userManagement; // Assuming userManagement is a boolean in the JWT payload
const hasReport = decodedToken.reports
console.log(userRole,hasUserManagement,hasReport)
switch (userRole) {
    case 'admin':
        document.getElementById('adminSection').style.display = 'block';
        break;
    case 'vendor':
        document.getElementById('vendorSection').style.display = 'block';
        if (hasUserManagement) {
            const userLink = document.createElement('a');
            userLink.href = '../user/user.html';
            userLink.innerHTML = '<i class="fas fa-user-plus"></i> &nbsp; Create User';
            document.getElementById('vendorSection').appendChild(userLink);
        }
        if (hasReport) {
            const userLink = document.createElement('a');
            userLink.href = '../report/report.html';
            userLink.innerHTML = '<i class="fas fa-file-alt"></i> &nbsp; Generate Report';
            document.getElementById('vendorSection').appendChild(userLink);
        }
        break;
    // case 'user':
    //     document.getElementById('userSection').style.display = 'block';
    //     break;
    default:
        console.error('Unknown user role:', userRole);
}

// Function to fetch and display contract details
async function fetchAndDisplayContractDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-contract-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const contractDetails = response.data;

        // Assuming contractDetails is an array of objects
        const contractTableBody = document.getElementById('contractTableBody');
        contractTableBody.innerHTML = ''; // Clear existing rows

        contractDetails.forEach(contract => {
            const row = document.createElement('tr');

            // Add data to each cell
            row.innerHTML = `
                <td>${contract.rank}</td>
                <td>${contract.company}</td>
                <td>${contract.vslName}</td>
                <td>${contract.vesselType}</td>
                <td>${contract.sign_on_port}</td>
                <td>${contract.sign_on}</td>
                <td>${contract.wage_start}</td>
                <td>${contract.eoc}</td>
                <td>${contract.wages}</td>
                <td>${contract.currency}</td>
                <td>${contract.wages_types}</td>
                <td>${contract.sign_off}</td>
                <td>${contract.sign_off_port}</td>
                <td>${contract.reason_for_sign_off}</td>
                <td>${contract.aoa_number}</td>
                <td>${contract.emigrate_number}</td>
                <td>${contract.documents}</td>
                <td>${contract.aoa}</td>
                <td>
        <button onclick="editContract('${contract.id}','${contract.rank}','${contract.company}','${contract.vslName}','${contract.vesselType}','${contract.sign_on_port}','${contract.sign_on}','${contract.wage_start}','${contract.eoc}','${contract.wages}','${contract.currency}','${contract.wages_types}','${contract.sign_off}','${contract.sign_off_port}','${contract.reason_for_sign_off}','${contract.aoa_number}','${contract.emigrate_number}','${contract.documents}','${contract.aoa}',event)">Edit</button>
        <button onclick="deleteContract(${contract.id})">Delete</button>
    </td>
                <!-- Add more cells as needed -->
            `;

            // Append the row to the table body
            contractTableBody.appendChild(row);

        });
    } catch (err) {
        console.error(err);
    }
}

// Add these functions to handle edit and delete actions
function editContract(id,rank,company,vslName,vesselType,sign_on_port,sign_on,wage_start,eoc,wages,currency,wages_types,sign_off,sign_off_port,reason_for_sign_off,aoa_number,emigrate_number,documents,aoa,event) {
event.preventDefault();
    console.log(`Edit contract with ID: ${id}`);
    const formattedEoc = formatDate(eoc)
    document.getElementById('contractId').value=id
    document.getElementById('editcontract_rank').value=rank
 document.getElementById('editcontract_company').value=company
 document.getElementById('editcontract_vsl').value=vslName
 document.getElementById('editcontract_vesseltype').value=vesselType
document.getElementById('editcontract_signonport').value=sign_on_port
 document.getElementById('editcontract_signon').value=formatDate(sign_on)
 document.getElementById('editcontract_wage_start').value=formatDate(wage_start)
 document.getElementById('editcontract_eoc').value=formattedEoc
 document.getElementById('editcontract_wages').value=wages
 document.getElementById('editcontract_currency').value=currency
 document.getElementById('editcontract_wagestype').value=wages_types
 document.getElementById('editcontract_signoff').value=formatDate(sign_off)
document.getElementById('editcontract_signoffport').value=sign_off_port
 document.getElementById('editcontracts_reason').value=reason_for_sign_off
 document.getElementById('editcontract_aoa_num').value=aoa_number

 document.getElementById('editcontract_emigrate').value=emigrate_number
 document.getElementById('editcontract_document').value=documents

 document.getElementById('editcontract_aoa').value=aoa


}

function deleteContract(contractId) {
    // Implement the logic for deleting a contract
    console.log(`Delete contract with ID: ${contractId}`);
}

// Call the function to fetch and display contract details when the page loads
// You need to replace 'currentCandidateId' with the actual candidate ID
// or get it from wherever it is stored in your application

// Assuming you have a function to fetch and display document details
async function fetchAndDisplayDocumentDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-document-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const documentDetails = response.data;

        // Assuming documentDetails is an array of objects
        const documentTableBody = document.getElementById('documentTableBody');
        documentTableBody.innerHTML = ''; // Clear existing rows

        documentDetails.forEach(document => {
            // Use the correct variable name 'row' instead of 'document'
            const row = documentTableBody.insertRow(); // Use 'insertRow' to create a new row

            // Add cells to the row
            const cell1 = row.insertCell(0);
            cell1.innerHTML = document.document;

            const cell2 = row.insertCell(1);
            cell2.innerHTML = document.document_number;

            const cell3 = row.insertCell(2);
            cell3.innerHTML = document.issue_date;

            const cell4 = row.insertCell(3);
            cell4.innerHTML = document.issue_place;

            const cell5 = row.insertCell(4);
            cell5.innerHTML = document.document_files;

            const cell6 = row.insertCell(5) 
            cell6.innerHTML=document.stcw  
            
            const cell7 = row.insertCell(6);
            // Add buttons for 'Edit' and 'Delete'
            cell7.innerHTML = `
                <button onclick="editDocument(${document.id})">Edit</button>
                <button onclick="deleteDocument(${document.id})">Delete</button>
            `;
        });
    } catch (err) {
        console.error(err);
    }
}


// Example of using the fetchAndDisplayDocumentDetails function
// Call this function where you need to display document details, such as after adding a new document.
// Assuming you have functions for editing and deleting documents

function editDocument(documentId) {
    // Your code for editing a document
    console.log(`Editing document with ID: ${documentId}`);
}

function deleteDocument(documentId) {
    // Your code for deleting a document
    console.log(`Deleting document with ID: ${documentId}`);
}

async function fetchAndDisplayBankDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-bank-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const bankDetails = response.data;
        // console.log(response,bankDetails)
        // Assuming bankDetails is an array of objects
        const bankTableBody = document.getElementById('bankTableBody');
        bankTableBody.innerHTML = ''; // Clear existing rows

        bankDetails.forEach(bank => {
            const row = document.createElement('tr');

            // Add data to each cell
            row.innerHTML = `
            <td>${bank.bank_name}</td>
            <td>${bank.account_num}</td>
            <td>${bank.bank_addr}</td>
            <td>${bank.ifsc_code}</td>
            <td>${bank.swift_code}</td>
            <td>${bank.beneficiary}</td>
            <td>${bank.beneficiary_addr}</td>
            <td>${bank.pan_num}</td>
            <td>${bank.passbook}</td>
            <td>${bank.pan_card}</td>
            <td>${bank.nri_bank_name}</td>
            <td>${bank.nri_account_num}</td>
            <td>${bank.nri_bank_addr}</td>
            <td>${bank.nri_ifsc_code}</td>
            <td>${bank.nri_swift_code}</td>
            <td>${bank.nri_beneficiary}</td>
            <td>${bank.nri_beneficiary_addr}</td>
            <td>${bank.nri_passbook}</td>
            <td>
                <button onclick="editBank(${bank.id})">Edit</button>
                <button onclick="deleteBank(${bank.id})">Delete</button>
            </td>
            <!-- Add more cells as needed -->
        `;

            // Append the row to the table body
            bankTableBody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

async function fetchAndDisplayTravelDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-travel-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const travelDetails = response.data;

        const travelTableBody = document.getElementById('travelTableBody');
        travelTableBody.innerHTML = '';

        travelDetails.forEach(travel => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${travel.travel_date}</td>
                <td>${travel.travel_from}</td>
                <td>${travel.travel_to}</td>
                <td>${travel.travel_mode}</td>
                <td>${travel.travel_status}</td>
                <td>${travel.ticket_number}</td>
                <td>${travel.agent_name}</td>
                <td>${travel.portAgent}</td>
                <td>${travel.travel_amount}</td>
                <td>
                    <button onclick="editTravel(${travel.id})">Edit</button>
                    <button onclick="deleteTravel(${travel.id})">Delete</button>
                </td>
            `;
            travelTableBody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

async function fetchAndDisplayHospitalDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-hospital-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const hospitalDetails = response.data;

        const hospitalTableBody = document.getElementById('hospitalTableBody');
        hospitalTableBody.innerHTML = '';

        hospitalDetails.forEach(hospital => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${hospital.hospitalName}</td>
                <td>${hospital.place}</td>
                <td>${hospital.date}</td>
                <td>${hospital.expiry_date}</td>
                <td>${hospital.done_by}</td>
                <td>${hospital.status}</td>
                <td>${hospital.amount}</td>
                <td>${hospital.upload}</td>
                <td>
                    <button onclick="editHospital(${hospital.id})">Edit</button>
                    <button onclick="deleteHospital(${hospital.id})">Delete</button>
                </td>
            `;
            hospitalTableBody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

async function fetchAndDisplayNKDDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-nkd-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const nkdDetails = response.data;

        const nkdTableBody = document.getElementById('nkdTableBody');
        nkdTableBody.innerHTML = '';

        nkdDetails.forEach(nkd => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nkd.kin_name}</td>
                <td>${nkd.kin_relation}</td>
                <td>${nkd.kin_contact_number}</td>
                <td>${nkd.kin_contact_address}</td>
                <td>${nkd.kin_priority}</td>
                <td>
                    <button onclick="editNKD(${nkd.id})">Edit</button>
                    <button onclick="deleteNKD(${nkd.id})">Delete</button>
                </td>
            `;
            nkdTableBody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

// async function fetchAndDisplayRanks() {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get("http://localhost:3000/others/view-rank", { headers: { "Authorization": token } });

//         // Extract the ranks array from the response
//         const ranks = response.data.ranks;

//         // Fetch only the 'rank' values from the array
//         const rankValues = ranks.map(rank => rank.rank);
        
//         const rankSelect = document.getElementById("edit_candidate_c_rank");

      

//         // Check if rankValues is an array before using forEach
//         if (Array.isArray(rankValues)) {
//             rankValues.forEach(rankValue => {
//                 const option = document.createElement("option");
//                 option.value = rankValue; // Use the appropriate value from your rank data
//                 option.text = rankValue; // Use the appropriate property from your rank data

//                 rankSelect.add(option);

//                 // You can add logic here to handle the selected option if needed
//             });
//         } else {
//             console.error('Invalid or empty response for ranks:', response.data);
//         }
//     } catch (error) {
//         console.error('Error fetching ranks:', error);
//     }
// }

// // Call the function to fetch and display ranks
