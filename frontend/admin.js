document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createRoomForm");
  const roomList = document.getElementById("roomList");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const roomName = document.getElementById("roomName").value;

    try {
      const res = await fetch("https://backend-cca7.onrender.com/api/create-rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roomName }),
      });

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
