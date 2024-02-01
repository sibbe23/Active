const token = localStorage.getItem('token')
async function displayPortagent(page = 1, limit = 10) {
    try {
        // Fetch port agents from the server with pagination parameters
        const portAgentResponse = await axios.get(`http://localhost:3000/others/view-port-agent?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
        const portAgentTable = document.getElementById("port-agent-table");

        // Clear existing rows
        portAgentTable.innerHTML = "";
        let sno = (page - 1) * limit + 1;

        // Add each port agent to the table
        portAgentResponse.data.portAgents.forEach((portAgent, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sno + index}</td>
                <td>${portAgent.portAgentName}</td>
                <td>${portAgent.contactPerson}</td>
                <td>${portAgent.address}</td>
                <td>${portAgent.phone}</td>
                <td>${portAgent.email}</td>
                <td>${portAgent.city}</td>
                <td>${portAgent.state}</td>
                <td>${portAgent.country}</td>
                <td>
                    <button class="btn border-0" onclick="editPortagent('${portAgent.id}','${portAgent.portAgentName}','${portAgent.contactPerson}','${portAgent.address}','${portAgent.phone}','${portAgent.email}','${portAgent.city}','${portAgent.state}','${portAgent.country}',event)">
                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                    </button>
                    <button class="btn border-0" onclick="deletePortagent('${portAgent.id}',event)">
                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            portAgentTable.appendChild(row);
        });

        // Display pagination controls (if needed)
        const paginationControls = document.getElementById("pagination-controls");
        paginationControls.innerHTML = `<button class="btn btn-primary " onclick="displayPortagent(${page - 1}, ${limit})" ${page === 1 ? 'disabled' : ''}>Previous</button>
                                       <span>Page ${page}</span>
                                       <button class="btn btn-primary " onclick="displayPortagent(${page + 1}, ${limit})" ${portAgentResponse.data.portAgents.length < limit ? 'disabled' : ''}>Next</button>`;
    } catch (error) {
        console.error('Error:', error);
    }
}



window.onload = async function () {
    displayPortagent();
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

async function editPortagent(portAgentId, portAgentName, contactPerson, address, phone, email, city, state, country, event) {
    event.preventDefault();

    // Construct the URL with query parameters
    const editUrl = `edit-portagent-2.html?portAgentId=${encodeURIComponent(portAgentId)}&portAgentName=${encodeURIComponent(portAgentName)}&contactPerson=${encodeURIComponent(contactPerson)}&address=${encodeURIComponent(address)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}`;

    // Redirect to edit-portagent-2.html with the constructed URL
    window.location.href = editUrl;  // Fix: Use the constructed URL here
}



async function deletePortagent(portAgentId, event) {
    event.preventDefault();

    const id = portAgentId;
    const url = `http://localhost:3000/others/delete-port-agent/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayPortagent();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});