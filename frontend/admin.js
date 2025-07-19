document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = 'https://christ-empire-api.onrender.com';
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  const form = document.getElementById('createRoomForm');
  const roomName = document.getElementById('roomName');
  const roomUrl = document.getElementById('roomUrl');
  const roomList = document.getElementById('roomList');

  // Load rooms
  async function loadRooms() {
    try {
      const res = await fetch(`${API_BASE}/api/rooms`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const rooms = await res.json();

      roomList.innerHTML = '';
      rooms.forEach(room => {
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
    } catch (err) {
      console.error('Error fetching rooms:', err);
      alert('Failed to load rooms');
    }
  }

  // Create room
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = roomName.value.trim();
    const url = roomUrl.value.trim();

    if (!name || !url) {
      return alert('Both fields are required.');
    }

    try {
      const res = await fetch(`${API_BASE}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, url })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Room creation failed');
      }

      alert('Room created successfully!');
      form.reset();
      loadRooms();
    } catch (err) {
      console.error('Room creation error:', err);
      alert(`Failed to create room: ${err.message}`);
    }
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  loadRooms();
});

// Delete room
async function deleteRoom(id) {
  const API_BASE = 'https://christ-empire-api.onrender.com';
  if (confirm('Are you sure you want to delete this room?')) {
    try {
      const res = await fetch(`${API_BASE}/api/rooms/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Delete failed');
      }

      alert('Room deleted');
      location.reload();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting room');
    }
  }
}

// Copy room link
function copyLink(url) {
  navigator.clipboard.writeText(url)
    .then(() => alert('Link copied!'))
    .catch(() => alert('Failed to copy link'));
}
