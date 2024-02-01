const token = localStorage.getItem('token')
let currentCandidateId;
document.addEventListener("DOMContentLoaded", async function() {
    const candidateId = localStorage.getItem('memId');
    currentCandidateId=candidateId;
    await displayDropdown();
    await fetchAndDisplayVessels();
    await fetchSpecialComments(currentCandidateId, token);
    // Get the dropdown items
    let dropdownItems = document.querySelectorAll(".dropdown-item");

    // Add click event listener to each dropdown item
    dropdownItems.forEach(function(item) {
        item.addEventListener("click", function() {
            // Get the id attribute of the clicked item
            var itemId = item.id;
            const memId= localStorage.getItem('memId')
            // Define the destination URLs based on the clicked item
            var destinationPage = "";
            switch (itemId) {
                case "personnel":
                    destinationPage = `./edit-candidate-2.html?memId=${memId}`;
                    break;
                case "discussion":
                    destinationPage =`./edit-discussion.html?memId=${memId}`;
                    break;
                case "contract":
                    destinationPage = `./add-c-contract.html?memId=${memId}`;
                    break;
                case "document":
                    destinationPage = `./add-c-document.html?memId=${memId}`;
                    break;
                case "bank":
                    destinationPage = `./add-c-bank.html?memId=${memId}`;
                    break;
                case "travel":
                    destinationPage = `./add-c-travel.html?memId=${memId}`;
                    break;
                case "medicals":
                    destinationPage = `./add-c-medicals.html?memId=${memId}`;
                    break;
                case "nkd":
                    destinationPage = `./add-c-nkd.html?memId=${memId}`;
                    break;
                default:
                    // Handle default case or do nothing
                    break;
            }

            // Redirect to the destination page¯
            if (destinationPage !== "") {
                window.location.href = destinationPage;
            }
        });
    });
});

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
            document.getElementById('las_date').value = formatDate(candidateArray.las_date);

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

            // discussionElement.innerHTML = `<strong>${discussion.userName}:</strong><a style="color:gray;font-size:13px;text-decoration:none" class="float-end">${formattedDate}</a><br>${discussion.special_comments}<br><br>`;
            discussionElement.innerHTML = `<strong>${discussion.userName}:</strong><a style="color:gray;font-size:13px;text-decoration:none" class="float-end">${formattedDate}</a><br><br>`;

            discussionContainer.appendChild(discussionElement);
        });

        // Now, set the dropdown value outside the forEach loop
    } catch (error) {
        console.error('Error fetching discussion details:', error);
        // Handle error as needed
    }
}

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


document.getElementById('discussionForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const currentDate = new Date(); // Get current date and time
    const reemploymentStatusDropdown = document.getElementById('reemploymentStatus');
    const selectedReemploymentStatus = reemploymentStatusDropdown.value;

    const discussionData = {
        userId:localStorage.getItem('userId'),
        userName:localStorage.getItem('username'),
        ntbr:selectedReemploymentStatus,
        discussion_date: currentDate.toISOString() // Convert to ISO format for better compatibility
    };

    const candidateData={
        avb_date:document.getElementById('avb_date').value,
        las_date:document.getElementById('las_date').value,
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


const displayDropdown = async function () {
    const rankDropdown = document.getElementById('rank');
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

async function fetchAndDisplayVessels() {
    try {
        const token = localStorage.getItem('token');
        const serverResponse = await axios.get("http://localhost:3000/others/view-vsl", { headers: { "Authorization": token } });
        const vessels = serverResponse.data.vsls;

        // Get the select element
        const vesselSelect = document.getElementById("vessel_types");

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

async function fetchSpecialComments(candidateId, token) {
    const specialCommentsUrl = `http://localhost:3000/candidate/get-discussion/${candidateId}`;
    const candidateUrl = `http://localhost:3000/candidate/get-candidate/${candidateId}`;

    try {
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
            document.getElementById('las_date').value=formatDate(candidateArray.las_date)
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

            // discussionElement.innerHTML = `<strong>${discussion.userName}:</strong><a style="color:gray;font-size:13px;text-decoration:none" class="float-end">${formattedDate}</a><br>${discussion.special_comments}<br><br>`;
            discussionElement.innerHTML = `<strong>${discussion.userName}:</strong><a style="color:gray;font-size:13px;text-decoration:none" class="float-end">${formattedDate}</a><br><br>`;

            discussionContainer.appendChild(discussionElement);
        });

        // Now, set the dropdown value outside the forEach loop
    } catch (error) {
        console.error('Error fetching discussion details:', error);
        // Handle error as needed
    }
}

function formatDate(dateString) {
    // Assuming dateString is in the format "YYYY-MM-DD HH:mm:ss"
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});