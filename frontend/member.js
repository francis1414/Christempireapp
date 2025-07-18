document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");
  const roomList = document.getElementById("roomList");

  // Load rooms from localStorage (saved by admin)
  const savedRooms = JSON.parse(localStorage.getItem("createdRooms")) || [];
  const now = Date.now();

  // Filter rooms created within the last 24 hours
  const validRooms = savedRooms.filter(room => now - room.timestamp < 86400000); // 24hrs

  // Render the rooms
  validRooms.forEach(room => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${room.url}" target="_blank" style="color: purple;">${room.name}</a>`;
    roomList.appendChild(li);
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });

  // Auto-redirect if not logged in
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
});
