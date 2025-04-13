document.addEventListener("DOMContentLoaded", async () => {
    const trainerGrid = document.querySelector(".trainer-grid");
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/trainers"); 
      const trainers = await response.json();
  
      if (!Array.isArray(trainers) || trainers.length === 0) {
        trainerGrid.innerHTML = "<p style='text-align:center; font-size:1.2rem;'>No trainers found.</p>";
        return;
      }
  
      trainerGrid.innerHTML = ""; 
  
      trainers.forEach(trainer => {
        const emoji = getEmoji(trainer.specialization);
  
        const card = document.createElement("div");
        card.className = "trainer-card";
  
        card.innerHTML = `
          <div class="trainer-emoji">${emoji}</div>
          <div class="trainer-name">${trainer.name}</div>
          <div class="trainer-specialty">${trainer.specialization}</div>
        `;
  
        trainerGrid.appendChild(card);
      });
    } catch (error) {
      console.error("❌ Error loading trainers:", error);
      trainerGrid.innerHTML = "<p style='text-align:center; font-size:1.2rem;'>Failed to load trainers.</p>";
    }
  });
  
  function getEmoji(specialization) {
    const spec = specialization.toLowerCase();
  
    if (spec.includes("yoga")) return "🧘‍♂️";
    if (spec.includes("cardio")) return "🏃‍♀️";
    if (spec.includes("strength") || spec.includes("weight")) return "🏋️‍♂️";
    if (spec.includes("kickboxing") || spec.includes("boxing")) return "🥊";
    return "💪"; // Default emoji
  }
  