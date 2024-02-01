const token = localStorage.getItem('token')
let currentPage=1;
async function displayDocument(page=1,limit=10) {
    try {
        const portResponse = await axios.get(`http://localhost:3000/others/view-document?page=${page}&limit=${limit}`,{headers:{"Authorization":token}});
        const portTable = document.getElementById("document-table");
        portTable.innerHTML = "";
        let sno = (page - 1) * limit + 1;
        // Add each VSL to the table
        portResponse.data.documents.forEach((port,index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno+index}</td>
            <td>${port.documentType}</td>
            <td>${port.hideExpiryDate}</td>
            
            <td>
                <button class="btn " onclick="editDocument('${port.id}','${port.documentType}','${port.hideExpiryDate}',event)">                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                </button>
                <button class="btn " onclick="deleteDocument('${port.id}',event)">                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                </button>
            </td>
        `;

            portTable.appendChild(row);
            
        })
        const paginationControls = document.getElementById("pagination-controls");
        paginationControls.innerHTML = `<button class="btn btn-primary" onclick="displayDocument(${page - 1}, ${limit})" ${page === 1 ? 'disabled' : ''}>Previous</button>
                                       <span>Page ${page}</span>
                                       <button class="btn btn-primary" onclick="displayDocument(${page + 1}, ${limit})" ${portResponse.data.documents.length < limit ? 'disabled' : ''}>Next</button>`;

    } catch (error) {
        console.error('Error:', error);
    }
}

window.onload=async function(){
    displayDocument();
    const hasUserManagement = decodedToken.userManagement;
    console.log(hasUserManagement)
    if (hasUserManagement) {
      document.getElementById('userManagementSection').style.display = 'block';
      document.getElementById('userManagementSections').style.display = 'block';

    }
}

async function deleteDocument(documentId, event) {
    event.preventDefault();

    const id = documentId;
    const url = `http://localhost:3000/others/delete-document/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayDocument();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}
async function editDocument(id, doctype, expirydate, event) {
    event.preventDefault();

    // Set values in the form for submission
    document.getElementById("u_document_type_id").value = id;
    document.getElementById("u_document_type_name").value = doctype;

    // Encode values for URL
    const encodedDoctype = encodeURIComponent(doctype);
    const encodedExpirydate = encodeURIComponent(expirydate);

    // Redirect to edit-document-2.html with encoded values in the query parameters
    const editUrl = `edit-document-2.html?id=${id}&doctype=${encodedDoctype}&expirydate=${encodedExpirydate}`;

    // Redirect to the editUrl
    window.location.href = editUrl;
}


// Add event listener for updating Document Type
document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});

   





function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
const decodedToken = decodeToken(token);