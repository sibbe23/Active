const token = localStorage.getItem('token')
document.getElementById('search_btn').addEventListener('click', async function (e) {
    e.preventDefault()
    // Get the value from the input field
    const searchValue = document.getElementById('search_input').value;
    if(searchValue.length == 0)
    alert('Blank Field! Enter some value to continue!')
    else
    try {
      // Send an asynchronous request to the server using Axios with async/await
      const response = await axios.post('http://localhost:3000/search', { search: searchValue },{headers:{'Authorization':token}});
      
      // Handle the response from the server (e.g., display search results)
      console.log(response.data);
      populateTables(response.data);

    //   resultContainer.innerHTML='';
    //       resultContainer.innerHTML = JSON.stringify(response.data, null, 2);

    } catch (error) {
      console.error('Error in search request:', error);
    }
  })
  const resultContainer = document.getElementById('result-container'); // Get the result container div
  const searchForm = document.getElementById('search-form');
  
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Get values from all form fields
      const nemoId = document.getElementById('nemoId').value;
      const name = document.getElementById('name').value;
      const rank = document.getElementById('rank').value;
      const vsl = document.getElementById('vsl').value;
      const experience = document.getElementById('experience').value;
      const grade = document.getElementById('grade').value;
      const status = document.getElementById('status').value;
      const availableFrom = document.getElementById('availableFrom').value;
      const availableTo = document.getElementById('availableTo').value;
      const license = document.getElementById('license').value;
      const zone = document.getElementById('zone').value;
    //   const documentNumber = document.getElementById('documentNumber').value;

      // Prepare data for the POST request
      const searchData = {
        nemoId: nemoId,
        name: name,
        rank: rank,
        vsl: vsl,
        experience: experience,
        grade: grade,
        status: status,
        avb_date: availableFrom,
        las_date: availableTo,
        license: license,
        zone: zone,
        // documentNumber: documentNumber
      };

      // Make a POST request using Axios
      axios.post('http://localhost:3000/searchspl', searchData,{headers:{'Authorization':token}})
        .then(function (response) {
          // Handle the successful response
          const searchResults = response.data;

          // Process and display the search results in the table
          populateTable(searchResults);

          console.log(response.data); // Log the retrieved data to the console
        //   resultContainer.innerHTML='';
        //   resultContainer.innerHTML = JSON.stringify(response.data, null, 2);

                })
        .catch(function (error) {
          // Handle errors
          console.error('Error:', error);
          // You can update the UI to show an error message or perform other error handling
        });
    });


    function populateTable(results) {
        const tableBody = document.getElementById('table-body');
    
        // Clear existing rows
        tableBody.innerHTML = '';
    
        // Iterate over results and append rows to the table
        results.forEach(result => {
            const row = document.createElement('tr');
            const fieldsToDisplay = ['candidateId', 'fname', 'lname', 'c_rank', 'c_vessel', 'c_mobi1', 'dob', 'nemo_source'];
    
            fieldsToDisplay.forEach(field => {
                const cell = document.createElement('td');
                // Format date fields if needed
                if (field === 'dob' || field === 'avb_date' || field === 'las_date') {
                    const date = new Date(result[field]).toLocaleDateString();
                    cell.textContent = date;
                } else {
                    cell.textContent = result[field];
                }
                row.appendChild(cell);
            });
    
            // Add buttons for delete, edit, and view
            const deleteButton = createButton('Delete', () => handleDelete(result.candidateId));
            const editButton = createButton('Edit', () => handleEdit(result.candidateId));
            const viewButton = createButton('View', () => handleView(result.candidateId));
    
            const buttonsCell = document.createElement('td');
            buttonsCell.appendChild(deleteButton);
            buttonsCell.appendChild(editButton);
            buttonsCell.appendChild(viewButton);
    
            row.appendChild(buttonsCell);
    
            tableBody.appendChild(row);
        });
    }
    
    function createButton(text, onClickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('btn', 'btn-secondary', 'btn-sm', 'mx-1');
        button.addEventListener('click', onClickHandler);
        return button;
    }
    
    // Example event handlers
    async function handleDelete(candidateId) {
        // Display a confirmation dialog
        const confirmDelete = window.confirm(`Are you sure you want to delete candidate with ID ${candidateId}?`);
    
        // Check if the user clicked OK in the confirmation dialog
        if (confirmDelete) {
            try {
                console.log(`Deleting candidate with ID ${candidateId}`);
                // Add your delete logic here
                await axios.delete(`http://localhost:3000/candidate/delete-candidate/${candidateId}`, { headers: { "Authorization": token } });
                console.log(`Candidate with ID ${candidateId} successfully deleted.`);
            } catch (error) {
                console.error(`Error deleting candidate with ID ${candidateId}:`, error);
                // Handle the error, e.g., show an alert or log it
            }
        } else {
            console.log('Delete operation canceled.');
        }
    }
    function decodeToken(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));
  }
  
  const decodedToken = decodeToken(token);
  
    
    function handleEdit(candidateId) {
        console.log(`Edit button clicked for candidateId ${candidateId}`);
          console.log('memId:', candidateId);
          localStorage.setItem('memId',candidateId);
          const canEdit = decodedToken.readWrite;
          if (canEdit) {
              console.log('Edited:', candidateId);
              window.location.href = `./edit-candidate-2.html?memId=${candidateId}`;
              // Add your logic for editing here
          } else {
              alert('You do not have permission to edit this candidate.');
          }
      
    }
    
    function handleView(candidateId) {
        console.log(`View button clicked for candidateId ${candidateId}`);
        // Add your view logic here
          localStorage.setItem('memId', candidateId);
          window.location.href = './view-candidate.html';
      
    }
    
      
    
      function populateTables(data) {
        // Clear existing rows
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';
      
        // Display candidateResults in the main table
        if (data.candidateResults && data.candidateResults.length > 0) {
          displayCandidateResults(data.candidateResults);
        }
      
        // Display bankResults in a separate table
        if (data.bankResults && data.bankResults.length > 0) {
          displayBankResults(data.bankResults);
        }
      
        // Display cdocumentsResults in a separate table
        if (data.cdocumentsResults && data.cdocumentsResults.length > 0) {
          displayCDocumentsResults(data.cdocumentsResults);
        }
      
        // Add more sections for other types of results as needed
      }
      
      // Function to display candidateResults in the main table
      function displayCandidateResults(candidateResults) {
        const tableBody = document.getElementById('table-body');
      
        candidateResults.forEach(result => {
          const row = document.createElement('tr');
          const fieldsToDisplay = ['candidateId', 'fname', 'lname', 'c_rank', 'c_vessel', 'c_mobi1', 'dob', 'nemo_source'];
      
          fieldsToDisplay.forEach(field => {
            const cell = document.createElement('td');
            // Format date fields if needed
            if (field === 'dob' || field === 'avb_date' || field === 'las_date') {
              const date = new Date(result[field]).toLocaleDateString();
              cell.textContent = date;
            } else {
              cell.textContent = result[field];
            }
            row.appendChild(cell);
          });
          const deleteButton = createButton('Delete', () => handleDelete(result.candidateId));
        const editButton = createButton('Edit', () => handleEdit(result.candidateId));
        const viewButton = createButton('View', () => handleView(result.candidateId));

        const buttonsCell = document.createElement('td');
        buttonsCell.appendChild(deleteButton);
        buttonsCell.appendChild(editButton);
        buttonsCell.appendChild(viewButton);

        row.appendChild(buttonsCell);

        tableBody.appendChild(row);
          tableBody.appendChild(row);
        });
      } 
      // Function to display bankResults in a separate table
      // Function to display bankResults in a separate table
      function displayBankResults(bankResults) {
        const candidateIds = bankResults.map(result => result.candidateId);
    
        // Check if there are candidateIds to fetch
        if (candidateIds.length > 0) {
            // Fetch candidate data for the unique candidateIds
            fetchCandidateData(candidateIds)
                .then(candidateData => {
                    // Display candidate data in the main table
                    displayCandidateResults(candidateData.candidateResults);
                })
                .catch(error => {
                    console.error('Error fetching candidate data:', error);
                });
        }
    }

