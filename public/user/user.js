const token = localStorage.getItem('token')

document.getElementById("user-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("f_name").value;
    const lastName = document.getElementById("l_name").value;

    const userEmail = document.getElementById("user_email").value;
    const userPassword = document.getElementById("user_password").value;
    const userCPassword = document.getElementById("user_c_password").value;
    const userPhone = document.getElementById('user_phone').value
    const userGroup = document.getElementById("user_group").value;
    const userVendor = document.getElementById("user_vendor").value;
    const userClient = document.getElementById("user_client").value;
    const createdDate =  document.getElementById("user_created_date").value;

    const disableUser =  document.getElementById("disable_user").checked;

    


    const u_read_only =  document.getElementById("u_read_only").checked;
    const u_read_write =  document.getElementById("u_read_write").checked;
    const u_delete =  document.getElementById("u_delete").checked;
    const u_import =  document.getElementById("u_import").checked;
    const u_export =  document.getElementById("u_export").checked;
    const u_user_management =  document.getElementById("u_user_management").checked;
    const u_reports  =  document.getElementById("u_reports").checked;
    const u_all_reports =  document.getElementById("u_all_reports").checked;


    const userData = {
        userName,
        lastName,
        userEmail,
        userPassword,
        userCPassword,
        userPhone,
        userGroup,
        userVendor,
        userClient,
        createdDate,
        disableUser,
        readOnly:u_read_only,
        readWrite:u_read_write,
        deletes:u_delete,
        imports:u_import,
        exports:u_export,
        userManagement:u_user_management,
        reports:u_reports,
        allReports:u_all_reports
    };
    try {
        
        const serverResponse = await axios.post("http://localhost:3000/user/create-user", userData);
        console.log('Response:', serverResponse.data);
        displayUsers();
        // Add logic here to handle the response as needed
    } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
    }
});
const editUser = async (id, userName, lastName, userEmail, userPassword, userPhone, userGroup, userVendor, userClient, createdDate, disableUser, readOnly, readWrite, deletes, imports, exports, userManagement, reports, allReports, event) => {
    event.preventDefault();
    document.getElementById("u_user_id").value = id;
    document.getElementById("u_user_fname").value = userName;
    document.getElementById("u_user_lname").value = lastName;
    document.getElementById("u_user_email").value = userEmail;
    document.getElementById("u_user_password").value = userPassword;
    document.getElementById("u_user_c_password").value = userPassword;
    document.getElementById('u_user_phone').value = userPhone;
    document.getElementById("u_user_group").value = userGroup;
    document.getElementById("u_user_vendor").value = userVendor;
    document.getElementById("u_user_client").value = userClient;
    document.getElementById("u_user_created_date").value = createdDate;

    // Convert disableUser value to boolean and set the checkbox accordingly
    const disableUserCheckbox = document.getElementById("u_disable_user");
    disableUserCheckbox.checked = disableUser === 'true';

    const readOnlyCheckbox = document.getElementById("e_read_only");
    readOnlyCheckbox.checked = readOnly === 'true';
    const readWriteCheckbox = document.getElementById("e_read_write");
    readWriteCheckbox.checked = readWrite === 'true';
    const deleteCheckbox = document.getElementById("e_delete");
    deleteCheckbox.checked = deletes === 'true';
    const importCheckbox = document.getElementById("e_import");
    importCheckbox.checked = imports === 'true';
    const exportCheckbox = document.getElementById("e_export");
    exportCheckbox.checked = exports === 'true';
    const userManagementCheckbox = document.getElementById("e_user_management");
    userManagementCheckbox.checked = userManagement === 'true';
    const reportCheckbox = document.getElementById("e_reports");
    reportCheckbox.checked = reports === 'true';
    const reportAllCheckbox = document.getElementById("e_all_reports");
    reportAllCheckbox.checked = allReports === 'true';
};






