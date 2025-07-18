document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createRoomForm");
  const roomList = document.getElementById("roomList");

  function loadRooms() {
    const saved = JSON.parse(localStorage.getItem("createdRooms") || "[]");
    const now = Date.now();
    const filtered = saved.filter(room => now - room.timestamp < 24 * 60 * 60 * 1000); // 1 day
    roomList.innerHTML = "";
    filtered.forEach(room => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${room.url}" target="_blank">${room.name}</a>`;
      roomList.appendChild(li);
    });
    localStorage.setItem("createdRooms", JSON.stringify(filtered)); // Save updated list
  }

  loadRooms(); // Load on page load

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const roomName = document.getElementById("roomName").value;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://backend-cca7.onrender.com/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ name: roomName }),
      });

      if (!res.ok) {
        throw new Error("Room creation failed");
      }

      const data = await res.json();

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("createdRooms") || "[]");
      existing.push({ name: roomName, url: data.url, timestamp: Date.now() });
      localStorage.setItem("createdRooms", JSON.stringify(existing));

      alert("Room created: " + data.url);
      loadRooms(); // Refresh room list
    } catch (error) {
      alert("Failed to create room.");
      console.error(error);
    }
  });
});

// Logout button logic
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "login.html"; // Redirect to login
});
