const token = localStorage.getItem('token');

// Create Room
document.getElementById('createRoomBtn').addEventListener('click', async () => {
  const response = await fetch('https://your-backend-url.onrender.com/create-room', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  if (data.url) {
    alert(`Meeting Room Created: ${data.url}`);
    loadRooms(); // Reload the room list
  } else {
    alert('Error creating room');
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// Load Room List
async function loadRooms() {
  const res = await fetch('https://your-backend-url.onrender.com/rooms', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const rooms = await res.json();
  const roomList = document.getElementById('roomList');
  roomList.innerHTML = '';

  rooms.forEach(room => {
    const li = document.createElement('li');
    li.textContent = room.name;
    roomList.appendChild(li);
  });
}

// Call on load
loadRooms();
