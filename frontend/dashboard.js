document.getElementById('createRoomBtn').addEventListener('click', async function () {
  const token = localStorage.getItem('token');
  const res = await fetch('https://backend-cca7.onrender.com/api/create-room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  const data = await res.json();
  document.getElementById('roomLink').innerHTML = '<a href="' + data.url + '" target="_blank">Join Room</a>';
});
