document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = 'https://christ-empire-api.onrender.com'; // Replace with your deployed backend URL
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  const form = document.getElementById('createRoomForm');
  const roomName = document.getElementById('roomName');
  const roomUrl = document.getElementById('roomUrl');
  const roomList = document.getElementById('roomList');

  // Fetch and display rooms
  function loadRooms() {
    fetch(`${API_BASE}/api/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      roomList.innerHTML = '';
      data.forEach(room => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${room.name}</strong><br>
          <a href="${room.url}" target="_blank">${room.url}</a><br>
          <div class="room-actions">
            <button onclick="deleteRoom('${room._id}')">🗑️ Delete</button>
            <button onclick="copyLink('${room.url}')">📋 Copy</button>
            <a href="https://wa.me/?text=${encodeURIComponent(room.url)}" target="_blank">WhatsApp</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(room.url)}" target="_blank">Facebook</a>
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(room.url)}" target="_blank">Twitter</a>
          </div>
        `;
        roomList.appendChild(li);
      });
    })
    .catch(err => console.error('Error loading rooms:', err));
  }

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: roomName.value,
        url: roomUrl.value
      })
    })
    .then(res => res.json())
    .then(() => {
      alert('Room created successfully!');
      form.reset();
      loadRooms();
    })
    .catch(err => {
      console.error('Error creating room:', err);
      alert('Failed to create room');
    });
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  // Initialize
  loadRooms();
});

// Delete room
function deleteRoom(id) {
  const API_BASE = 'https://christ-empire-api.onrender.com';
  if (confirm('Are you sure you want to delete this room?')) {
    fetch(`${API_BASE}/api/rooms/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        alert('Room deleted');
        location.reload();
      } else {
        alert('Failed to delete room');
      }
    })
    .catch(err => {
      console.error('Error deleting room:', err);
      alert('Error occurred while deleting');
    });
  }
}

// Copy to clipboard
function copyLink(url) {
  navigator.clipboard.writeText(url)
    .then(() => alert('Link copied to clipboard!'))
    .catch(() => alert('Failed to copy'));
}
