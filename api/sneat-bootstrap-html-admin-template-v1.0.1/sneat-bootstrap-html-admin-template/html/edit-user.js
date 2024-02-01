const token = localStorage.getItem('token');
let id;
document.addEventListener('DOMContentLoaded', async function () {
    // Function to get query parameters from URL
    function getQueryParameters() {
        const queryParams = new URLSearchParams(window.location.search);
        const params = {};
        for (const [key, value] of queryParams) {
            params[key] = value;
        }
        return params;
    }

    // Fetch query parameters
    const queryParams = getQueryParameters();

    // Function to set value in an input field
    function setInputValue(id, value) {
        const inputField = document.getElementById(id);
        if (inputField) {
            inputField.value = value;
        }
    }

    // Set values in respective input fields
    setInputValue('e_user_id',queryParams.id)
    setInputValue('f_name', queryParams.userName);
    setInputValue('l_name', queryParams.lastName);
    setInputValue('user_email', queryParams.userEmail);
    setInputValue('user_password', queryParams.userPassword);
    setInputValue('user_c_password', queryParams.userCPassword);
    setInputValue('user_phone', queryParams.userPhone);
    setInputValue('user_group', queryParams.userGroup);
    setInputValue('user_vendor', queryParams.userVendor);
    setInputValue('user_client', queryParams.userClient);
    setInputValue('user_created_date', queryParams.createdDate);
    setInputValue('disable_user', queryParams.disableUser);

    id=queryParams.id;

    
// Set checkbox values
if (queryParams.readOnly==='true') {
    document.getElementById('u_read_only').checked = true;
} else {
    document.getElementById('u_read_only').checked = false;
}

if (queryParams.readWrite === 'true') {
    document.getElementById('u_read_write').checked = true;
} else {
    document.getElementById('u_read_write').checked = false;
}

if (queryParams.deletes==='true') {
    document.getElementById('u_delete').checked = true;
} else {
    document.getElementById('u_delete').checked = false;
}

if (queryParams.imports==='true') {
    document.getElementById('u_import').checked = true;
} else {
    document.getElementById('u_import').checked = false;
}

if (queryParams.exports==='true') {
    document.getElementById('u_export').checked = true;
} else {
    document.getElementById('u_export').checked = false;
}

if (queryParams.userManagement==='true') {
    document.getElementById('u_user_management').checked = true;
} else {
    document.getElementById('u_user_management').checked = false;
}

if (queryParams.reports==='true') {
    document.getElementById('u_reports').checked = true;
} else {
    document.getElementById('u_reports').checked = false;
}

if (queryParams.allReports==='true') {
    document.getElementById('u_all_reports').checked = true;
} else {
    document.getElementById('u_all_reports').checked = false;
}

// Check the 'disable_user' checkbox if needed
if (queryParams.disableUser==='true') {
    document.getElementById('disable_user').checked = true;
} else {
    document.getElementById('disable_user').checked = false;
}
async function createUserGroupDropdown() {
    const userGroupDropdown = document.getElementById('user_group');

    // Clear existing options
    userGroupDropdown.innerHTML = '';

    // Add the default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '-- Select Role --';
    userGroupDropdown.appendChild(defaultOption);

    // Add options based on the user's group
    if (queryParams.userGroup === 'admin') {
        // Admin can see all options
        userGroupDropdown.add(new Option('Admin', 'admin', true, true));
        userGroupDropdown.add(new Option('Vendor', 'vendor'));
    } else if (queryParams.userGroup === 'vendor') {
        // Vendor can only see Vendor option
        userGroupDropdown.add(new Option('Vendor', 'vendor', true, true));
    }
}

// Call the function to create the user group dropdown
 await createUserGroupDropdown();

    // Check the 'disable_user' checkbox if needed

    // ... (existing code)

    console.log('Received data from URL:', queryParams);

    await createCompanyDropdown();
    await createVendorDropdown();

    async function createCompanyDropdown() {
        const companyResponse = await axios.get("http://localhost:3000/company/view-company", { headers: { "Authorization": token } });
        const companyOptions = companyResponse.data.company;
        const companyNames = companyOptions.map(company => company.company_name);
    
        const companyDropdown = document.getElementById('user_client');
        companyDropdown.innerHTML = ''; // Clear existing options
    
        // Add the default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = '-- Select Company --';
        companyDropdown.appendChild(defaultOption);
    
        // Add options for each company
        for (let i = 0; i < companyNames.length; i++) {
            const option = document.createElement('option');
            option.value = companyNames[i];
            option.text = companyNames[i];
            companyDropdown.appendChild(option);
        }
        companyDropdown.value = queryParams.userClient;
    }
    
    async function createVendorDropdown() {
        try {
            const vendorResponse = await axios.get("http://localhost:3000/others/view-vendor", { headers: { "Authorization": token } });
            const vendorOptions = vendorResponse.data.vendors;
            const vendorNames = vendorOptions.map(vendor => vendor.vendorName);
    
            const vendorDropdown = document.getElementById('user_vendor');
            vendorDropdown.innerHTML = ''; // Clear existing options
    
            // Add the default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = '-- Select Vendor --';
            vendorDropdown.appendChild(defaultOption);
    
            // Add options for each vendor
            for (let i = 0; i < vendorNames.length; i++) {
                const option = document.createElement('option');
                option.value = vendorNames[i];
                option.text = vendorNames[i];
                vendorDropdown.appendChild(option);
            }
            vendorDropdown.value = queryParams.userVendor;
        } catch (error) {
            console.error('Error fetching vendor data:', error);
        }
    }
});

document.getElementById('e_user-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Collect form data into an object
    const formData = {
        userName: document.getElementById('f_name').value,
        lastName: document.getElementById('l_name').value,
        userEmail: document.getElementById('user_email').value,
        userPassword: document.getElementById('user_password').value,
        userPhone: document.getElementById('user_phone').value,
        userGroup: document.getElementById('user_group').value,
        userVendor: document.getElementById('user_vendor').value,
        userClient: document.getElementById('user_client').value,
        createdDate: document.getElementById('user_created_date').value,
        disableUser: document.getElementById('disable_user').checked,
        readOnly:document.getElementById('u_read_only').checked,
        deletes:document.getElementById('u_delete').checked,
        imports:document.getElementById('u_import').checked,
        exports:document.getElementById('u_export').checked,
        userManagement:document.getElementById('u_user_management').checked,
        reports:document.getElementById('u_reports').checked,
        allReports:document.getElementById('u_all_reports').checked
    };

    try {
        // Make a POST request using Axios with async/await
        const response = await axios.put(`http://localhost:3000/user/update-user/${id}`, formData,{headers:{"Authorization":token}});
        console.log('Response:', response.data.message);
        // Handle success if needed
    } catch (error) {
        console.error('Error updating user:', error);
        // Handle error if needed
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
