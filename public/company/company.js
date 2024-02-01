
const token = localStorage.getItem('token');


const company_name = document.getElementById("company_name");
const company_b_type = document.getElementById("company_b_type");
const company_contact = document.getElementById("company_contact");
const company_email = document.getElementById("company_email");
const company_address = document.getElementById("company_address");
const company_management = document.getElementById("company_management");
const company_phone = document.getElementById("company_phone");
const company_last_update = document.getElementById("company_last_update");

const addCompanyButton = document.getElementById("company-form");
addCompanyButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const selectedBusinessType = document.querySelector('input[name="business_type"]:checked');
    const businessType = selectedBusinessType ? selectedBusinessType.value : null;
    console.log(businessType);
    const company_details = {
        c_name: company_name.value,
        b_type: businessType,
        c_contact: company_contact.value,
        c_email: company_email.value,
        c_addr: company_address.value,
        c_mgmt: company_management.value,
        c_ph: company_phone.value,
        c_last_update: company_last_update.value,
    };

    console.log(company_details);
    try {
        const serverResponse = await axios.post("http://localhost:3000/company/create-company", company_details,{headers:{"Authorization":token}});
        console.log('Response:', serverResponse.data);
        alert("Company Added Successfully!");
    displayCompanies();
    } catch (error) {
        console.error('Error:', error);
    }
});
window.onload = async function () {
    try {
        displayCompanies();
        displayVessels();
        displayVSL();
        displayExperiences();
        displayRank();
        displayGrade();
        displayPort();
        displayPortagent();
        displayHospital();
        displayDocument();
        displayVendor();
        const userDisplay=document.getElementById("user_name");
    userDisplay.innerHTML+=localStorage.getItem('username');
    } catch (error) {
        console.error('Error:', error);
    }
};