async function displayUsers() {
    try {
        // Fetch companies from the server
        const response = await axios.get("http://localhost:3000/user/view-user", { headers: { "Authorization": token } });
        const users = response.data.users;

        const userList = document.getElementById("user-list");
        userList.innerHTML = "";
        let sno = 1;

        users.forEach(user => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td style="font-size:13px">${sno}</td>
                <td style="font-size:13px">${user.id}</td>
                <td style="font-size:13px">${user.userName}</td>
                <td style="font-size:13px">${user.lastName}</td>
                <td style="font-size:13px">${user.userEmail}</td>
                <td style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 2ch;font-size:13px; ">${user.userPassword}</td>
                <td style="font-size:13px">${user.userPhone}</td>
                <td style="font-size:13px">${user.userGroup}</td>
                <td style="font-size:13px">${user.userVendor}</td>
                <td style="font-size:13px">${user.userClient}</td>
                <td style="font-size:13px;">${user.createdDate}</td>
                <td style="font-size:13px">${user.disableUser}</td>
                <td style="font-size:13px">
                    ${shouldDisplayButtons(user.id) ? renderEditDeleteButtons(user) : ''}
                </td>
            `;

            userList.appendChild(row);
            sno++;
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

function shouldDisplayButtons(userId) {
    // Replace 'userId' with the actual property in your decoded token that represents the user ID
    const loggedInUserId = decodedToken.userId;

    // Return true if the logged-in user's ID is different from the user being displayed
    return loggedInUserId !== userId;
}

function renderEditDeleteButtons(user) {
    return `
        <button class="btn " style="border:none;color:gray" onclick="editUser('${user.id}', '${user.userName}', '${user.lastName}', '${user.userEmail}', '${user.userPassword}', '${user.userPhone}', '${user.userGroup}', '${user.userVendor}', '${user.userClient}', '${user.createdDate}', '${user.disableUser}', '${user.readOnly}', '${user.readWrite}', '${user.deletes}', '${user.imports}', '${user.exports}', '${user.userManagement}', '${user.reports}', '${user.allReports}', event)">
            <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
        </button>
        <button class="btn" style="border:none;color:gray" onclick="deleteUser('${user.id}', event)">
            <i style="font-size:15px" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa">&#xf014;</i>
        </button>
    `;
}


const updateUserButton = document.getElementById("edit-user-form");
updateUserButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId = document.getElementById("u_user_id").value;
    const updatedUserDetails = {
        id: userId,
        userName: document.getElementById("u_user_fname").value,
        lastName: document.getElementById("u_user_lname").value,
        userEmail: document.getElementById("u_user_email").value,
        userPassword: document.getElementById("u_user_password").value,
        userPhone: document.getElementById('u_user_phone').value,
        userGroup: document.getElementById("u_user_group").value,
        userVendor: document.getElementById("u_user_vendor").value,
        userClient: document.getElementById("u_user_client").value,
        createdDate: document.getElementById("u_user_created_date").value,
        disableUser: document.getElementById("u_disable_user").checked,
          readOnly:document.getElementById("e_read_only").checked,
    readWrite:document.getElementById("e_read_write").checked,
    deletes:document.getElementById("e_delete").checked,
    imports:document.getElementById("e_import").checked,
    exports:document.getElementById("e_export").checked,
    userManagement:document.getElementById("e_user_management").checked,
    reports:document.getElementById("e_reports").checked,
    allReports:document.getElementById("e_all_reports").checked,
    };
    
  

console.log(updatedUserDetails)
    try {
        const response = await axios.put(`http://localhost:3000/user/update-user/${userId}`, updatedUserDetails);
        console.log('Response:', response.data);
        alert("User Updated Successfully!");
        displayUsers();
    } catch (error) {
        console.error('Error:', error);
    }
});



