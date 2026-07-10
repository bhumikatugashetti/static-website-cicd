// ── Date/Time ────────────────────────────────────
function updateDateTime() {
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dateTime').textContent =
    now.toLocaleDateString(undefined, opts) + ' | ' + now.toLocaleTimeString();
}
updateDateTime();
setInterval(updateDateTime, 1000);

// ── Sidebar Toggle ───────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ── Nav Item Active State ────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');

    // Update page title
    const section = this.dataset.section;
    document.querySelector('.page-title').textContent =
      section.charAt(0).toUpperCase() + section.slice(1);
  });
});

// ── Logout ───────────────────────────────────────
function logout() {
  if (confirm('Are you sure you want to log out?')) {
    window.location.href = 'user-login.html';
  }
}

// ── Support Ticket Form ──────────────────────────
function submitTicket(e) {
  e.preventDefault();
  const category    = document.getElementById('ticketCategory').value;
  const priority    = document.getElementById('ticketPriority').value;
  const description = document.getElementById('ticketDescription').value.trim();
  const msg         = document.getElementById('ticketMsg');

  if (!description) {
    msg.style.color   = '#f87171';
    msg.textContent   = '⚠️ Please add a description before submitting.';
    return;
  }

  const btn = e.target.querySelector('.tf-submit');
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  setTimeout(() => {
    msg.style.color = '#34d399';
    msg.textContent = `✅ Ticket submitted! Category: ${category} | Priority: ${priority}. We'll respond within 24h.`;
    document.getElementById('ticketDescription').value = '';
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Ticket';
    btn.disabled = false;
  }, 1200);
}
