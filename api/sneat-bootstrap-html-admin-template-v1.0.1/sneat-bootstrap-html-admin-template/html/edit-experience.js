const token = localStorage.getItem('token');

async function displayExperiences(page = 1, limit = 10) {
    try {
        // Fetch experiences from the server with pagination parameters
        const expResponse = await axios.get(`http://localhost:3000/others/view-experience?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
        const expTable = document.getElementById("exp-table");
        expTable.innerHTML = "";
        let sno = (page - 1) * limit + 1;

        // Add each experience to the table
        expResponse.data.experiences.forEach((exp, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sno + index}</td>
                <td>${exp.experience}</td>
                <td>
                    <button class="btn" onclick="editExperience('${exp.id}','${exp.experience}',event)">
                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                    </button>
                    <button class="btn" onclick="deleteExperience('${exp.id}',event)">
                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            expTable.appendChild(row);
        });

        // Display pagination controls
        const paginationControls = document.getElementById("pagination-controls");
        paginationControls.innerHTML = `<button class="btn btn-primary " onclick="displayExperiences(${page - 1}, ${limit})" ${page === 1 ? 'disabled' : ''}>Previous</button>
                                       <span>Page ${page}</span>
                                       <button class="btn btn-primary " onclick="displayExperiences(${page + 1}, ${limit})" ${expResponse.data.experiences.length < limit ? 'disabled' : ''}>Next</button>`;
    } catch (error) {
        console.error('Error:', error);
    }
}


    


window.onload = async function () {
    displayExperiences();
    const hasUserManagement = decodedToken.userManagement;
    console.log(hasUserManagement)
    if (hasUserManagement) {
      document.getElementById('userManagementSection').style.display = 'block';
      document.getElementById('userManagementSections').style.display = 'block';

    }
};




function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
const decodedToken = decodeToken(token);

async function deleteExperience(expId, event) {
    event.preventDefault();

    const id = expId;
    const url = `http://localhost:3000/others/delete-experience/${id}`;

    try {
        const response = await axios.delete(url, { headers: { "Authorization": token } });
        console.log(response);
        displayExperiences(); // Refresh the experience list after deletion
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

async function editExperience(expId, expr, event) {
    event.preventDefault();
    document.getElementById('u_experience_id').value = expId;
    document.getElementById("u_experience_name").value = expr;

    const editUrl = `edit-experience-2.html?expId=${encodeURIComponent(expId)}&expr=${encodeURIComponent(expr)}`;

    // Redirect to the editUrl
    window.location.href = editUrl;
}

// Add event listener for updating Experience
const updateExperienceButton = document.getElementById("update-experience-form");
updateExperienceButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const experienceId = document.getElementById("u_experience_id").value;

    const updatedExperienceDetails = {
        id: experienceId,
        experience: document.getElementById("u_experience_name").value,
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-experience/${experienceId}`, updatedExperienceDetails, { headers: { "Authorization": token } });
        console.log('Response:', response.data);
        alert("Experience Updated Successfully!");
        displayExperiences();
    } catch (error) {
        console.error('Error:', error);
    }
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

document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});