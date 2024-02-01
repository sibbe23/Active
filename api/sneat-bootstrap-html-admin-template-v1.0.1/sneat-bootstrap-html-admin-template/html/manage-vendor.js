const token = localStorage.getItem('token')
// Fetch and display vendors
async function fetchAndDisplayVendors() {
    try {
        const token = localStorage.getItem('token');

        // Fetch vendor data from the server using Axios with async/await
        const response = await axios.get('http://localhost:3000/others/view-vendor', {
            headers: { "Authorization": token }
        });

        // Extract vendors from the response
        const vendors = response.data;

        // Display vendors in the table
        displayVendors(vendors);
    } catch (error) {
        console.error('Error fetching vendors', error);
    }
}

// Display vendors in the table
// Display vendors in the table
function displayVendors(response) {
    const vendorListElement = document.getElementById('vendor-list');

    // Clear existing rows
    vendorListElement.innerHTML = '';

    // Check if the response has a "vendors" key
    if (response.vendors) {
        const vendors = response.vendors;

        // Iterate over vendors and create table rows
        vendors.forEach(vendor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vendor.id}</td>
                <td>${vendor.vendorName}</td>
                <td>${vendor.vendorAddress}</td>
                <td>
                    <button onclick="editVendor('${vendor.id}','${vendor.vendorName}','${vendor.vendorAddress}',event)">Edit</button>
                    <button onclick="deleteVendor(${vendor.id})">Delete</button>
                </td>
            `;
            vendorListElement.appendChild(row);
        });
    } else {
        console.error('No "vendors" key found in the response:', response);
    }
}

// Call the fetchAndDisplayVendors function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayVendors();
    const hasUserManagement = decodedToken.userManagement;
    console.log(hasUserManagement)
    if (hasUserManagement) {
      document.getElementById('userManagementSection').style.display = 'block';
      document.getElementById('userManagementSections').style.display = 'block';

    }
});

document.getElementById('addVendorButton').addEventListener('click', async () => {
    try {
        // Get form data
        const vendorName = document.getElementById('vendorName').value;
        const vendorAddress = document.getElementById('vendorAddress').value;

        // Create data object
        const formData = {
            vendorName: vendorName,
            vendorAddress: vendorAddress
        };

        // Send data to the server using Axios with async/await
        const response = await axios.post('http://localhost:3000/others/create-vendor', formData,{headers:{"Authorization":token}});

        // Handle success, e.g., show a success message or redirect to another page
        console.log('Vendor added successfully', response.data);
    } catch (error) {
        // Handle error, e.g., show an error message
        console.error('Error adding vendor', error);
    }
});

async function editVendor(vendorId, vendorName, vendorAddress, event) {
    event.preventDefault();
    
    console.log('Edit clicked for vendor ID:', vendorId);

    // Encode values for URL
    const encodedVendorName = encodeURIComponent(vendorName);
    const encodedVendorAddress = encodeURIComponent(vendorAddress);

    // Construct the editUrl with encoded values in the query parameters
    const editUrl = `edit-vendor.html?vendorId=${vendorId}&vendorName=${encodedVendorName}&vendorAddress=${encodedVendorAddress}`;

    // Log the generated URL for debugging
    console.log('Edit URL:', editUrl);

    // Redirect to the editUrl
    window.location.href = editUrl;
}


// Delete vendor functionality
async function deleteVendor(vendorId) {
    try {
        const token = localStorage.getItem('token');
        
        // Send a delete request to the server
        const response = await axios.delete(`http://localhost:3000/others/delete-vendor/${vendorId}`, {
            headers: { "Authorization": token }
        });

        // Handle success, e.g., update the UI or show a success message
        console.log('Vendor deleted successfully', response.data);

        // Fetch and display updated vendors after deletion
        fetchAndDisplayVendors();
    } catch (error) {
        // Handle error, e.g., show an error message
        console.error('Error deleting vendor', error);
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


    
    





function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
const decodedToken = decodeToken(token);