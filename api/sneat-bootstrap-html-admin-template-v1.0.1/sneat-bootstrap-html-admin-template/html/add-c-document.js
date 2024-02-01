const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', async function () {
    const candidateId = localStorage.getItem('memId');
    fetchAndDisplayDocumentDetails(candidateId);

        
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
    
// Function to fetch data from the server and populate the table
async function fetchAndDisplayDocumentDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-document-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const documentDetails = response.data;

        const documentTableBody = document.getElementById('documentTableBody');
        documentTableBody.innerHTML = ''; // Clear existing rows

        documentDetails.forEach(doc => {
            const row = document.createElement('tr');

            // Add data to each cell
            row.innerHTML = `
                <td>${doc.document}</td>
                <td>${doc.document_number}</td>
                <td>${doc.issue_date}</td>
                <td>${doc.issue_place}</td>
                <td>${doc.document_files}</td>
                <td>${doc.stcw}</td>
                <td>
                    <button onclick="editDocument('${doc.id}','${doc.document}','${doc.document_number}','${doc.issue_date}','${doc.issue_place}','${doc.document_files}','${doc.stcw}')">Edit</button>
                    <button onclick="deleteDocument('${doc.id}')">Delete</button>
                </td>
            `;

            documentTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching document details:', error);
    }
}

// Edit document function
// Edit document function
function editDocument(documentId, documents, documentNumber, issueDate, issuePlace, documentFiles, stcw) {
    // Redirect to the edit-c-document.html page with parameters
    const memId = localStorage.getItem('memId');
    window.location.href = `./edit-c-document.html?memId=${memId}&documentId=${documentId}&documents=${documents}&documentNumber=${documentNumber}&issueDate=${issueDate}&issuePlace=${issuePlace}&documentFiles=${documentFiles}&stcw=${stcw}`;
}


// Delete document function
function deleteDocument(documentId) {
    // Implement your delete functionality here using the documentId
    console.log('Delete clicked for document ID:', documentId);
}

const documentForm = document.getElementById('documentForm');

documentForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = localStorage.getItem('memId')
    const formData = {
        document: document.getElementById('documents').value,
        document_number: document.getElementById('document_number').value,
        issue_date: document.getElementById('issue_date').value,
        issue_place: document.getElementById('issue_place').value,
        document_files: document.getElementById('document_files').value,
        stcw: document.getElementById('stcw').value,
    };
    console.log(formData)
    try {
        const response = await axios.post(`http://localhost:3000/candidate/document-details/${id}`, formData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        console.log('Document added successfully:', response.data);
        fetchAndDisplayDocumentDetails(id);

        // Redirect to the destination page
    } catch (error) {
        console.error('Error adding document:', error);
        // Handle error and display appropriate messages to the user
    }
});

document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});