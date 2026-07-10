// Replace with your GET API URL
const apiUrl = "https://boooa02qvd.execute-api.eu-north-1.amazonaws.com/contacts";

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

    try {

        const response = await fetch(apiUrl);

        const data = await response.json();

        const table = document.getElementById("tableBody");

        table.innerHTML = "";

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

        alert("Unable to load messages.");

        console.log(error);

    }

}

// Logout
function logout(){

    window.location.href="admin.html";

}
