const token = localStorage.getItem('token')
document.getElementById("port-agent-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const portAgentName = document.getElementById("port-agent-name").value;
    const contactPerson = document.getElementById("port-agent-contact").value;
    const address = document.getElementById("port-agent-address").value;
    const phone = document.getElementById("port-agent-phone").value;
    const email = document.getElementById("port-agent-email").value;
    const city = document.getElementById("port-agent-city").value;
    const state = document.getElementById("port-agent-state").value;
    const country = document.getElementById("port-agent-country").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-port-agent", {
            portAgentName,
            contactPerson,
            address,
            phone,
            email,
            city,
            state,
            country,
        },{headers:{"Authorization":token}});
        console.log('Response:', serverResponse.data);
    } catch (error) {
        console.error('Error:', error);
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

window.onload = async function () {
    
    const hasUserManagement = decodedToken.userManagement;
    console.log(hasUserManagement)
    if (hasUserManagement) {
      document.getElementById('userManagementSection').style.display = 'block';
      document.getElementById('userManagementSections').style.display = 'block';

    }
};




function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
const decodedToken = decodeToken(token);


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