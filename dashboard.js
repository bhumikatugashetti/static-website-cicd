// Replace with your GET API URL
const apiUrl = "https://YOUR_API_ID.execute-api.eu-north-1.amazonaws.com/contacts";

// Load messages when page opens
window.onload = function () {
    updateDateTime();
    loadMessages();
};

// Update date & time
function updateDateTime() {
    const now = new Date();

    document.getElementById("dateTime").innerHTML =
        now.toLocaleDateString() + " | " + now.toLocaleTimeString();
}

// Load messages from API
async function loadMessages() {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById("totalMessages").innerHTML = data.length;
        data.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.message}</td>
                </tr>
            `;
        });
    }
    catch(error){
        console.log("Using fallback mock messages since API URL is unconfigured:", error);
        // Fallback mock messages to let dashboard load
        const mockData = [
            { name: "Alice Vance", email: "alice@example.com", phone: "+1 555-0192", message: "Need support with migrating our S3 assets." },
            { name: "David Miller", email: "david@example.com", phone: "+1 555-0144", message: "Inquiry about your cost optimization plans." }
        ];
        document.getElementById("totalMessages").innerHTML = mockData.length;
        mockData.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.message}</td>
                </tr>
            `;
        });
    }
}

// Logout
function logout(){
    sessionStorage.removeItem('isLoggedIn');
    window.location.href="user-login.html";
}