async function displayCompanies() {
    try {
        // Fetch companies from the server
        const response = await axios.get("http://localhost:3000/company/view-company",{headers:{"Authorization":token}});
        const companies = response.data.company;

        const companyList = document.getElementById("company-list");
        companyList.innerHTML = "";
        let sno = 1;

        companies.forEach(company => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${sno}</td>
                <td>${company.company_id}</td>
                <td>${company.company_name}</td>
                <td>${company.b_type}</td>
                <td>${company.contact_person}</td>
                <td>${company.email}</td>
                <td>${company.address}</td>
                <td>${company.management}</td>
                <td>${company.phone}</td>
                <td>${company.last_update}</td>
                <td>
                    <button class="btn border-0" onclick="editCompany('${company.company_id}','${company.company_name}','${company.b_type}','${company.contact_person}','${company.email}','${company.address}','${company.management}','${company.phone}','${company.last_update}',event)"><i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i></button>
               
                <button class="btn border-0" onclick="deleteCompany('${company.company_id}', event)"><i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i></button>
                </td>
            `;

            companyList.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


async function deleteCompany(companyId, event) {
    event.preventDefault(); // Prevent default form submission behavior

    let id = companyId;
    console.log(id);
    const url = `http://localhost:3000/company/delete-company/${id}`;
    console.log(url);
 
    try {
       const response = await axios.delete(url,{headers:{"Authorization":token}});
       console.log(response);
        displayCompanies();
    } catch (error) {
       console.error('Error during delete request:', error.message);
    }
};










async function displayVessels() {
    try {
        // Fetch vessels from the server
        const vesselResponse = await axios.get("http://localhost:3000/others/view-vessels", { headers: { "Authorization": token } });
        const vesselList = document.getElementById("vessel-table");
        vesselList.innerHTML = "";

        // Add each vessel to the table
        vesselResponse.data.vessels.forEach((vessel, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${vessel.vesselName}</td>
                <td>
                    <button class="btn border-0" onclick="editVessel('${vessel.id}','${vessel.vesselName}',event)"><i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i></button>
                   <button class="btn border-0" onclick="deleteVessel('${vessel.id}',event)"><i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i></button>
                </td>
            `;
            vesselList.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}



async function deleteVessel(vesselId, event) {
    event.preventDefault(); // Prevent default form submission behavior

    let id = vesselId;
    console.log(id);
    const url = `http://localhost:3000/others/delete-vessels/${id}`;
    console.log(url);
 
    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayVessels(); // Assuming you want to refresh the vessel list after deletion
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
};



// Event listener for the vessel form
document.getElementById("vessel-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const vesselName = document.getElementById("vessel_name").value;

    try {
        // Add a new vessel
        await axios.post("http://localhost:3000/others/create-vessel", { vesselName }, { headers: { "Authorization": token } });
        console.log('Vessel added successfully');
        // Refresh the vessel list after adding a new vessel
        displayVessels();
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById("vsl-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const vesselName = document.getElementById("vessel_name_vsl").value;
    const vesselType = document.getElementById("vessel_type").value;
    const vsl_company = document.getElementById("vsl_company").value;
    const imoNumber = document.getElementById("imo_number").value;
    const vesselFlag = document.getElementById("vessel_flag").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-vsl", {
            vesselName,
            vesselType,
            vsl_company,
            imoNumber,
            vesselFlag,
        },{headers:{"Authorization":token}});
        console.log('Response:', serverResponse.data);
        displayVSL();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function displayVSL() {
    try {
        // Fetch VSLs from the server
        const vslResponse = await axios.get("http://localhost:3000/others/view-vsl",{headers:{"Authorization":token}});
        const vslTable = document.getElementById("vsl-table");
        vslTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        vslResponse.data.vsls.forEach(vsl => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sno}</td>
                <td>${vsl.vesselName}</td>
                <td>${vsl.vesselType}</td>
                <td>${vsl.vsl_company}</td>
                <td>${vsl.imoNumber}</td>
                <td>${vsl.vesselFlag}</td>
                <td>
                    <button class="btn btn-warning" onclick="editVSL('${vsl.id}','${vsl.vesselName}','${vsl.vesselType}','${vsl.vsl_company}','${vsl.imoNumber}','${vsl.vesselFlag}',event)">Edit</button>
                    <button class="btn btn-danger" onclick="deleteVSL('${vsl.id}',event)">Delete</button>
                </td>
            `;

            vslTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Initial display of VSLs when the page loads


// Rest of your code...


document.getElementById("exp-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const experience = document.getElementById("exp").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-experience", {
            experience,
        },{headers:{"Authorization":token}});

        if (serverResponse.status === 200) {
            console.log('Experience added successfully');
            displayExperiences();
        } else {
            console.error('Error:', serverResponse.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function displayExperiences() {
    try {
        const expResponse = await axios.get("http://localhost:3000/others/view-experience",{headers:{"Authorization":token}});
        const expTable = document.getElementById("exp-table");
        expTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        expResponse.data.experiences.forEach(exp => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${exp.experience}</td>
            <td>
                <button class="btn btn-warning" onclick="editExperience('${exp.id}','${exp.experience}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deleteExperience('${exp.id}',event)">Delete</button>
            </td>
        `;

            expTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to remove a row from the table


document.getElementById("rank-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const rank = document.getElementById("rank").value;
    const rankOrder = document.getElementById("rank_order").value;
    const category = document.getElementById("category").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-rank", {
            rank,
            rankOrder,
            category,
        },{headers:{"Authorization":token}});
        displayRank()
        console.log('Response:', serverResponse.data);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function displayRank() {
    try {
        const rankResponse = await axios.get("http://localhost:3000/others/view-rank",{headers:{"Authorization":token}});
        const rankTable = document.getElementById("rank-table");
        rankTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        rankResponse.data.ranks.forEach(rank => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${rank.rank}</td>
            <td>${rank.rankOrder}</td>
            <td>${rank.category}</td>

            <td>
                <button class="btn btn-warning" onclick="editRank('${rank.id}','${rank.rank}','${rank.rankOrder}','${rank.category}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deleteRank('${rank.id}',event)">Delete</button>
            </td>
        `;

            rankTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById("grade-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const gradeExp = document.getElementById("grade_exp").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-grade", { gradeExp },{headers:{"Authorization":token}});
        console.log('Response:', serverResponse.data);
        displayGrade()
    } catch (error) {
        console.error('Error:', error);
    }
});

async function displayGrade() {
    try {
        const gradeResponse = await axios.get("http://localhost:3000/others/view-grade",{headers:{"Authorization":token}});
        const gradeTable = document.getElementById("grade-table");
        gradeTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        gradeResponse.data.grades.forEach(grade => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${grade.gradeExp}</td>
            <td>
                <button class="btn btn-warning" onclick="editGrade('${grade.id}','${grade.gradeExp}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deleteGrade('${grade.id}',event)">Delete</button>
            </td>
        `;

            gradeTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


document.getElementById("port-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const portName = document.getElementById("port_name").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-port", { portName },{headers:{"Authorization":token}});
        console.log('Response:', serverResponse.data);
        displayPort()
    } catch (error) {
        console.error('Error:', error);
    }
});

async function displayPort() {
    try {
        const portResponse = await axios.get("http://localhost:3000/others/view-port",{headers:{"Authorization":token}});
        const portTable = document.getElementById("port-table");
        portTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        portResponse.data.ports.forEach(port => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${port.portName}</td>
            <td>
                <button class="btn btn-warning" onclick="editPort('${port.id}','${port.portName}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deletePort('${port.id}',event)">Delete</button>
            </td>
        `;

            portTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


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
        displayPortagent()
    } catch (error) {
        console.error('Error:', error);
    }
});
async function displayPortagent() {
    try {
        const rankResponse = await axios.get("http://localhost:3000/others/view-port-agent",{headers:{"Authorization":token}});
        const rankTable = document.getElementById("port-agent-table");
        rankTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        rankResponse.data.portAgents.forEach(rank => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${rank.portAgentName}</td>
            <td>${rank.contactPerson}</td>
            <td>${rank.address}</td>
            <td>${rank.phone}</td>
            <td>${rank.email}</td>
            <td>${rank.city}</td>
            <td>${rank.state}</td>
            <td>${rank.country}</td>
            <td>
                <button class="btn btn-warning" onclick="editPortagent('${rank.id}','${rank.portAgentName}','${rank.contactPerson}','${rank.address}','${rank.phone}','${rank.email}','${rank.city}','${rank.state}','${rank.country}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deletePortagent('${rank.id}',event)">Delete</button>
            </td>
        `;

            rankTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById("hospital-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const hospitalName = document.getElementById("hospital-name").value;
    const doctorName = document.getElementById("doctor-name").value;
    const doctorAddress = document.getElementById("doctor-address").value;
    const doctorCity = document.getElementById("doctor-city").value;
    const doctorState = document.getElementById("doctor-state").value;
    const doctorPhone = document.getElementById("doctor-phone").value;
    const doctorEmail = document.getElementById("doctor-email").value;
    const doctorUpload = document.getElementById("doctor-upload").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-hospital", {
            hospitalName,
            doctorName,
            doctorAddress,
            doctorCity,
            doctorState,
            doctorPhone,
            doctorEmail,
            doctorUpload,
        },{headers:{"Authorization":token}});
        displayHospital();
        console.log('Response:', serverResponse.data);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function displayHospital() {
    try {
        const rankResponse = await axios.get("http://localhost:3000/others/view-hospital",{headers:{"Authorization":token}});
        const rankTable = document.getElementById("hospital-table");
        rankTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        rankResponse.data.hospitals.forEach(rank => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${rank.hospitalName}</td>
            <td>${rank.doctorName}</td>
            <td>${rank.doctorAddress}</td>
            <td>${rank.doctorCity}</td>
            <td>${rank.doctorState}</td>
            <td>${rank.doctorPhone}</td>
            <td>${rank.doctorEmail}</td>
            <td>${rank.doctorUpload}</td>
            <td>
                <button class="btn btn-warning" onclick="editHospital('${rank.id}','${rank.hospitalName}','${rank.doctorName}','${rank.doctorAddress}','${rank.doctorCity}','${rank.doctorState}','${rank.doctorPhone}','${rank.doctorEmail}','${rank.doctorUpload}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deleteHospital('${rank.id}',event)">Delete</button>
            </td>
        `;

            rankTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


document.getElementById("document-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const documentType = document.getElementById("document-type").value;
    const hideExpiryDate = document.getElementById("hide-expiry-date").checked;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-document", {
            documentType,
            hideExpiryDate,
        },{headers:{"Authorization":token}});
        displayDocument();
        console.log('Response:', serverResponse.data);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function displayDocument() {
    try {
        const portResponse = await axios.get("http://localhost:3000/others/view-document",{headers:{"Authorization":token}});
        const portTable = document.getElementById("document-table");
        portTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        portResponse.data.documents.forEach(port => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${port.documentType}</td>
            <td>${port.hideExpiryDate}</td>
            
            <td>
                <button class="btn btn-warning" onclick="editDocument('${port.id}','${port.documentType}','${port.hideExpiryDate}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deleteDocument('${port.id}',event)">Delete</button>
            </td>
        `;

            portTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById("vendor-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const vendorName = document.getElementById("vendor-name").value;
    const vendorAddress = document.getElementById("vendor-address").value;

    try {
        const serverResponse = await axios.post("http://localhost:3000/others/create-vendor", {
            vendorName,
            vendorAddress,
        },{headers:{"Authorization":token}});
        displayVendor();
        console.log('Response:', serverResponse.data);
    } catch (error) {
        console.error('Error:', error);
    }
});


async function displayVendor() {
    try {
        const portResponse = await axios.get("http://localhost:3000/others/view-vendor",{headers:{"Authorization":token}});
        const portTable = document.getElementById("vendor-table");
        portTable.innerHTML = "";
        let sno = 1;

        // Add each VSL to the table
        portResponse.data.vendors.forEach(port => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${sno}</td>
            <td>${port.vendorName}</td>
            <td>${port.vendorAddress}</td>
            
            <td>
                <button class="btn btn-warning" onclick="editVendor('${port.id}','${port.vendorName}','${port.vendorAddress}',event)">Edit</button>
                <button class="btn btn-danger" onclick="deleteVendor('${port.id}',event)">Delete</button>
            </td>
        `;

            portTable.appendChild(row);
            sno++;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// ... (previous code)
async function deleteVSL(vslId, event) {
    event.preventDefault();

    const id = vslId;
    const url = `http://localhost:3000/others/delete-vsl/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayVSL();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}
// Delete Experience
async function deleteExperience(expId, event) {
    event.preventDefault();

    const id = expId;
    const url = `http://localhost:3000/others/delete-experience/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayExperiences();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

// Delete Rank
async function deleteRank(rankId, event) {
    event.preventDefault();

    const id = rankId;
    const url = `http://localhost:3000/others/delete-rank/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayRank();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

// Delete Grade


async function deleteGrade(gradeId, event) {
    event.preventDefault();

    const id = gradeId;
    const url = `http://localhost:3000/others/delete-grade/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayGrade();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

// Delete Port

async function deletePort(portId, event) {
    event.preventDefault();

    const id = portId;
    const url = `http://localhost:3000/others/delete-port/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayPort();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

// Delete Port Agent

async function deletePortagent(portAgentId, event) {
    event.preventDefault();

    const id = portAgentId;
    const url = `http://localhost:3000/others/delete-port-agent/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayPortagent();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

// Delete Hospital
async function deleteHospital(hospitalId, event) {
    event.preventDefault();

    const id = hospitalId;
    const url = `http://localhost:3000/others/delete-hospital/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayHospital();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

// Delete Document
async function deleteDocument(documentId, event) {
    event.preventDefault();

    const id = documentId;
    const url = `http://localhost:3000/others/delete-document/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayDocument();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}

// Delete Vendor
async function deleteVendor(vendorId, event) {
    event.preventDefault();

    const id = vendorId;
    const url = `http://localhost:3000/others/delete-vendor/${id}`;

    try {
        const response = await axios.delete(url,{headers:{"Authorization":token}});
        console.log(response);
        displayVendor();
    } catch (error) {
        console.error('Error during delete request:', error.message);
    }
}







const editCompany = async (companyId, companyname, b_type, contact_person, email, address, management, phone, last_update, event) => {
    event.preventDefault();
    document.getElementById("u_company_id").value = companyId;
    document.getElementById("u_company_name").value = companyname;

    // Set the radio button based on the b_type value (converted to lowercase)
    document.getElementById(`u_${b_type.toLowerCase()}`).checked = true;

    document.getElementById("u_company_contact").value = contact_person;
    document.getElementById("u_company_email").value = email;
    document.getElementById("u_company_address").value = address;
    document.getElementById("u_company_management").value = management;
    document.getElementById("u_company_phone").value = phone;
    document.getElementById("u_company_last_update").value = last_update;
}



const updateCompanyButton = document.getElementById("update-company-form");
updateCompanyButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const companyId = document.getElementById("u_company_id").value;
    
    const selectedBusinessType = document.querySelector('input[name="u_business_type"]:checked');
    const businessType = selectedBusinessType ? selectedBusinessType.value : null;

    const updatedCompanyDetails = {
        company_id: companyId,
        c_name: document.getElementById("u_company_name").value,
        b_type: businessType,
        c_contact: document.getElementById("u_company_contact").value,
        c_email: document.getElementById("u_company_email").value,
        c_addr: document.getElementById("u_company_address").value,
        c_mgmt: document.getElementById("u_company_management").value,
        c_ph: document.getElementById("u_company_phone").value,
        c_last_update: document.getElementById("u_company_last_update").value,
    };

    try {
        const response = await axios.put(`http://localhost:3000/company/update-company/${companyId}`, updatedCompanyDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Company Updated Successfully!");
        displayCompanies();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function editVessel(vesselId,vesselName,event){
    event.preventDefault();
    document.getElementById("u_vessel_id").value = vesselId;
    document.getElementById("u_vessel_name").value = vesselName;
    }

    const updateVesselButton = document.getElementById("update-vessel-form");
    updateVesselButton.addEventListener("submit", async (e) => {
        e.preventDefault();
        const vesselId = document.getElementById("u_vessel_id").value;
         
        const updatedVesselDetails = {
            id: vesselId,
            vesselName: document.getElementById("u_vessel_name").value,
        };
    
        try {
            const response = await axios.put(`http://localhost:3000/others/update-vessels/${vesselId}`, updatedVesselDetails,{headers:{"Authorization":token}});
            console.log('Response:', response.data);
            alert("Vessel Updated Successfully!");
            displayVessels();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function editVSL(vslId,vslName,vslType,Company,IMO_number,vslFlag,event){
        event.preventDefault();
        console.log(vslId,vslName,vslType,Company,IMO_number,vslFlag)
        document.getElementById("u_vessel_type_id").value = vslId;
        document.getElementById("u_vessel_name_vsl").value = vslName;
        document.getElementById("u_vessel_type").value = vslType;
        document.getElementById("u_company").value = Company;
        document.getElementById("u_imo_number").value = IMO_number;
        document.getElementById("u_vessel_flag").value = vslFlag;

        }

    async function editExperience(expId,expr,event){
        event.preventDefault();
        document.getElementById('u_experience_id').value=expId;
        document.getElementById("u_experience_name").value=expr

    }

    
    async function editRank(rankId,rank,rankOrder,category,event){
        event.preventDefault();
        document.getElementById("u_rank_id").value=rankId;
        document.getElementById("u_rank_name").value=rank;
        document.getElementById("u_rank_order").value=rankOrder;
        document.getElementById("u_rank_category").value=category;

    } 
    async function editGrade(gradeId,gradeExp,event){
        event.preventDefault();
        document.getElementById("u_grade_id").value=gradeId;
        document.getElementById("u_grade_name").value=gradeExp;

    }
    async function editPort(portId,portName,event){
        event.preventDefault();
        document.getElementById("u_port_id").value=portId;
        document.getElementById("u_port_name").value=portName;

    }
    async function editPortagent(portAgentId,portAgentName,contactPerson,address,phone,email,city,state,country,event){
        event.preventDefault();
        document.getElementById("u_port_agent_id").value=portAgentId;
        document.getElementById("u_port_agent_name").value=portAgentName;
        document.getElementById("u_port_agent_contact").value=contactPerson;
        document.getElementById("u_port_agent_address").value=address;
        document.getElementById("u_port_agent_phone").value=phone;
        document.getElementById("u_port_agent_email").value=email;
        document.getElementById("u_port_agent_city").value=city;
        document.getElementById("u_port_agent_state").value=state;
        document.getElementById("u_port_agent_country").value=country;
    }
    
    
    async function editHospital(id,hospitalName,doctorName,doctorAddress,doctorCity,doctorState,doctorPhone,doctorEmail,doctorUpload,event){
        event.preventDefault();
        
        document.getElementById("u_hospital_id").value=id;
        document.getElementById("u_hospital_name").value=hospitalName;
        document.getElementById("u_doctor_name").value=doctorName;
        document.getElementById("u_doctor_address").value=doctorAddress;
        document.getElementById("u_doctor_city").value=doctorCity;
        document.getElementById("u_doctor_state").value=doctorState;
        document.getElementById("u_doctor_phone").value=doctorPhone;
        document.getElementById("u_doctor_email").value=doctorEmail;
        document.getElementById("u_doctor_upload").value=doctorUpload;

    }

    
    async function editDocument(id, doctype, expirydate, event) {
        event.preventDefault();
    
        document.getElementById("u_document_type_id").value = id;
        document.getElementById("u_document_type_name").value = doctype;
    
        // Set the value and checked property of the hide expiry date checkbox
        const hideExpiryDateCheckbox = document.getElementById("u_hide_expiry_date");
        hideExpiryDateCheckbox.value = expirydate;
        hideExpiryDateCheckbox.checked = expirydate === 'true';
    }
    
    
    async function editVendor(id,name,address,event){
        event.preventDefault();
        document.getElementById("u_vendor_id").value=id;
        document.getElementById("u_vendor_name").value=name;
        document.getElementById("u_vendor_address").value=address;

    }
        

    const updateVSLButton = document.getElementById("update-vsl-form");
    updateVSLButton.addEventListener("submit", async (e) => {
        e.preventDefault();
        const vslId = document.getElementById("u_vessel_type_id").value;
         
        const updatedVSLDetails = {
            id: vslId,
        vesselName:document.getElementById("u_vessel_name_vsl").value,
        vesselType:document.getElementById("u_vessel_type").value,
        vsl_company:document.getElementById("u_company").value ,
        imoNumber:document.getElementById("u_imo_number").value ,
        vesselFlag:document.getElementById("u_vessel_flag").value ,
            }
        try {
            const response = await axios.put(`http://localhost:3000/others/update-vsl/${vslId}`, updatedVSLDetails,{headers:{"Authorization":token}});
            console.log('Response:', response.data);
            alert("VSL Updated Successfully!");
            displayVSL();
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    // Add event listener for updating Experience
const updateExperienceButton = document.getElementById("update-experience-form");
updateExperienceButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const experienceId = document.getElementById("u_experience_id").value;
    
    const updatedExperienceDetails = {
        id: experienceId,
        experience: document.getElementById("u_experience_name").value,
    };
console.log(updatedExperienceDetails)
    try {
        const response = await axios.put(`http://localhost:3000/others/update-experience/${experienceId}`, updatedExperienceDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Experience Updated Successfully!");
        displayExperiences();
    } catch (error) {
        console.error('Error:', error);
    }
});


// Add event listener for updating Rank
const updateRankButton = document.getElementById("update-rank-form");
updateRankButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const rankId = document.getElementById("u_rank_id").value;
    
    const updatedRankDetails = {
        id: rankId,
        rank: document.getElementById("u_rank_name").value,
        rankOrder: document.getElementById("u_rank_order").value,
        category: document.getElementById("u_rank_category").value,
        // Add other fields specific to Rank entity
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-rank/${rankId}`, updatedRankDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Rank Updated Successfully!");
        displayRank();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add event listener for updating Grade
const updateGradeButton = document.getElementById("update-grade-form");
updateGradeButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const gradeId = document.getElementById("u_grade_id").value;
    
    const updatedGradeDetails = {
        id: gradeId,
        gradeExp: document.getElementById("u_grade_name").value,
        // Add other fields specific to Grade entity
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-grade/${gradeId}`, updatedGradeDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Grade Updated Successfully!");
        displayGrade();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add event listener for updating Port
const updatePortButton = document.getElementById("update-port-form");
updatePortButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const portId = document.getElementById("u_port_id").value;
    
    const updatedPortDetails = {
        id: portId,
        portName: document.getElementById("u_port_name").value,
        // Add other fields specific to Port entity
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-port/${portId}`, updatedPortDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Port Updated Successfully!");
        displayPort();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add event listener for updating Port Agent
const updatePortAgentButton = document.getElementById("update-port-agent-form");
updatePortAgentButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const portAgentId = document.getElementById("u_port_agent_id").value;
    
    const updatedPortAgentDetails = {
        id: portAgentId,
        portAgentName: document.getElementById("u_port_agent_name").value,
        contactPerson: document.getElementById("u_port_agent_contact").value,
        address: document.getElementById("u_port_agent_address").value,
        phone: document.getElementById("u_port_agent_phone").value,
        email: document.getElementById("u_port_agent_email").value,
        city: document.getElementById("u_port_agent_city").value,
        state: document.getElementById("u_port_agent_state").value,
        country: document.getElementById("u_port_agent_country").value,
        // Add other fields specific to Port Agent entity
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-port-agent/${portAgentId}`, updatedPortAgentDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Port Agent Updated Successfully!");
        displayPortagent();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add event listener for updating Hospital
const updateHospitalButton = document.getElementById("update-hospital-form");
updateHospitalButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hospitalId = document.getElementById("u_hospital_id").value;
    
    const updatedHospitalDetails = {
        id: hospitalId,
        hospitalName: document.getElementById("u_hospital_name").value,
        doctorName: document.getElementById("u_doctor_name").value,
        doctorAddress: document.getElementById("u_doctor_address").value,
        doctorCity: document.getElementById("u_doctor_city").value,
        doctorState: document.getElementById("u_doctor_state").value,
        doctorPhone: document.getElementById("u_doctor_phone").value,
        doctorEmail: document.getElementById("u_doctor_email").value,
        doctorUpload: document.getElementById("u_doctor_upload").value,
        // Add other fields specific to Hospital entity
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-hospital/${hospitalId}`, updatedHospitalDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Hospital Updated Successfully!");
        displayHospital();
    } catch (error) {
        console.error('Error:', error);
    }
});


// Add event listener for updating Document Type
const updateDocumentTypeButton = document.getElementById("update-document-type-form");
updateDocumentTypeButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const documentTypeId = document.getElementById("u_document_type_id").value;
    
    const updatedDocumentTypeDetails = {
        id: documentTypeId,
        documentType: document.getElementById("u_document_type_name").value,
        hideExpiryDate: document.getElementById("u_hide_expiry_date").checked,
        // Add other fields specific to Document Type entity
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-document/${documentTypeId}`, updatedDocumentTypeDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Document Type Updated Successfully!");
        displayDocument();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add event listener for updating Vendor
const updateVendorButton = document.getElementById("update-vendor-form");
updateVendorButton.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("u_vendor_id").value;
    
    const updatedVendorDetails = {
        id:id,
        vendorName: document.getElementById("u_vendor_name").value,
        vendorAddress: document.getElementById("u_vendor_address").value,
        // Add other fields specific to Vendor entity
    };

    try {
        const response = await axios.put(`http://localhost:3000/others/update-vendor/${id}`, updatedVendorDetails,{headers:{"Authorization":token}});
        console.log('Response:', response.data);
        alert("Vendor Updated Successfully!");
        displayVendor();
    } catch (error) {
        console.error('Error:', error);
    }
});

const logout = document.getElementById("logout")


logout.addEventListener("click",()=>{
    localStorage.clear();
    window.location.href ="../login/login.html"
})
 


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


function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}


const decodedToken = decodeToken(token);
const userRole = decodedToken.userGroup; // Assuming your user role is stored in userGroup
const hasUserManagement = decodedToken.userManagement; // Assuming userManagement is a boolean in the JWT payload

console.log(userRole,hasUserManagement)
switch (userRole) {
    case 'admin':
        document.getElementById('adminSection').style.display = 'block';
        break;
    case 'vendor':
        document.getElementById('vendorSection').style.display = 'block';
        if (hasUserManagement) {
            const userLink = document.createElement('a');
            userLink.href = '../user/user.html';
            userLink.innerHTML = '<i class="fas fa-user-plus"></i> &nbsp; Create User';
            document.getElementById('vendorSection').appendChild(userLink);
        }
        break;
    // case 'user':
    //     document.getElementById('userSection').style.display = 'block';
    //     break;
    default:
        console.error('Unknown user role:', userRole);
}
