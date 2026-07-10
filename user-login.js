// Toggle password visibility
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('i');

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// ==========================
// User Accounts
// ==========================
const users = [
  {
    username: "vishnu",
    password: "vishnu123",
    name: "Vishnu"
  },
  {
    username: "chithra",
    password: "chithra123",
    name: "Chithra"
  },
  {
    username: "bhoomika",
    password: "bhoomika123",
    name: "Bhoomika"
  },
  {
    username: "bhumika",
    password: "user123",
    name: "Bhumika"
  }
];

// ==========================
// User Login
// ==========================
function userLogin() {

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const message = document.getElementById("message");
  const btn = document.getElementById("loginBtn");
  const btnText = document.getElementById("loginBtnText");
  const btnIcon = document.getElementById("loginIcon");
  const spinner = document.getElementById("loginSpinner");

  message.innerHTML = "";

  if (!username || !password) {
    message.style.color = "#f87171";
    message.innerHTML = "⚠️ Please enter both username and password.";
    return;
  }

  btn.disabled = true;
  btnText.textContent = "Signing in...";
  btnIcon.style.display = "none";
  spinner.style.display = "block";

  setTimeout(() => {

    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (user) {

      localStorage.setItem("loggedInUser", user.name);

      message.style.color = "#34d399";
      message.innerHTML = `✅ Welcome ${user.name}! Redirecting...`;

      setTimeout(() => {
        window.location.href = "user-dashboard.html";
      }, 1000);

    } else {

      message.style.color = "#f87171";
      message.innerHTML = "❌ Invalid Username or Password.";

      btn.disabled = false;
      btnText.textContent = "Sign In";
      btnIcon.style.display = "inline";
      spinner.style.display = "none";
    }

  }, 1500);

}

// Allow Enter key
["username", "password"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      userLogin();
    }
  });
});
