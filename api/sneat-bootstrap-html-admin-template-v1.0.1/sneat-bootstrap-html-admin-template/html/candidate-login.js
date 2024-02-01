document.getElementById('candidate_login').addEventListener('submit', async function submitForm(e) {
  try {
    e.preventDefault();
    // Get values using document.getElementById
    const indosNumber = document.getElementById(`indos_number`).value;
    const email = document.getElementById(`email`).value;
    const password = document.getElementById(`password`).value;

    const formData = {
      indosNumber: indosNumber,
      email: email,
      password: password
    };

    // Send data to the server using Axios
    const response = await axios.post('http://localhost:3000/candidate/login', formData);

    console.log(response.data);
    const token = response.data.token;
    const cmemId = response.data.candidateId;
    
    localStorage.setItem('ctoken',token)
    localStorage.setItem('cmemId',cmemId)
    
    
    window.location.href='./candidate-index.html'
    // Handle success (if needed)

  } catch (error) {
    console.error(error);
    // Handle error (if needed)
  }
});

