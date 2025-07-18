document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const emailDisplay = document.getElementById('adminEmail');
  const form = document.getElementById('createRoomForm');
  const roomList = document.getElementById('roomList');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const userEmail = localStorage.getItem('email');
  if (userEmail) {
    emailDisplay.textContent = `Welcome, ${userEmail}`;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roomName = document.getElementById('roomName').value;

    try {
      const res = await fetch('https://backend-cca7.onrender.com/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: roomName })
      });

      const data = await res.json();
      if (res.ok) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${data.url}" target="_blank">${data.name}</a>`;
        roomList.appendChild(li);
        form.reset();
      } else {
        alert(data.message || 'Failed to create room');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating room');
    }
  });
});
