const token = localStorage.getItem('token');

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

async function loadRooms() {
  const res = await fetch('https://backend-cca7.onrender.com/rooms', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const rooms = await res.json();
  const roomList = document.getElementById('roomList');
  roomList.innerHTML = '';

  rooms.forEach(room => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = room.url;
    link.target = '_blank';
    link.textContent = room.name || 'Join Meeting';
    li.appendChild(link);
    roomList.appendChild(li);
  });
}

// Call on load
loadRooms();
