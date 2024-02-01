document.getElementById("report-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get selected report type
    const reportType = document.getElementById("reportTypes").value;

    // Get date range
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    // Get selected report type
    const reportTypeValue = document.getElementById("reportType").value;

    // Collect selected checkboxes
    const checkboxes = {
        nemoId: document.getElementById("chkNemoId").checked,
        name: document.getElementById("chkName").checked,
        rank: document.getElementById("chkRank").checked,
        vesselType: document.getElementById("chkVesselType").checked,
        address: document.getElementById("chkAddress").checked,
        city: document.getElementById("chkCity").checked,
        nationality: document.getElementById("chkNationality").checked,
        contactNumber: document.getElementById("chkContactNumber").checked,
        prevCompany: document.getElementById("chkPrevCompany").checked,
        email: document.getElementById("chkEmail").checked,
        lastSalary: document.getElementById("chkLastSalary").checked,
        experience: document.getElementById("chkExperience").checked,
        dob: document.getElementById("chkDOB").checked,
        availability: document.getElementById("chkAvailability").checked,
        height: document.getElementById("chkHeight").checked,
        weight: document.getElementById("chkWeight").checked,
        safetyShoeSize: document.getElementById("chkSafetyShoeSize").checked,
        boilerSuitSize: document.getElementById("chkBoilerSuitSize").checked,
    };

    // Prepare data to send to the server
    const requestData = {
        reportType,
        fromDate,
        toDate,
        reportType: reportTypeValue,
        checkboxes,
    };

    // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint
    const serverEndpoint = 'YOUR_SERVER_ENDPOINT';

    // Send data to the server using Axios
    axios.post(serverEndpoint, requestData)
        .then(response => {
            console.log('Server Response:', response.data);
            // Handle the response as needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors as needed
        });
});




const logout = document.getElementById("logout")


logout.addEventListener("click",()=>{
    localStorage.clear();

    window.location.href ="../login/login.html"
})

window.onload = async function () {
    const userDisplay=document.getElementById("user_name");
    userDisplay.innerHTML+=localStorage.getItem('username');
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
