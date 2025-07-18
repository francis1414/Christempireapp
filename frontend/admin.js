document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createRoomForm");
  const roomList = document.getElementById("roomList");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const roomName = document.getElementById("roomName").value;
    const token = localStorage.getItem("token"); // ✅ get JWT token

    try {
      const res = await fetch("https://backend-cca7.onrender.com/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token // ✅ send token to backend
        },
        body: JSON.stringify({ name: roomName }),
      });

      if (!res.ok) {
        throw new Error("Room creation failed");
      }

      const data = await res.json();

      alert("Room created: " + data.url);

      const li = document.createElement("li");
      li.innerHTML = `<a href="${data.url}" target="_blank">${roomName}</a>`;
      roomList.appendChild(li);
    } catch (error) {
      alert("Failed to create room.");
      console.error(error);
    }
  });
});
