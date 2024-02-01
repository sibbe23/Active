const token = localStorage.getItem('token');
let currentPage = 1; // Initialize current page

async function displayRank(page = 1, limit = 10) {
    try {
        // Fetch ranks from the server with pagination parameters
        const rankResponse = await axios.get(`http://localhost:3000/others/view-rank?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
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
                    <button class="btn border-0" onclick="editRank('${rank.id}','${rank.rank}','${rank.rankOrder}','${rank.category}',event)">
                        <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                    </button>
                    <button class="btn border-0" onclick="deleteRank('${rank.id}',event)">
                        <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            rankTable.appendChild(row);
        });

        // Display pagination controls
        const paginationControls = document.getElementById("pagination-controls");
        paginationControls.innerHTML = `<button class="btn btn-primary " onclick="displayRank(${page - 1}, ${limit})" ${page === 1 ? 'disabled' : ''}>Previous</button>
                                       <span>Page ${page}</span>
                                       <button class="btn btn-primary " onclick="displayRank(${page + 1}, ${limit})" ${rankResponse.data.ranks.length < limit ? 'disabled' : ''}>Next</button>`;
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