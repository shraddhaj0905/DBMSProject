document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('trainerForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const age = document.getElementById('age').value.trim();
      const shift = document.getElementById('shift').value.trim();
      const salary = document.getElementById('salary').value.trim();
      const contact = document.getElementById('contact').value.trim();
      const password = document.getElementById('password').value.trim();
      const specialization = document.getElementById('specialization').value.trim();
  
      if (!name || !age || !shift || !salary || !contact || !password || !specialization) {
        alert("❌ Please fill in all the fields.");
        return;
      }
  
      const payload = {
        name,
        age,
        shift,
        salary,
        contact,
        password,
        specialization
      };
  
      try {
        const res = await fetch('http://127.0.0.1:5000/api/admin/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        const result = await res.json();
  
        if (res.ok) {
          alert(result.message || "✅ Trainer added successfully!");
          form.reset();
        } else {
          alert(`❌ Error: ${result.error}`);
        }
      } catch (err) {
        console.error("❌ Network error:", err);
        alert("❌ Failed to connect to the server.");
      }
    });
  });
  