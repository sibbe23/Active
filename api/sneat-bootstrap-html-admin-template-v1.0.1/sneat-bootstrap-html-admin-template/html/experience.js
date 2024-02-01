const token = localStorage.getItem('token')
document.getElementById("exp-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const experience = document.getElementById("exp").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-experience", {
            experience,
        },{headers:{"Authorization":token}});

        if (serverResponse.status === 200) {
            console.log('Experience added successfully');
        } else {
            console.error('Error:', serverResponse.statusText);
        }
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