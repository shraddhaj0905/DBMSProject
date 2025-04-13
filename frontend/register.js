document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      // Check if passwords match
      if (data.password !== data.confirmPassword) {
        showToast("Passwords do not match!", "error");
        return;
      }
  
      // Remove confirmPassword before sending
      delete data.confirmPassword;
  
      try {
        const res = await fetch('/api/member/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
  
        const result = await res.json();
  
        if (res.ok) {
          showToast("✅ Registered successfully!", "success");
          form.reset();
        } else {
          showToast(`❌ ${result.message || 'Registration failed'}`, "error");
        }
      } catch (err) {
        console.error(err);
        showToast("❌ Server error. Please try again later.", "error");
      }
    });
  });
  
  // Simple toast
  function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }, 100);
  }
  