// Toggle password visibility
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Admin Login
function adminLogin() {
  const username  = document.getElementById('username').value.trim();
  const password  = document.getElementById('password').value.trim();
  const message   = document.getElementById('message');
  const btn       = document.getElementById('loginBtn');
  const btnText   = document.getElementById('loginBtnText');
  const btnIcon   = document.getElementById('loginIcon');
  const spinner   = document.getElementById('loginSpinner');

  // Reset
  message.style.color = '#fbbf24';
  message.innerHTML   = '';

  if (!username || !password) {
    message.style.color = '#f87171';
    message.innerHTML   = '⚠️ Please enter both username and password.';
    return;
  }

  // Loading state
  btn.disabled        = true;
  btnText.textContent = 'Verifying…';
  btnIcon.style.display  = 'none';
  spinner.style.display  = 'block';

  setTimeout(() => {
    if (username === 'admin' && password === 'admin123') {
      message.style.color = '#34d399';
      message.innerHTML   = '✅ Login successful! Redirecting…';
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    } else {
      message.style.color = '#f87171';
      message.innerHTML   = '❌ Invalid credentials. Please try again.';
      btn.disabled        = false;
      btnText.textContent = 'Sign In to Dashboard';
      btnIcon.style.display   = 'inline';
      spinner.style.display   = 'none';
    }
  }, 1500);
}

// Allow Enter key
['username', 'password'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') adminLogin();
  });
});