window.onload = async function () {
    try {
        // Fetch and display vendors and companies

        fetchAndDisplayVendors("user_vendor");
        fetchAndDisplayCompanies("user_client");
        fetchAndDisplayVendors("user_vendors"); // Add this line for the edit user form
        fetchAndDisplayCompanies("user_clients");
        // Display user data
        displayUsers();

        const userDisplay = document.getElementById("user_names");
        userDisplay.innerHTML += localStorage.getItem('username');
    } catch (err) {
        console.log(err);
    }
};



const deleteUser = async(ids,event)=>{
    event.preventDefault();

    const id = ids;
    const url = `http://localhost:3000/user/delete-user/${id}`;

    try {
        const response = await axios.delete(url);
        console.log(response);
        displayUsers();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

const logout = document.getElementById("logout")


logout.addEventListener("click",()=>{
        localStorage.clear();

    window.location.href ="../login/login.html"
})


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


let userGroupSelect = document.getElementById("user_group");

// Define options to be added
if(userRole==='vendor')
{
    const roles = [ "Vendor", "User"];
    for (let i = 0; i < roles.length; i++) {
        let option = document.createElement("option");
        option.value = roles[i].toLowerCase(); // Set the value
        option.text = roles[i]; // Set the display text
        userGroupSelect.add(option); // Add the option to the select element
    }

}
else{
    const roles = ["Admin", "Vendor", "User"];
    for (let i = 0; i < roles.length; i++) {
        let option = document.createElement("option");
        option.value = roles[i].toLowerCase(); // Set the value
        option.text = roles[i]; // Set the display text
        userGroupSelect.add(option); // Add the option to the select element
    }
}

let userEditGroupSelect = document.getElementById("u_user_group");
if(userRole==='vendor')
{
    const roles = [ "Vendor", "User"];
    for (let i = 0; i < roles.length; i++) {
        let option = document.createElement("option");
        option.value = roles[i].toLowerCase(); // Set the value
        option.text = roles[i]; // Set the display text
        userEditGroupSelect.add(option); // Add the option to the select element
    }

}
else{
    const roles = ["Admin", "Vendor", "User"];
    for (let i = 0; i < roles.length; i++) {
        let option = document.createElement("option");
        option.value = roles[i].toLowerCase(); // Set the value
        option.text = roles[i]; // Set the display text
        userEditGroupSelect.add(option); // Add the option to the select element
    }
}

// Loop through the roles and add options to the select element

// Fetch Vendor Data
// Fetch Vendor Data for Edit User Form
// Common function to fetch and display vendors
async function fetchAndDisplayVendors(selectId) {
    try {
        const response = await axios.get("http://localhost:3000/others/view-vendor", { headers: { "Authorization": token } });
        const vendors = response.data.vendors;

        console.log('Vendors:', vendors);

        const vendorSelect = document.getElementById(selectId);
        vendorSelect.innerHTML = '<option value="" disabled selected>-- Select Vendor --</option>'; // Reset and add default option

        vendors.forEach(vendor => {
            const option = document.createElement("option");
            option.value = vendor.id;
            option.text = vendor.vendorName;
            vendorSelect.add(option);
        });
    } catch (error) {
        console.error('Error fetching vendors:', error);
    }
}

// Common function to fetch and display companies
async function fetchAndDisplayCompanies(selectId) {
    try {
        const response = await axios.get("http://localhost:3000/company/view-company", { headers: { "Authorization": token } });
        const companies = response.data.company;

        console.log('Companies:', companies);

        const companySelect = document.getElementById(selectId);
        companySelect.innerHTML = '<option value="" disabled selected>-- Select Client --</option>'; // Reset and add default option

        if (Array.isArray(companies) && companies.length > 0) {
            companies.forEach(company => {
                const option = document.createElement("option");
                option.value = company.company_id;
                option.text = company.company_name;
                companySelect.add(option);
            });
        } else {
            console.error('Invalid or empty response for companies:', response.data);
        }
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}

// Call these functions where needed
 // Add this line for the edit user form
