const token = localStorage.getItem('token')

async function createCompanyDropdown() {

    const companyResponse = await axios.get("http://localhost:3000/company/view-company", { headers: { "Authorization": token } });
        const companyOptions = companyResponse.data.company;
        console.log(companyOptions)
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
        // If you want to clone the options for another dropdown, do it here
        // companyDropdown.appendChild(option.cloneNode(true));
    }
}

   





function decodeToken(token) {
   // Implementation depends on your JWT library
   // Here, we're using a simple base64 decode
   const base64Url = token.split('.')[1];
   const base64 = base64Url.replace('-', '+').replace('_', '/');
   return JSON.parse(atob(base64));
}
const decodedToken = decodeToken(token);

document.addEventListener('DOMContentLoaded', async function () {
await createCompanyDropdown()
await createVendorDropdown()
const hasUserManagement = decodedToken.userManagement;
   console.log(hasUserManagement)
   if (hasUserManagement) {
     document.getElementById('userManagementSection').style.display = 'block';
     document.getElementById('userManagementSections').style.display = 'block';

   }
document.getElementById('user-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userName = document.getElementById('f_name').value;
    const lastName = document.getElementById('l_name').value;
    const userEmail = document.getElementById('user_email').value;
    const userPassword = document.getElementById('user_password').value;
    const userCPassword = document.getElementById('user_c_password').value;
    const userPhone = document.getElementById('user_phone').value;
    const userGroup = document.getElementById('user_group').value;
    const userVendor = document.getElementById('user_vendor').value;
    const userClient = document.getElementById('user_client').value;
    const createdDate = document.getElementById('user_created_date').value;
    const disableUser = document.getElementById('disable_user').checked;
    const readOnly = document.getElementById('u_read_only').checked;
    const Write = document.getElementById('u_write').checked;
    const imports = document.getElementById('u_import').checked;
    const exports = document.getElementById('u_export').checked;
    const userManagement = document.getElementById('u_user_management').checked;
    const reports = document.getElementById('u_reports').checked;

    const formData = {
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
        readOnly,
        Write,
        imports,
        exports,
        userManagement,
        reports,
    };
    console.log(formData);

    try {
        const response = await axios.post('http://localhost:3000/user/create-user', formData, { headers: { "Authorization": token } });
        // Handle the server response here
        console.log(response.data);
    } catch (error) {
        // Handle errors here
        console.error('Error:', error);
    }
});


})
async function createVendorDropdown() {
    try {
        const vendorResponse = await axios.get("http://localhost:3000/others/view-vendor", { headers: { "Authorization": token } });
        const vendorOptions = vendorResponse.data.vendors;
        console.log(vendorOptions);
        
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
            // If you want to clone the options for another dropdown, do it here
            // vendorDropdown.appendChild(option.cloneNode(true));
        }
    } catch (error) {
        console.error('Error fetching vendor data:', error);
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