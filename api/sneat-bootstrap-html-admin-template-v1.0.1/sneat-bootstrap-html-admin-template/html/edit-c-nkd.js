const token = localStorage.getItem('token')
document.addEventListener("DOMContentLoaded", function() {
    // Get the dropdown items
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

document.addEventListener("DOMContentLoaded", function() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get values by parameter name
    const id = urlParams.get('id');
    const kinName = urlParams.get('kinName');
    const kinRelation = urlParams.get('kinRelation');
    const kinContactNumber = urlParams.get('kinContactNumber');
    const kinContactAddress = urlParams.get('kinContactAddress');
    const kinPriority = urlParams.get('kinPriority');

    // Populate the form fields with the retrieved values
    document.getElementById('nkd_id').value=id;
    document.getElementById('nkd_kin_name').value = kinName;
    document.getElementById('nkd_kin_relationship').value = kinRelation;
    document.getElementById('nkd_kin_contact').value = kinContactNumber;
    document.getElementById('nkd_contact_address').value = kinContactAddress;
    document.getElementById('nkd_priority').value = kinPriority;

    document.getElementById('updateNkdButton').addEventListener('click', async function(e) 
    {
        e.preventDefault();
    
        try {
            // Collect form data
            const formData = {
                id:document.getElementById('nkd_id').value,
                kin_name: document.getElementById('nkd_kin_name').value,
                kin_relation: document.getElementById('nkd_kin_relationship').value,
                kin_contact_number: document.getElementById('nkd_kin_contact').value,
                kin_contact_address: document.getElementById('nkd_contact_address').value,
                kin_priority: document.getElementById('nkd_priority').value,
            };

            // Send data to the server using Axios with async/await for update
            const response = await axios.put(`http://localhost:3000/candidate/update-nkd/${id}`, formData, { headers: { "Authorization": token } });

            // Handle success
            console.log('NKD data updated successfully:', response.data);
            window.location.replace('./add-c-nkd.html');
            // You can perform additional actions here after a successful update
        } catch (error) {
            // Handle error
            console.error('Error updating NKD data:', error);
            // You can handle errors and display appropriate messages to the user
        }
    });
    // Now the form fields are populated with the retrieved values
});

document.getElementById('logout').addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();

    // Perform logout actions
    // You may want to redirect to a login page or perform other logout-related tasks

    // For example, redirect to a login page
    window.location.href = './loginpage.html';
});