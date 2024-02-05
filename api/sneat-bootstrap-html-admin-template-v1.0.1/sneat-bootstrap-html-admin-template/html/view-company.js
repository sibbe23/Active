
const token = localStorage.getItem('token');


window.onload = async function () {
   try{
    displayCompanies()
    const hasUserManagement = decodedToken.userManagement;
    console.log(hasUserManagement)
    if (hasUserManagement) {
      document.getElementById('userManagementSection').style.display = 'block';
      document.getElementById('userManagementSections').style.display = 'block';

    }
   }
   catch(err){
    console.log('No entries present')
    console.log(err);
   }
    // try {
       
    //     const userDisplay=document.getElementById("user_name");
    // userDisplay.innerHTML+=localStorage.getItem('username');
    // } catch (error) {
    //     console.error('Error:', error);
    // }
};

    





function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
const decodedToken = decodeToken(token);





// Update the displayCompanies function for client-side pagination
async function displayCompanies(page = 1, limit = 10) {
    try {
        // Fetch companies from the server with pagination parameters
        const response = await axios.get(`http://localhost:3000/company/view-company?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
        const companies = response.data.company;

        const companyList = document.getElementById("company-list");
        companyList.innerHTML = "";
        let sno = (page - 1) * limit + 1;

        companies.forEach(company => {
            const row = document.createElement("tr");

            row.innerHTML = `
            
                <td>${sno}</td>
                <td>${company.company_id}</td>
                <td>${company.company_name}</td>
                <td>${company.b_type}</td>
                <td>${company.contact_person}</td>
                <td>${company.email}</td>
                <td>${company.address}</td>
                <td>${company.management}</td>
                <td>${company.phone}</td>
                <td>${formatDate(company.last_update)}</td>
                <td>
                    <button class="btn border-0 m-0 p-0" onclick="editCompany('${company.company_id}','${company.company_name}','${company.b_type}','${company.contact_person}','${company.email}','${company.address}','${company.management}','${company.phone}','${company.last_update}',event)"><i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i></button>
                    <button class="btn border-0 m-0 p-0" onclick="deleteCompany('${company.company_id}', event)"><i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i></button>
                </td>
                
            `;

            companyList.appendChild(row);
            sno++;
        });

// Display pagination controls (you can customize this part based on your UI framework)
// const paginationControls = document.getElementById("pagination-controls");

// // Initialize the HTML content for pagination controls
// let paginationHTML = `<nav aria-label="Page navigation" class="d-flex justify-content-start">
//                         <ul class="pagination">
//                             <li class="page-item ${page === 1 ? 'disabled' : ''}">
//                                 <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(1, ${limit})">
//                                     <i class="tf-icon bx bx-chevrons-left"></i>
//                                 </a>
//                             </li>
//                             <li class="page-item ${page === 1 ? 'disabled' : ''}">
//                                 <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(${page - 1}, ${limit})">
//                                     <i class="tf-icon bx bx-chevron-left"></i>
//                                 </a>
//                             </li>`;

// // Generate the page number buttons
// for (let i = 1; i <= Math.ceil(response.data.totalPages); i++) {
//     paginationHTML += `<li class="page-item ${page === i ? 'active' : ''}">
//                           <a class="page-link"  onclick="displayCompanies(${i}, ${limit})">${i}</a>
//                       </li>`;
// }

// paginationHTML += `<li class="page-item ${page === Math.ceil(response.data.totalPages) ? 'disabled' : ''}">
//                     <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(${page + 1}, ${limit})">
//                         <i class="tf-icon bx bx-chevron-right"></i>
//                     </a>
//                 </li>
//                 <li class="page-item ${page === Math.ceil(response.data.totalPages) ? 'disabled' : ''}">
//                     <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(${Math.ceil(response.data.totalPages)}, ${limit})">
//                         <i class="tf-icon bx bx-chevrons-right"></i>
//                     </a>
//                 </li>
//                 <span class='mt-2  '> Showing ${page} of ${Math.ceil(response.data.totalPages)} pages </span>

//             </ul>
//         </nav>
//         `;

// // Set the generated HTML to paginationControls
// paginationControls.innerHTML = paginationHTML;

        // Display pagination controls (you can customize this part based on your UI framework)
const paginationControls = document.getElementById("pagination-controls");

// Initialize the HTML content for pagination controls
let paginationHTML = `<nav aria-label="Page navigation" class="d-flex justify-content-start">
                        <ul class="pagination">
                            <li class="page-item ${page === 1 ? 'disabled' : ''}">
                                <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(1, ${limit})">
                                    <i class="tf-icon bx bx-chevrons-left"></i>
                                </a>
                            </li>
                            <li class="page-item ${page === 1 ? 'disabled' : ''}">
                                <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(${page - 1}, ${limit})">
                                    <i class="tf-icon bx bx-chevron-left"></i>
                                </a>
                            </li>`;

// Maximum number of buttons to display (including ellipsis)
const maxButtons = 4;

// Display the page buttons
for (let i = 1; i <= Math.ceil(response.data.totalPages); i++) {
    if (
        i === 1 ||                                  // First page
        i === Math.ceil(response.data.totalPages) ||  // Last page
        (i >= page - 1 && i <= page + maxButtons - 2) // Displayed pages around the current page
    ) {
        paginationHTML += `<li class="page-item ${page === i ? 'active' : ''}">
                              <a class="page-link"  onclick="displayCompanies(${i}, ${limit})">${i}</a>
                          </li>`;
    } else if (i === page + maxButtons - 1) {
        // Add ellipsis (...) before the last button
        paginationHTML += `<li class="page-item disabled">
                              <span class="page-link">...</span>
                          </li>`;
    }
}

paginationHTML += `<li class="page-item ${page === Math.ceil(response.data.totalPages) ? 'disabled' : ''}">
                    <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(${page + 1}, ${limit})">
                        <i class="tf-icon bx bx-chevron-right"></i>
                    </a>
                </li>
                <li class="page-item ${page === Math.ceil(response.data.totalPages) ? 'disabled' : ''}">
                    <a class="page-link" href="javascript:void(0);" onclick="displayCompanies(${Math.ceil(response.data.totalPages)}, ${limit})">
                        <i class="tf-icon bx bx-chevrons-right"></i>
                    </a>
                </li>
                <span class='mt-2'> Showing ${page} of ${Math.ceil(response.data.totalPages)} pages </span>

            </ul>
        </nav>
        `;

// Set the generated HTML to paginationControls
paginationControls.innerHTML = paginationHTML;

    } catch (error) {
        console.error('Error:', error);
    }
}



async function deleteCompany(companyId, event) {
    event.preventDefault(); // Prevent default form submission behavior

    let id = companyId;
    console.log(id);
    const url = `http://localhost:3000/company/delete-company/${id}`;
    console.log(url);
 
    try {
       const response = await axios.delete(url,{headers:{"Authorization":token}});
       console.log(response);
        displayCompanies();
    } catch (error) {
       console.error('Error during delete request:', error.message);
    }
};

function formatDate(dateString) {
    // Assuming dateString is in the format "YYYY-MM-DD HH:mm:ss"
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }









const editCompany = async (companyId, companyname, b_type, contact_person, email, address, management, phone, last_update, event) => {
    event.preventDefault();
    
    // Set the radio button based on the b_type value (converted to lowercase)
    console.log(`u_${b_type.toLowerCase()}`)

    document.getElementById(`u_${b_type.toLowerCase()}`).checked = true;
    // Create an object with the values to pass as query parameters
    const queryParams = {
        companyId,
        companyname,
        b_type,
        contact_person,
        email,
        address,
        management,
        phone,
        last_update: formatDate(last_update),
    };

    // Construct the query string from the object
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    // Redirect to the edit-company.html page with the query string
    window.location.href = `./edit-company.html?${queryString}`;
};











function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}


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

document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});