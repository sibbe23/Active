document.getElementById("view-user").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {};
    
    // Collect values from all input fields
    document.querySelectorAll("#view-user input").forEach((input) => {
        formData[input.name] = input.value;
    });

    try {
        const serverResponse = await axios.post("http://localhost:3000/user/search", formData);
        console.log('Response:', serverResponse.data);
        // Add logic here to handle the response as needed
    } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
    }
});

document.getElementById("back").addEventListener("click", () => {
    window.location.href = "../index/index.html";
});