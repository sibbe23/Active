
const view = document.getElementById("view-candidates");
view.addEventListener("submit", async(e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const serverResponse = await axios.get("http://localhost:3000/candidate/view-candidate",{headers:{"Authorization":token}});
        console.log('Response:', serverResponse);
        displayCandidates(serverResponse.data.candidates);
    } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
    }
});
function displayCandidates(candidates) {
    const candidateListContainer = document.getElementById("candidate-list");

    // Clear previous content
    candidateListContainer.innerHTML = '';

    // Check if candidates is an array
    if (Array.isArray(candidates) && candidates.length > 0) {
        // Create the table element with Bootstrap 5 classes
        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-striped');

        // Create the header row with Bootstrap 5 classes
        const headerRow = document.createElement('tr');

        // Add a header cell for serial number
        const snoHeader = document.createElement('th');
        snoHeader.textContent = 'Sno';
        headerRow.appendChild(snoHeader);

        // Specify the fields to display
        const fieldsToDisplay = ['candidateId', 'full name', 'rank', 'vessel', 'mobile', 'age', 'action'];

        // Iterate through properties and create header cells for the specified fields
        fieldsToDisplay.forEach(field => {
            const formattedKey = field.replace('_', ' ');
            const headerCell = document.createElement('th');
            headerCell.classList.add('text-capitalize');
            headerCell.textContent = formattedKey;
            headerRow.appendChild(headerCell);
        });

        // Append the header row to the table
        table.appendChild(headerRow);

        // Iterate through each candidate and create table rows
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            const row = document.createElement('tr');

            // Add a cell for serial number
            const snoCell = document.createElement('td');
            snoCell.textContent = i + 1;
            row.appendChild(snoCell);

            // Calculate age based on the date of birth
            const dob = new Date(candidate.dob);
            const age = new Date().getFullYear() - dob.getFullYear();

            // Specify the fields to display and their corresponding properties
            const fieldsData = [
                { field: 'candidateId', property: 'candidateId' },
                { field: 'full name', property: 'fname', concatProperty: 'lname' },
                { field: 'rank', property: 'c_rank' },
                { field: 'vessel', property: 'c_vessel' },
                { field: 'mobile', property: 'c_mobi1' },
                { field: 'age', property: 'age', customValue: age },
                { field: 'action',  customValue: createActionButtonHTML(candidate.candidateId, decodedToken.readWrite, decodedToken.deletes) }
            ];

            // Iterate through specified fields and create cells for the corresponding data
            fieldsData.forEach(data => {
                const cell = document.createElement('td');
                const value = data.customValue !== undefined ? data.customValue : candidate[data.property];

                // Check if the value is null before appending
                cell.innerHTML = value !== null ? value : '';
                row.appendChild(cell);
            });

            // Append the row to the table
            table.appendChild(row);
        }

        // Create a container with horizontal scrolling
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-responsive');
        tableContainer.appendChild(table);

        // Append the table to the container
        candidateListContainer.appendChild(tableContainer);
    } else {
        // Handle the case where candidates is not an array or is empty (e.g., display an error message)
        console.error('Invalid data format or no candidates:', candidates);
    }
}

// Function to create HTML for action buttons (Edit and Delete)
function createActionButtonHTML(sno) {
    return `<div class="btn-group" role="group">
                <button type="button" class="btn btn-secondary btn-sm" onclick="editCandidate(${sno})">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteCandidate(${sno})">Delete</button>
            </div>`;
}

function editCandidate(memId) {
    const canEdit = decodedToken.readWrite;
    if (canEdit) {
        console.log('Edited:', memId);
        window.location.href = `./others.html?memId=${memId}`;
        // Add your logic for editing here
    } else {
        alert('You do not have permission to edit this candidate.');
    }
}

// Sample deleteCandidate function
async function deleteCandidate(memId) {
    const canDelete = decodedToken.deletes;
    if (canDelete && confirm('Are you sure you want to delete this candidate?')) {
        try {
            const serverResponse = await axios.delete(`http://localhost:3000/candidate/delete-candidate/${memId}`, { headers: { "Authorization": token } });
            console.log('Response:', serverResponse.data);
            alert('Candidate Deleted Successfully!');
            // Refresh the candidate list after deletion
            const viewForm = document.getElementById('view-candidates');
            viewForm.dispatchEvent(new Event('submit'));
        } catch (error) {
            console.error('Error:', error);
            // Handle error as needed
        }
    } else if (!canDelete) {
        alert('You do not have permission to delete this candidate.');
    }
}




