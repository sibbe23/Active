const token = localStorage.getItem('token')
function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
document.addEventListener('DOMContentLoaded', async function () {
      
    const decodedToken = decodeToken(token);
    console.log(decodedToken)

const hasUserManagement = decodedToken.userManagement;
console.log(hasUserManagement)
if (hasUserManagement) {
  document.getElementById('userManagementSection').style.display = 'block';
  document.getElementById('userManagementSections').style.display = 'block';

}
    const candidateId = localStorage.getItem('memId');
    fetchAndDisplayBankDetails(candidateId);


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
})

async function fetchAndDisplayBankDetails(candidateId) {
    try {
        const response = await axios.get(`http://localhost:3000/candidate/get-bank-details/${candidateId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const bankDetails = response.data;
        console.log(bankDetails)

        const bankTableBody = document.getElementById('bankTableBody');
        bankTableBody.innerHTML = ''; // Clear existing rows

        bankDetails.forEach(bank => {
            const row = document.createElement('tr');

            // Add data to each cell
            row.innerHTML = `
            <td><span class='badge bg-success'>${bank.bank_name}</span></td>
            <td>${bank.account_num}</td>
            <td>${bank.bank_addr}</td>
            <td>${bank.ifsc_code}</td>
            <td>${bank.swift_code}</td>
            <td>${bank.beneficiary}</td>
            <td>${bank.beneficiary_addr}</td>
            <td>${bank.pan_num}</td>
            <td>${bank.passbook}</td>
            <td>${bank.pan_card}</td>
            <td><span class='badge bg-success'>${bank.nri_bank_name}</span></td>
            <td>${bank.nri_account_num}</td>
            <td>${bank.nri_bank_addr}</td>
            <td>${bank.nri_ifsc_code}</td>
            <td>${bank.nri_swift_code}</td>
            <td>${bank.nri_beneficiary}</td>
            <td>${bank.nri_beneficiary_addr}</td>
            <td>${bank.nri_passbook}</td>
            
            <td>
            <button class="btn border-0 m-0 p-0" onclick="editBank('${bank.id}','${bank.bank_name}','${bank.account_num}','${bank.bank_addr}','${bank.ifsc_code}','${bank.swift_code}','${bank.beneficiary}','${bank.beneficiary_addr}','${bank.pan_num}','${bank.passbook}','${bank.pan_card}','${bank.nri_bank_name}','${bank.nri_account_num}','${bank.nri_bank_addr}','${bank.nri_ifsc_code}','${bank.nri_swift_code}','${bank.nri_beneficiary}','${bank.nri_beneficiary_addr}','${bank.nri_passbook}', event)">
                <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
            </button>
            <button class="btn border-0 m-0 p-0" onclick="deleteBank('${bank.id}', event)">
                <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
            </button>
        </td>
        
            `;

            bankTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching bank details:', error);
    }
}

function editBank(id, bank_name, account_num, bank_addr, ifsc_code, swift_code, beneficiary, beneficiary_addr, pan_num, passbook, pan_card, nri_bank_name, nri_account_num, nri_bank_addr, nri_ifsc_code, nri_swift_code, nri_beneficiary, nri_beneficiary_addr, nri_passbook, event) {
event.preventDefault();
    console.log('Edit clicked for bank ID:', id);
    window.location.href = `edit-c-bank.html?id=${id}&bank_name=${bank_name}&account_num=${account_num}&bank_addr=${bank_addr}&ifsc_code=${ifsc_code}&swift_code=${swift_code}&beneficiary=${beneficiary}&beneficiary_addr=${beneficiary_addr}&pan_num=${pan_num}&passbook=${passbook}&pan_card=${pan_card}&nri_bank_name=${nri_bank_name}&nri_account_num=${nri_account_num}&nri_bank_addr=${nri_bank_addr}&nri_ifsc_code=${nri_ifsc_code}&nri_swift_code=${nri_swift_code}&nri_beneficiary=${nri_beneficiary}&nri_beneficiary_addr=${nri_beneficiary_addr}&nri_passbook=${nri_passbook}`; // Include all parameters
    // ...
}


function deleteBank(bankId) {
    // Implement your delete functionality here using the bankId
    console.log('Delete clicked for bank ID:', bankId);
}

async function handleBankDetailsForm(event) {
    event.preventDefault();

    // Regular Bank Account Details
    const bankName = document.getElementById('bank_name').value;
    const accountNumber = document.getElementById('bank_acc_num').value;
    const bankAddress = document.getElementById('bank_acc_addr').value;
    const ifscCode = document.getElementById('bank_ifsc').value;
    const swiftCode = document.getElementById('bank_swift').value;
    const beneficiary = document.getElementById('bank_beneficiary').value;
    const address = document.getElementById('bank_addr').value;
    const panNumber = document.getElementById('bank_pan').value;
    const panCardFile = document.getElementById('bank_pan_card').value;
    const passbookFile = document.getElementById('bank_passbook').value;

    // NRI Bank Account Details
    const nriBankName = document.getElementById('nri_bank_name').value;
    const nriAccountNumber = document.getElementById('nri_bank_acc_num').value;
    const nriBankAddress = document.getElementById('nri_bank_acc_addr').value;
    const nriIfscCode = document.getElementById('nri_bank_ifsc').value;
    const nriSwiftCode = document.getElementById('nri_bank_swift').value;
    const nriBeneficiary = document.getElementById('nri_bank_beneficiary').value;
    const nriAddress = document.getElementById('nri_bank_addr').value;
    const nriPassbookFile = document.getElementById('nri_bank_passbook').value;

    const currentCandidateId= localStorage.getItem('memId')
    // Create an object to hold all the bank details
    const bankDetails = {
        bankName,
        accountNumber,
        bankAddress,
        ifscCode,
        swiftCode,
        beneficiary,
        address,
        panNumber,
        panCardFile,
        passbookFile,
        nriBankName,
        nriAccountNumber,
        nriBankAddress,
        nriIfscCode,
        nriSwiftCode,
        nriBeneficiary,
        nriAddress,
        nriPassbookFile
    };

    try {
        const response = await axios.post(`http://localhost:3000/candidate/bank-details/${currentCandidateId}`, bankDetails, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        fetchAndDisplayBankDetails(currentCandidateId)
        bankDetailsForm.reset();
    } catch (err) {
        console.error(err);
    }
}

// Attach the form submission handler to the form
const bankDetailsForm = document.getElementById('bankForm');
bankDetailsForm.addEventListener('submit', handleBankDetailsForm);


document.getElementById('logout').addEventListener('click',async function(e){
    e.preventDefault();
    localStorage.clear()
    window.location.href='./loginpage.html'
})

const storedName = localStorage.getItem('username');

    // Update the HTML content with the retrieved name
    const userInfoElement = document.getElementById('userInfo');
    userInfoElement.querySelector('.fw-semibold').textContent = storedName;

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