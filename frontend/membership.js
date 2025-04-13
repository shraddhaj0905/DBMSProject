document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("membershipForm");
  
    if (!form) {
      console.error("❌ membershipForm not found in DOM.");
      return;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const price = document.getElementById("price").value;
      const description = document.getElementById("description").value;
      const duration = document.getElementById("duration").value;
  
      const payload = {
        price,
        description,
        duration,
      };
  
      try {
        const res = await fetch("http://127.0.0.1:5000/api/admin/membership", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert("✅ Membership created successfully!");
          form.reset();
        } else {
          alert(`❌ Error: ${data.error || "Something went wrong."}`);
          console.error("Server responded with:", data);
        }
      } catch (err) {
        console.error("❌ Network error:", err);
        alert("❌ Network error. Please try again.");
      }
    });
  });
  