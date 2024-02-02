document.addEventListener('DOMContentLoaded', async function () {
    const candidateId= localStorage.getItem('memId')
        const id = candidateId;
        fetchAndDisplayNkdData()
      
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
        const token = localStorage.getItem('token');

    document.getElementById('nkd_form').addEventListener('submit', async (e) => {
        try {
            e.preventDefault();
            const memId = localStorage.getItem('memId')

            // Collect form data
            const formData = {
                kin_name: document.getElementById('nkd_kin_name').value,
                kin_relation: document.getElementById('nkd_kin_relationship').value,
                kin_contact_number: document.getElementById('nkd_kin_contact').value,
                kin_contact_address: document.getElementById('nkd_contact_address').value,
                kin_priority: document.getElementById('nkd_priority').value,
            };


            // Send data to the server using Axios with async/await
            const response = await axios.post(`http://localhost:3000/candidate/kin-details/${memId}`, formData, { headers: { "Authorization": token } });

            // Handle success
            console.log('NKD data added successfully:', response.data);
            fetchAndDisplayNkdData()

            // You can perform additional actions here after a successful add
        } catch (error) {
            // Handle error
            console.error('Error adding NKD data:', error);
            // You can handle errors and display appropriate messages to the user
        }
    })

    const fetchAndDisplayNkdData = async () => {
        try {
            const memId = localStorage.getItem('memId')
            const response = await axios.get(`http://localhost:3000/candidate/get-nkd-details/${memId}`, { headers: { "Authorization": token } });

            // Assuming response.data contains an array of NKD objects
            const nkdData = response.data;

            // Get the table body element
            const tableBody = document.getElementById('nkdTableBody');
            tableBody.innerHTML = ''; // Clear existing table content

            // Iterate through the NKD data and append rows to the table
            nkdData.forEach((nkd) => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerText = nkd.kin_name;
                row.insertCell(1).innerText = nkd.kin_relation;
                row.insertCell(2).innerText = nkd.kin_contact_number;
                row.insertCell(3).innerText = nkd.kin_contact_address;
                row.insertCell(4).innerText = nkd.kin_priority;
                const editButton = document.createElement('button');
                editButton.className = 'btn border-0 m-0 p-0';
                editButton.innerHTML = '<i class="fa fa-pencil" onMouseOver="this.style.color=\'seagreen\'" onMouseOut="this.style.color=\'gray\'"></i>';
                editButton.addEventListener('click', () => editNkd(nkd.id, nkd.kin_name, nkd.kin_relation, nkd.kin_contact_number, nkd.kin_contact_address, nkd.kin_priority));
                
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn border-0 m-0 p-0';
                deleteButton.innerHTML = '<i class="fa fa-trash" onMouseOver="this.style.color=\'red\'" onMouseOut="this.style.color=\'gray\'"></i>';
                deleteButton.addEventListener('click', () => deleteNkd(nkd.id));
                
    
                // Add buttons to the row
                const cell = row.insertCell(5);
                cell.appendChild(editButton);
                cell.appendChild(deleteButton);
            });
            
        } catch (error) {
            console.error('Error fetching NKD data:', error);
        }
    };

    function editNkd(id, kinName, kinRelation, kinContactNumber, kinContactAddress, kinPriority) {
        // Your edit logic here, you can open a modal or navigate to an edit page
        console.log(`Editing NKD with ID: ${id}`);
    
        window.location.href = `edit-c-nkd.html?id=${id}&kinName=${kinName}&kinRelation=${kinRelation}&kinContactNumber=${kinContactNumber}&kinContactAddress=${kinContactAddress}&kinPriority=${kinPriority}`;
    
        // Populate the edit form with the provided details if needed
    }
    
    
    // Function to delete NKD entry
    async function deleteNkd(id) {
        try {
            const confirmDelete = confirm('Are you sure you want to delete this NKD entry?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`http://localhost:3000/candidate/delete-nkd/${id}`, { headers: { "Authorization": token } });
                console.log(response.data);
                // Fetch and display NKD data again after deletion
                fetchAndDisplayNkdData();
            }
        } catch (error) {
            console.error('Error deleting NKD entry:', error);
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