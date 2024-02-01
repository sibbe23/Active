// Define a function to handle form submission
async function handleSearch() {
    // Get input values
    let nemoId = document.getElementById("nemoId").value;
    let status = document.getElementById("status").value;
    let zone = document.getElementById("zone").value;
    let name = document.getElementById("name").value;
    let availableFrom = document.getElementById("availableFrom").value;
    let businessType = document.getElementById("businessType").value;
    let rank = document.getElementById("rank").value;
    let availableTo = document.getElementById("availableTo").value;
    let documents = document.getElementById("documents").value;
    let vessel = document.getElementById("vessel").value;
    let ageAbove = document.getElementById("ageAbove").value;
    let documentNumber = document.getElementById("documentNumber").value;
    let experience = document.getElementById("experience").value;
    let ageBelow = document.getElementById("ageBelow").value;
    let group = document.getElementById("group").value;
    let license = document.getElementById("license").value;
    let licenseCountry = document.getElementById("licenseCountry").value;

    // Create an object with the user input data
    let searchData = {};

    // Add fields to searchData only if they have a value
    if (nemoId) searchData.candidate_Id = nemoId;
    if (status) searchData.status = status;
    if (zone) searchData.zone = zone;
    if (name) searchData.name = name;
    if (availableFrom) searchData.availableFrom = availableFrom;
    if (businessType) searchData.businessType = businessType;
    if (rank) searchData.rank = rank;
    if (availableTo) searchData.availableTo = availableTo;
    if (documents) searchData.documents = documents;
    if (vessel) searchData.vessel = vessel;
    if (ageAbove) searchData.ageAbove = ageAbove;
    if (documentNumber) searchData.documentNumber = documentNumber;
    if (experience) searchData.experience = experience;
    if (ageBelow) searchData.ageBelow = ageBelow;
    if (group) searchData.group = group;
    if (license) searchData.license = license;
    if (licenseCountry) searchData.licenseCountry = licenseCountry;

    // Send the data to the backend using Axios
    const serverResponse = await axios.post('http://localhost:3000/user/search', searchData)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            // Handle errors if any
            console.error(error);
        });
}

// Attach the function to the form's submit event
// document.getElementById("view-user").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission
//     handleSearch(); // Call the function to handle the search
// });



const logout = document.getElementById("logout")


logout.addEventListener("click",()=>{
  localStorage.clear();

    window.location.href ="../login/login.html"
})


window.onload = async function () {
    const userDisplay=document.getElementById("user_name");
    userDisplay.innerHTML+=localStorage.getItem('username');
}

const toggleBtn = document.getElementById('toggleSidebar');
toggleBtn.addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const content2 = document.getElementById('content2');

    // Toggle the left position of the sidebar
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';

    // Adjust the margin of the content area based on the sidebar visibility
    content.style.marginLeft = sidebar.style.left === '0px' ? '250px' : '0px';
    content2.style.marginLeft = sidebar.style.left === '0px' ? '250px' : '0px';

    // Change border radius of toggleBtn
    toggleBtn.style.borderRadius = sidebar.style.left === '0px' ? '0' : '0%';

    // Change toggle button text based on the sidebar visibility
    toggleBtn.innerHTML = sidebar.style.left === '0px' ? '<' : '>';
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

async function search() {
    const searchTerm = 'ram'; // Replace with the actual search term

    try {
      // Fetch user data based on name search
      const usersResponse = await axios.get(`http://localhost:3000/users/search?name=${searchTerm}`);
      const users = usersResponse.data;

      // Extract vendor_ids from the users
      const memIds = users.map((user) => user.vendor_id);

      // Fetch data from other models based on the obtained vendor_ids
      const candidatesResponse = await axios.post('http://localhost:3000/candidate', { memIds });
      const candidates = candidatesResponse.data;

    //   const vesselsResponse = await axios.post('http://localhost:3000/others', { memIds });
    //   const vessels = vesselsResponse.data;

      // Add similar blocks for other models

      // Display the data
      displayResults({ users, candidates });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function displayResults(data) {
    const resultsContainer = document.getElementById('searchResults');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Display user data
    resultsContainer.innerHTML += '<h2>Users</h2>';
    data.users.forEach((user) => {
      resultsContainer.innerHTML += `<p>${JSON.stringify(user)}</p>`;
    });

    // Display candidate data
    resultsContainer.innerHTML += '<h2>Candidates</h2>';
    data.candidates.forEach((candidate) => {
      resultsContainer.innerHTML += `<p>${JSON.stringify(candidate)}</p>`;
    });

    // Display vessel data
    // resultsContainer.innerHTML += '<h2>Vessels</h2>';
    // data.vessels.forEach((vessel) => {
    //   resultsContainer.innerHTML += `<p>${JSON.stringify(vessel)}</p>`;
    // });

    // Add similar blocks for other models
  }

  // Trigger the search on page load (you may want to do this in response to user input)
  search();