// Function to fetch candidate data based on candidateIds
// Function to fetch candidate data based on candidateIds
async function fetchCandidateData(candidateIds) {
  try {
    // Check if candidateIds is defined and not empty
    if (candidateIds && candidateIds.length > 0) {
      const response = await axios.get(`http://localhost:3000/candidate/get-candidate/${candidateIds}`, { headers: { "Authorization": token } });
      return response.data;
    } else {
      // If candidateIds is undefined or empty, return an empty object
      return { candidateResults: [] };
    }
  } catch (error) {
    throw error;
  }
}


      // Function to display cdocumentsResults in a separate table
      function displayCDocumentsResults(cdocumentsResults) {
        // Similar to displayCandidateResults, create a new table or modify the existing table for cdocumentsResults
      }

  const displayDropdown = async function () {
    const rankDropdown = document.getElementById('rank');
    rankDropdown.innerHTML = ''; // Clear existing options

    // Add the default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '';
    rankDropdown.appendChild(defaultOption);

    const rankResponse = await axios.get("http://localhost:3000/others/view-rank", { headers: { "Authorization": token } });
    const rankOptions = rankResponse.data.ranks;
    const rankNames = rankOptions.map(rank => rank.rank);

    for (let i = 0; i < rankNames.length; i++) {
        const option = document.createElement('option');
        option.value = rankNames[i];
        option.text = rankNames[i];
        rankDropdown.appendChild(option);
    }
}
displayDropdown()

