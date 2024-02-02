const token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', async function () {
   await displayDropdown()
   await fetchAndDisplayNationalities()
   await fetchAndDisplayVessels()
   await  fetchAndDisplayGrades()
   await fetchAndDisplayExp()
   const hasUserManagement = decodedToken.userManagement;
    console.log(hasUserManagement)
    if (hasUserManagement) {
      document.getElementById('userManagementSection').style.display = 'block';
      document.getElementById('userManagementSections').style.display = 'block';

    }
    // Fetch additional data and update the form if needed
    const countries = await fetchAndDisplayNationalities();

    // Display nationalities in the License Country dropdown
    const countrySelect = document.getElementById("candidate_I_country");
    displayDropdownOptions(countrySelect, countries, "License Country");

    // Display nationalities in the Nationality dropdown
    const nationalitySelect = document.getElementById("candidate_nationality");
    displayDropdownOptions(nationalitySelect, countries, "Nationality");

    // Add any other initialization or data fetching logic you need
});

async function fetchAndDisplayExp() {
    try {
        const serverResponse = await axios.get("http://localhost:3000/others/view-experience", { headers: { "Authorization": token } });
        const experiences = serverResponse.data.experiences; // Access the array using response.data.experiences

        // Check if experiences is an array
        if (Array.isArray(experiences)) {
            // Get the dropdown element by its ID
            const expDropdown = document.getElementById('candidate_experience');

            // Clear existing options
            expDropdown.innerHTML = '';

            // Create and append a default option (optional)
            const defaultOption = document.createElement('option');
            defaultOption.text = 'Select Experience';
            expDropdown.add(defaultOption);

            // Iterate through experiences and add them as options
            experiences.forEach((exp) => {
                const option = document.createElement('option');
                option.value = exp.experience; // Use the appropriate property from your data
                option.text = exp.experience; // Use the appropriate property from your data
                expDropdown.add(option);
            });

            // Now the dropdown is populated with experience values
        } else {
            console.error('Invalid or empty experiences:', experiences);
        }
    } catch (error) {
        console.error('Error fetching experiences:', error);
        // Handle error as needed
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
function displayDropdownOptions(dropdown, options, placeholder) {
    dropdown.innerHTML = ""; // Clear existing options

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // Set the default value (empty in this case)
    defaultOption.text = `-- Select ${placeholder} --`; // Set the default display text
    dropdown.appendChild(defaultOption);

    // Check if options is an array before using forEach
    if (Array.isArray(options)) {
        options.forEach(option => {
            const dropdownOption = document.createElement("option");
            dropdownOption.value = option.country; // Use the appropriate ID or value from your data
            dropdownOption.text = option.country; // Use the appropriate property from your data
            dropdown.appendChild(dropdownOption);
        });
    } else {
        console.error(`Invalid or empty options for ${placeholder}:`, options);
    }
}

const displayDropdown = async function () {
    const rankDropdown = document.getElementById('candidate_c_rank');
    rankDropdown.innerHTML = ''; // Clear existing options

    // Add the default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '-- Select Rank --';
    rankDropdown.appendChild(defaultOption);

    const rankResponse = await axios.get("http://localhost:3000/others/view-rank", { headers: { "Authorization": token } });
    const rankOptions = rankResponse.data.ranks;
    const rankNames = rankOptions.map(rank => rank.rank);

    for (let i = 0; i < rankNames.length; i++) {
        const option = document.createElement('option');
        option.value = rankNames[i];
        option.text = rankNames[i];
        rankDropdown.appendChild(option);
    }
}

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

const addcandidateButton = document.getElementById("candidate-form");
addcandidateButton.addEventListener("submit", async(e) =>{
    e.preventDefault() // Prevent the default form submission behavior

    
    
    const candidate_details = {
        fname: document.getElementById('candidate_fname').value,
        lname: document.getElementById('candidate_lname').value,
        c_rank: document.getElementById('candidate_c_rank').value,
        avb_date: document.getElementById('candidate_avb_date').value,
        nationality: document.getElementById('candidate_nationality').value,
        company_status: document.getElementById('candidate_company_status').value,
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
        m_status: document.getElementById('company_status').value,
        group: document.getElementById('candidate_group').value,
        vendor: document.getElementById('candidate_vendor').value ,
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


        nemo_source: document.getElementById('nemo_source').value || null,

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
        // addcandidateButton.reset();
        alert("Candidate Added Successfully!");
    } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
    }
    console.log(candidate_details);
    // Now you can use axios to send the data to the server if needed
});

// const findStudentsWithUpcomingBirthdays = async () => {
//     const currentDate = new Date();
  
//     const upcomingBirthdays = await Candidate.findAll({
//       where: {
//         dob: {
//           [Op.between]: [
//             new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000),
//             new Date(currentDate.getTime() + 16 * 24 * 60 * 60 * 1000),
//           ],
//         },
//       },
//     });
  
//     return upcomingBirthdays;
//   };
  
//   // Example usage of the function
//   findStudentsWithUpcomingBirthdays()
document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
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