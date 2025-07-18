document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('https://backend-cca7.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          // Redirect based on role
          if (email === 'admin@church.com') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'member.html';
          }
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('An error occurred. Try again.');
        console.error('Login error', err);
      }
    });
  }
});
