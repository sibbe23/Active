const token = localStorage.getItem('token')

let currentPage = 1; // Initialize current page

async function displayPort(page = 1, limit = 10) {
    try {
        // Fetch ports from the server with pagination parameters
        const portResponse = await axios.get(`http://localhost:3000/others/view-port?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
        const portTable = document.getElementById("port-table");

        // Clear existing rows
        portTable.innerHTML = "";
        let sno = (page - 1) * limit + 1;

        // Add each port to the table
        portResponse.data.ports.forEach((port, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sno + index}</td>
                <td>${port.portName}</td>
                <td>
                    <button class="btn" onclick="editPort('${port.id}','${port.portName}',event)">
                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                    </button>
                    <button class="btn" onclick="deletePort('${port.id}',event)">
                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            portTable.appendChild(row);
        });

        // Display pagination controls
        const paginationControls = document.getElementById("pagination-controls");
        paginationControls.innerHTML = `<button class="btn btn-primary " onclick="displayPort(${page - 1}, ${limit})" ${page === 1 ? 'disabled' : ''}>Previous</button>
                                       <span>Page ${page}</span>
                                       <button class="btn btn-primary " onclick="displayPort(${page + 1}, ${limit})" ${portResponse.data.ports.length < limit ? 'disabled' : ''}>Next</button>`;
    } catch (error) {
        console.error('Error:', error);
    }
}


window.onload = async function () {
     displayPort();
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


async function editPort(portId, portName, event) {
    event.preventDefault();
    
    // Encode values for URL
    const encodedPortName = encodeURIComponent(portName);

    // Redirect to edit-port-2.html with encoded values in the query parameters
    const editUrl = `edit-port-2.html?portId=${portId}&portName=${encodedPortName}`;

    // Redirect to the editUrl
    window.location.href = editUrl;
}

async function deletePort(portId, event) {
    event.preventDefault();

    const id = portId;
    const url = `http://localhost:3000/others/delete-port/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayPort();
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