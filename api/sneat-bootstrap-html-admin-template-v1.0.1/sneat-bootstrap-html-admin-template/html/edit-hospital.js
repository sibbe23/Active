const token = localStorage.getItem('token');
let currentHospitalPage = 1; // Initialize current page for hospitals

async function displayHospital(page = 1, limit = 10) {
    try {
        // Fetch hospitals from the server with pagination parameters
        const hospitalResponse = await axios.get(`http://localhost:3000/others/view-hospital?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
        const hospitalTable = document.getElementById("hospital-table");

        // Clear existing rows
        hospitalTable.innerHTML = "";
        let sno = (page - 1) * limit + 1;

        // Add each hospital to the table
        hospitalResponse.data.hospitals.forEach((hospital, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sno + index}</td>
                <td>${hospital.hospitalName}</td>
                <td>${hospital.doctorName}</td>
                <td>${hospital.doctorAddress}</td>
                <td>${hospital.doctorCity}</td>
                <td>${hospital.doctorState}</td>
                <td>${hospital.doctorPhone}</td>
                <td>${hospital.doctorEmail}</td>
                <td>${hospital.doctorUpload}</td>
                <td>
                    <button class="btn" onclick="editHospital('${hospital.id}','${hospital.hospitalName}','${hospital.doctorName}','${hospital.doctorAddress}','${hospital.doctorCity}','${hospital.doctorState}','${hospital.doctorPhone}','${hospital.doctorEmail}','${hospital.doctorUpload}',event)">
                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                    </button>
                    <button class="btn" onclick="deleteHospital('${hospital.id}',event)">
                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            hospitalTable.appendChild(row);
        });

        // Display pagination controls for hospitals
        const hospitalPaginationControls = document.getElementById("pagination-controls");
        hospitalPaginationControls.innerHTML = `<button class="btn btn-primary " onclick="displayHospital(${page - 1}, ${limit})" ${page === 1 ? 'disabled' : ''}>Previous</button>
                                                <span>Page ${page}</span>
                                                <button class="btn btn-primary " onclick="displayHospital(${page + 1}, ${limit})" ${hospitalResponse.data.hospitals.length < limit ? 'disabled' : ''}>Next</button>`;
    } catch (error) {
        console.error('Error:', error);
    }
}


window.onload = async function () {
  displayHospital();
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


async function deleteHospital(hospitalId, event) {
    event.preventDefault();

    const id = hospitalId;
    const url = `http://localhost:3000/others/delete-hospital/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayHospital();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}
async function editHospital(id, hospitalName, doctorName, doctorAddress, doctorCity, doctorState, doctorPhone, doctorEmail, doctorUpload, event) {
    event.preventDefault();

    // Set values in the form for submission
    document.getElementById("u_hospital_id").value = id;
    document.getElementById("u_hospital_name").value = hospitalName;
    document.getElementById("u_doctor_name").value = doctorName;
    document.getElementById("u_doctor_address").value = doctorAddress;
    document.getElementById("u_doctor_city").value = doctorCity;
    document.getElementById("u_doctor_state").value = doctorState;
    document.getElementById("u_doctor_phone").value = doctorPhone;
    document.getElementById("u_doctor_email").value = doctorEmail;
    // document.getElementById("u_doctor_upload").value = doctorUpload;

    // Encode values for URL
    const encodedHospitalName = encodeURIComponent(hospitalName);
    const encodedDoctorName = encodeURIComponent(doctorName);
    const encodedDoctorAddress = encodeURIComponent(doctorAddress);
    const encodedDoctorCity = encodeURIComponent(doctorCity);
    const encodedDoctorState = encodeURIComponent(doctorState);
    const encodedDoctorPhone = encodeURIComponent(doctorPhone);
    const encodedDoctorEmail = encodeURIComponent(doctorEmail);
    const encodedDoctorUpload = encodeURIComponent(doctorUpload);

    // Redirect to edit-hospital-2.html with encoded values in the query parameters
    const editUrl = `edit-hospital-2.html?id=${id}&hospitalName=${encodedHospitalName}&doctorName=${encodedDoctorName}&doctorAddress=${encodedDoctorAddress}&doctorCity=${encodedDoctorCity}&doctorState=${encodedDoctorState}&doctorPhone=${encodedDoctorPhone}&doctorEmail=${encodedDoctorEmail}&doctorUpload=${encodedDoctorUpload}`;

    // Redirect to the editUrl
    window.location.href = editUrl;
}

document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});