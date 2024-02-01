const token = localStorage.getItem('token');
let currentPage = 1; // Initialize current page

async function displayGrade(page = 1, limit = 10) {
    try {
        // Fetch grades from the server with pagination parameters
        const gradeResponse = await axios.get(`http://localhost:3000/others/view-grade?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
        const gradeTable = document.getElementById("grade-table");

        // Clear existing rows
        gradeTable.innerHTML = "";
        let sno = (page - 1) * limit + 1;

        // Add each grade to the table
        gradeResponse.data.grades.forEach((grade, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sno + index}</td>
                <td>${grade.gradeExp}</td>
                <td>
                    <button class="btn border-0" onclick="editGrade('${grade.id}','${grade.gradeExp}',event)">
                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                    </button>
                    <button class="btn border-0" onclick="deleteGrade('${grade.id}',event)">
                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            gradeTable.appendChild(row);
        });

        // Display pagination controls
        const paginationControls = document.getElementById("pagination-controls");
        paginationControls.innerHTML = `<button class="btn btn-primary" onclick="displayGrade(${page - 1}, ${limit})" ${page === 1 ? 'disabled' : ''}>Previous</button>
                                       <span>Page ${page}</span>
                                       <button class="btn btn-primary" onclick="displayGrade(${page + 1}, ${limit})" ${gradeResponse.data.grades.length < limit ? 'disabled' : ''}>Next</button>`;
    } catch (error) {
        console.error('Error:', error);
    }
}



window.onload = async function () {
     displayGrade();
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
async function deleteGrade(gradeId, event) {
    event.preventDefault();

    const id = gradeId;
    const url = `http://localhost:3000/others/delete-grade/${id}`;

    try {
        const response = await axios.delete(url, { headers: { "Authorization": token } });
        console.log(response);
        displayGrade();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

async function editGrade(gradeId, grade, event) {
    event.preventDefault();
    document.getElementById("u_grade_id").value = gradeId;
    document.getElementById("u_grade_name").value = grade;

    // Encode values for URL
    const encodedGrade = encodeURIComponent(grade);

    // Redirect to edit-grade-2.html with encoded values in the query parameters
    const editUrl = `edit-grade-2.html?gradeId=${gradeId}&grade=${encodedGrade}`;

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