const addcandidateButton = document.getElementById("candidate-form");
addcandidateButton.addEventListener("submit", async(e) =>{
    e.preventDefault() // Prevent the default form submission behavior

    const candidate_details = {
        fname: document.getElementById('candidate_fname').value,
        lname: document.getElementById('candidate_Iname').value,
        c_rank: document.getElementById('candidate_c_rank').options[document.getElementById('candidate_c_rank').selectedIndex].value,
        avb_date: document.getElementById('candidate_avb_date').value,
        nationality: document.getElementById('candidate_nationality').value,
        company_status: document.getElementById('company_status').value,
        dob: document.getElementById('candidate_dob').value,
        birth_place: document.getElementById('candidate_birth_place').value,
        work_nautilus: document.getElementById('candidate_work_nautilus').value,
        c_vessel: document.getElementById('candidate_c_vessel').value,
        experience: document.getElementById('candidate_experience').value,
        zone: document.getElementById('candidate_zone').value,
        grade: document.getElementById('candidate_grade').value,
        boiler_suit_size: document.getElementById('candidate_boiler_suit_size').value,
        safety_shoe_size: document.getElementById('candidate_safety_shoe_size').value,
        height: document.getElementById('candidate_height').value,
        weight: document.getElementById('candidate_weight').value,
        l_country: document.getElementById('candidate_I_country').value,
        indos_number: document.getElementById('candidate_indos_number').value,
        m_status: document.getElementById('candidate_company_status').value,
        group: document.getElementById('candidate_group').value || '',
        vendor: document.getElementById('candidate_vendor').value || '',
        photos: document.getElementById('candidate_photos').value,
        resume: document.getElementById('candidate_resume').value,
        c_ad1: document.getElementById('candidate_c_ad1').value,
        c_city: document.getElementById('candidate_city').value,
        c_state: document.getElementById('candidate_c_state').value,
        c_pin: document.getElementById('candidate_pin').value,
        c_mobi1: document.getElementById('candidate_c_mobi1').value,
        email1: document.getElementById('candidate_email1').value,
        c_tel1: document.getElementById('candidate_c_tel1').value,
        c_ad2: document.getElementById('candidate_c_ad2').value,
        p_city: document.getElementById('candidate_p_city').value,
        p_state: document.getElementById('candidate_p_state').value,
        p_pin: document.getElementById('candidate_p_pin').value,
        c_mobi2: document.getElementById('candidate_c_mobi2').value,
        c_tel2: document.getElementById('candidate_c_tel2').value,
        email2: document.getElementById('candidate_email2').value,



        active_details: document.getElementById('candidate_active_details').value || 0,
        area_code1: document.getElementById('candidate_area_code1').value || '',
        area_code2: document.getElementById('candidate_area_code2').value || '',
        category: document.getElementById('candidate_category').value || 0,
        createdby: document.getElementById('candidate_created_by').value || '',
        cr_date: document.getElementById('candidate_created_date').value || null,        cr_time: document.getElementById('candidate_created_time').value || '',
        editedby: document.getElementById('candidate_editedby').value || '',
        imp_discussion: document.getElementById('candidate_imp_discussion').value || '',
        ipadress: document.getElementById('candidate_ipadress').value || '',
        joined_date: document.getElementById('candidate_joined_date').value || null,        last_company: document.getElementById('candidate_last_company').value || '',
        last_salary: document.getElementById('candidate_last_salary').value || '',
        las_date: document.getElementById('candidate_last_date').value || null,
        las_time: document.getElementById('candidate_last_time').value || '',
        mobile_code1: document.getElementById('candidate_mobile_code1').value || '',
        mobile_code2: document.getElementById('candidate_mobile_code2').value || '',
        mobile_status: document.getElementById('candidate_mobile_status').value || '',
        other_mobile_code: document.getElementById('candidate_other_mobile_code').value || '',
        other_numbers: document.getElementById('candidate_other_numbers').value || '',
        p_ad1: document.getElementById('candidate_p_ad1').value || '',
        p_ad2: document.getElementById('candidate_p_ad2').value || '',
        p_country: document.getElementById('candidate_p_country').value || '',
        p_mobi1: document.getElementById('candidate_p_mobi1').value || '',
        p_mobi2: document.getElementById('candidate_p_mobi2').value || '',
        p_rank: document.getElementById('candidate_p_rank').value || '',
        p_tel1: document.getElementById('candidate_p_tel1').value || '',
        p_tel2: document.getElementById('candidate_p_tel2').value || '',
        ref_check: document.getElementById('candidate_ref_check').value || '',
        resume_upload_date: document.getElementById('candidate_resume_upload_date').value || null,
        skype: document.getElementById('candidate_skype').value || '',
        stcw: document.getElementById('candidate_stcw').value || 0,
        vendor_id: document.getElementById('candidate_vendor_id').value || '',
      };
    try {
        const serverResponse = await axios.post("http://localhost:3000/candidate/add-candidate", candidate_details,{headers:{"Authorization":token}});
        console.log('Response:', serverResponse.data);
        addcandidateButton.reset();
        alert("Candidate Added Successfully!");
    } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
    }
    console.log(candidate_details);
    // Now you can use axios to send the data to the server if needed
});

const logout = document.getElementById("logout")


logout.addEventListener("click",()=>{
    localStorage.clear();
    window.location.href ="../login/login.html"
})



    const token = localStorage.getItem("token")
