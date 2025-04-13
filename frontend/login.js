document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = form.username.value.trim();
      const password = form.password.value.trim();
  
      if (!username || !password) {
        showToast("Please fill in all fields", "error");
        return;
      }
  
      try {
        const res = await fetch('http://127.0.0.1:5000/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const result = await res.json();
  
        if (res.ok) {
          showToast("✅ Login successful!", "success");
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 1500);
        } else {
          showToast(`❌ ${result.message || 'Invalid credentials'}`, "error");
        }
      } catch (error) {
        console.error(error);
        showToast("❌ Server error. Try again later.", "error");
      }
    });
  });
  
  // Reusable toast function
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
  
    toastMsg.textContent = message;
    toast.className = `toast show ${type}`;
  
    setTimeout(() => {
      toast.className = 'toast'; // Hide toast
    }, 3000);
  }
  