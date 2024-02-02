const token = localStorage.getItem('token');
let currentPage = 1; // Initialize current page

async function displayRank(page = 1, limit = 10) {
    try {
        // Fetch ranks from the server with pagination parameters
        const rankResponse = await axios.get(`http://localhost:3000/others/view-rank?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
        console.log('Rank Response:', rankResponse);

        const rankTable = document.getElementById("rank-table");

        // Clear existing rows
        rankTable.innerHTML = "";
        let sno = (page - 1) * limit + 1;

        // Add each rank to the table
        rankResponse.data.ranks.forEach((rank, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${sno + index}</td>
                <td>${rank.rank}</td>
                <td>${rank.rankOrder}</td>
                <td>${rank.category}</td>
                <td>
                    <button class="btn border-0 m-0 p-0" onclick="editRank('${rank.id}','${rank.rank}','${rank.rankOrder}','${rank.category}',event)">
                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                    </button>
                    <button class="btn border-0 m-0 p-0" onclick="deleteRank('${rank.id}',event)">
                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            rankTable.appendChild(row);
        });

        // Display pagination controls
        const paginationControlsRank = document.getElementById("pagination-controls");

        // Initialize the HTML content for pagination controls
        let paginationHTML = `<nav aria-label="Page navigation" class="d-flex justify-content-start">
                                <ul class="pagination">
                                    <li class="page-item ${page === 1 ? 'disabled' : ''}">
                                        <a class="page-link" href="javascript:void(0);" onclick="displayRank(1, ${limit})">
                                            <i class="tf-icon bx bx-chevrons-left"></i>
                                        </a>
                                    </li>
                                    <li class="page-item ${page === 1 ? 'disabled' : ''}">
                                        <a class="page-link" href="javascript:void(0);" onclick="displayRank(${page - 1}, ${limit})">
                                            <i class="tf-icon bx bx-chevron-left"></i>
                                        </a>
                                    </li>`;

        // Maximum number of buttons to display (including ellipsis)
        const maxButtons = 4;

        // Display the page buttons
        for (let i = 1; i <= Math.ceil(rankResponse.data.totalPages); i++) {
            if (
                i === 1 ||                                  // First page
                i === Math.ceil(rankResponse.data.totalPages) ||  // Last page
                (i >= page - 1 && i <= page + maxButtons - 2) // Displayed pages around the current page
            ) {
                paginationHTML += `<li class="page-item ${page === i ? 'active' : ''}">
                                      <a class="page-link"  onclick="displayRank(${i}, ${limit})">${i}</a>
                                  </li>`;
            } else if (i === page + maxButtons - 1) {
                // Add ellipsis (...) before the last button
                paginationHTML += `<li class="page-item disabled">
                                      <span class="page-link">...</span>
                                  </li>`;
            }
        }

        paginationHTML += `<li class="page-item ${page === Math.ceil(rankResponse.data.totalPages) ? 'disabled' : ''}">
                            <a class="page-link" href="javascript:void(0);" onclick="displayRank(${page + 1}, ${limit})">
                                <i class="tf-icon bx bx-chevron-right"></i>
                            </a>
                        </li>
                        <li class="page-item ${page === Math.ceil(rankResponse.data.totalPages) ? 'disabled' : ''}">
                            <a class="page-link" href="javascript:void(0);" onclick="displayRank(${Math.ceil(rankResponse.data.totalPages)}, ${limit})">
                                <i class="tf-icon bx bx-chevrons-right"></i>
                            </a>
                        </li>
                        <span class='mt-2'> Showing ${page} of ${Math.ceil(rankResponse.data.totalPages)} pages </span>

                    </ul>
                </nav>
                `;

        // Set the generated HTML to paginationControlsRank
        paginationControlsRank.innerHTML = paginationHTML;

    } catch (error) {
        console.error('Error:', error);
    }
}





window.onload = async function () {
     displayRank();
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
async function editRank(rankId, rank, rankOrder, category, event) {
    event.preventDefault();
    document.getElementById("u_rank_id").value = rankId;
    document.getElementById("u_rank_name").value = rank;
    document.getElementById("u_rank_order").value = rankOrder;
    document.getElementById("u_rank_category").value = category;

    // Encode values for URL
    const encodedRank = encodeURIComponent(rank);
    const encodedRankOrder = encodeURIComponent(rankOrder);
    const encodedCategory = encodeURIComponent(category);

    // Redirect to edit-rank-2.html with encoded values in the query parameters
    const editUrl = `edit-rank-2.html?rankId=${rankId}&rank=${encodedRank}&rankOrder=${encodedRankOrder}&category=${encodedCategory}`;
    
    // Redirect to the editUrl
    window.location.href = editUrl;
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