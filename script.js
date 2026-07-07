// Smooth scrolling for navigation links

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "#082c6c";
        header.style.transition = "0.3s";
    } else {
        header.style.background = "#0b3d91";
    }

});

// ================= Contact Form =================

// Replace with your API Gateway Invoke URL + /contact
const apiUrl = "https://boooa02qvd.execute-api.eu-north-1.amazonaws.com/contact";


document.getElementById("contactForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        document.getElementById("response").innerHTML = result.message;

    } catch (error) {

        document.getElementById("response").innerHTML = "Error submitting form.";

    }

});