const displayVesselTypeDropdown = async function () {
    try {
        const vesselDropdown = document.getElementById('vsl');
        vesselDropdown.innerHTML = ''; // Clear existing options
    
        // Add the default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = '';
        vesselDropdown.appendChild(defaultOption);
    
        const vesselResponse = await axios.get("http://localhost:3000/others/view-vsl", { headers: { "Authorization": token } });
        const vessels = vesselResponse.data.vsls;
        const vesselNames = vessels.map(vessel => vessel.vesselName);
    
        for (let i = 0; i < vesselNames.length; i++) {
            const option = document.createElement('option');
            option.value = vesselNames[i];
            option.text = vesselNames[i];
            vesselDropdown.appendChild(option);
        }
    } catch (error) {
        console.error('Error fetching vessels:', error);
    }
}
displayVesselTypeDropdown()

async function fetchAndDisplayExp() {
    try {
        const serverResponse = await axios.get("http://localhost:3000/others/view-experience", { headers: { "Authorization": token } });
        const experiences = serverResponse.data.experiences; // Access the array using response.data.experiences

        // Check if experiences is an array
        if (Array.isArray(experiences)) {
            // Get the dropdown element by its ID
            const expDropdown = document.getElementById('experience');

            // Clear existing options
            expDropdown.innerHTML = '';

            // Create and append a default option (optional)
            const defaultOption = document.createElement('option');
            defaultOption.text = '';
            expDropdown.add(defaultOption);

            // Iterate through experiences and add them as options
            experiences.forEach((exp) => {
                const option = document.createElement('option');
                option.value = exp.experience; // Use the appropriate property from your data
                option.text = exp.experience; // Use the appropriate property from your data
                expDropdown.add(option);
            });

            // Now the dropdown is populated with experience values
        } else {
            console.error('Invalid or empty experiences:', experiences);
        }
    } catch (error) {
        console.error('Error fetching experiences:', error);
        // Handle error as needed
    }
}

fetchAndDisplayExp()

async function fetchAndDisplayGrades() {
    try {
        const serverResponse = await axios.get("http://localhost:3000/others/view-grade", { headers: { "Authorization": token } });
        const grades = serverResponse.data.grades;

        // Get the dropdown element by its ID
        const gradeDropdown = document.getElementById('grade');

        // Clear existing options
        gradeDropdown.innerHTML = '';

        // Create and append a default option (optional)
        const defaultOption = document.createElement('option');
        defaultOption.text = '';
        gradeDropdown.add(defaultOption);

        // Iterate through grades and add them as options
        grades.forEach((grade) => {
            const option = document.createElement('option');
            option.value = grade.gradeExp;
            option.text = grade.gradeExp;
            gradeDropdown.add(option);
        });

        // Now the dropdown is populated with grade values
    } catch (error) {
        console.error('Error fetching grades:', error);
        // Handle error as needed
    }
}
fetchAndDisplayGrades()

const displayCountryDropdown = async function () {
    try {
        const countryDropdown = document.getElementById('license');
        countryDropdown.innerHTML = ''; // Clear existing options

        // Add the default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = '';
        countryDropdown.appendChild(defaultOption);

        // Assuming the country data is an array of objects with the property "country"
        const countryResponse = await axios.get("http://localhost:3000/others/country-codes", { headers: { "Authorization": token } });
        const countries = countryResponse.data.countryCodes; // Assuming the array is directly returned

        for (let i = 0; i < countries.length; i++) {
            const option = document.createElement('option');
            option.value = countries[i].country; // Assuming the country name is in the "country" property
            option.text = countries[i].country; // Assuming the country name is in the "country" property
            countryDropdown.appendChild(option);
            // If you want to clone the options for another dropdown, do it here
            // licenseDropdown.appendChild(option.cloneNode(true));
        }
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}
displayCountryDropdown()

document.getElementById('logout').addEventListener('click',async function(e){
    e.preventDefault();
    localStorage.clear()
    window.location.href='./loginpage.html'
})


window.onload = async function () {
    
  const hasUserManagement = decodedToken.userManagement;
  console.log(hasUserManagement)
  if (hasUserManagement) {
    document.getElementById('userManagementSection').style.display = 'block';
    document.getElementById('userManagementSections').style.display = 'block';

  }
};



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
