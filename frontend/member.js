document.addEventListener("DOMContentLoaded", async function () {
  const roomList = document.getElementById("roomList");

  try {
    const res = await fetch("https://backend-cca7.onrender.com/api/rooms");
    const data = await res.json();

    if (Array.isArray(data.rooms)) {
      data.rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${room.url}" target="_blank">${room.name}</a>`;
        roomList.appendChild(li);
      });
    } else {
      roomList.innerHTML = "<li>No rooms available.</li>";
    }
  } catch (error) {
    console.error("Error loading rooms", error);
    roomList.innerHTML = "<li>Error loading rooms.</li>";
  }
});
