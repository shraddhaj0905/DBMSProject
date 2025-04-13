function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      dob: formData.get('dob'),
      weight: formData.get('weight'),
      height: formData.get('height'),
      email: formData.get('email'),
      contact: formData.get('contact'),
      emergency_contact: formData.get('emergency_contact'),
      password: formData.get('password'),
      membership_length: formData.get('membership_length'),  // ✅ Added this line
      goals: formData.getAll('goals[]')
    };

    try {
      const res = await fetch('http://localhost:5000/api/members/add-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        showToast('❌ ' + (err.message || 'Failed to register member'), 'error');
        return;
      }
      const memberid = await res.json();

      console.log(memberid);
      
      showToast(`✅ Member registered successfully! Your Member id is ${memberid.memberId}`);
      form.reset();

    } catch (error) {
      console.error(error);
      showToast('❌ Network error while registering member.', 'error');
    }
  });
});