window.onload = async function () {
    const userDisplay=document.getElementById("user_name");
    userDisplay.innerHTML+=localStorage.getItem('username');
    await fetchAndDisplayRanks();
    await fetchAndDisplayNationalities();
    await     fetchAndDisplayVessels();
    await fetchAndDisplayGrades();
    // Fetch and display nationalities
    const countries = await fetchAndDisplayNationalities();

    // Display nationalities in the License Country dropdown
    const countrySelect = document.getElementById("candidate_I_country");
    displayDropdownOptions(countrySelect, countries, "License Country");

    // Display nationalities in the Nationality dropdown
    const nationalitySelect = document.getElementById("candidate_nationality");
    displayDropdownOptions(nationalitySelect, countries, "Nationality");


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

function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}

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

// Add this function to fetch and display ranks
async function fetchAndDisplayRanks() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/others/view-rank", { headers: { "Authorization": token } });
        const ranks = response.data.ranks;

        console.log('Fetched Ranks:', ranks);

        const rankSelect = document.getElementById("candidate_c_rank");
        rankSelect.innerHTML = ""; // Clear existing options

        const defaultOption = document.createElement("option");
        defaultOption.value = ""; // Set the default value (empty in this case)
        defaultOption.text = "-- Select Rank --"; // Set the default display text
        rankSelect.add(defaultOption);

        // Check if ranks is an array before using forEach
        if (Array.isArray(ranks)) {
            ranks.forEach(rank => {
                const option = document.createElement("option");
                option.value = rank.rank; // Use the appropriate ID or value from your rank data
                option.text = rank.rank; // Use the appropriate property from your rank data
                rankSelect.add(option);
            });
        } else {
            console.error('Invalid or empty response for ranks:', response.data);
        }
    } catch (error) {
        console.error('Error fetching ranks:', error);
    }
}
// all this function when the page loads to fetch and display ranks


// Add this line to refresh ranks when needed (e.g., after adding a new rank)

// Update the fetchAndDisplayNationalities function
// Modify the fetchAndDisplayNationalities function to return the fetched countries
async function fetchAndDisplayNationalities() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/fetch-nationality", { headers: { "Authorization": token } });
        const countries = response.data.countries; // Access the array using response.data.countries
        return countries; // Return the fetched countries
    } catch (error) {
        console.error('Error fetching countries:', error);
        return []; // Return an empty array in case of an error
    }
}

// Call fetchAndDisplayNationalities once and use the returned countries for both dropdowns
// Function to display options in a dropdown
function displayDropdownOptions(dropdown, options, placeholder) {
    dropdown.innerHTML = ""; // Clear existing options

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // Set the default value (empty in this case)
    defaultOption.text = `-- Select ${placeholder} --`; // Set the default display text
    dropdown.add(defaultOption);

    // Check if options is an array before using forEach
    if (Array.isArray(options)) {
        options.forEach(option => {
            const dropdownOption = document.createElement("option");
            dropdownOption.value = option.country; // Use the appropriate ID or value from your data
            dropdownOption.text = option.country; // Use the appropriate property from your data
            dropdown.add(dropdownOption);
        });
    } else {
        console.error(`Invalid or empty options for ${placeholder}:`, options);
    }
}




// Add this line to refresh nationalities when needed (e.g., after adding a new nationality)
// Function to fetch and display vessels
async function fetchAndDisplayVessels() {
    try {
        const token = localStorage.getItem('token');
        const serverResponse = await axios.get("http://localhost:3000/others/view-vsl", { headers: { "Authorization": token } });
        const vessels = serverResponse.data.vsls;

        // Get the select element
        const vesselSelect = document.getElementById("candidate_c_vessel");

        // Clear previous options
        vesselSelect.innerHTML = '';

        // Add a default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "-- Select Vessel --";

        vesselSelect.appendChild(defaultOption);

        // Add vessels to the dropdown
        vessels.forEach((vessel) => {
            const option = document.createElement("option");
            option.value = vessel.vesselName;
            option.text = vessel.vesselName;
            vesselSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching vessels:', error);
    }
}

// client-side JavaScript (candidate.js or wherever needed)

// Function to fetch and display grades in the dropdown
async function fetchAndDisplayGrades() {
    try {
        const serverResponse = await axios.get("http://localhost:3000/others/view-grade", { headers: { "Authorization": token } });
        const grades = serverResponse.data.grades;

        // Get the dropdown element by its ID
        const gradeDropdown = document.getElementById('candidate_grade');

        // Clear existing options
        gradeDropdown.innerHTML = '';

        // Create and append a default option (optional)
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select Grade';
        gradeDropdown.add(defaultOption);

        // Iterate through grades and add them as options
        grades.forEach((grade) => {
            const option = document.createElement('option');
            option.value = grade.gradeExp;
            option.text = grade.gradeExp;
            gradeDropdown.add(option);
        });

        // Now the dropdown is populated with grade values
    } catch (error) {
        console.error('Error fetching grades:', error);
        // Handle error as needed
    }
}

// Call the function when needed

