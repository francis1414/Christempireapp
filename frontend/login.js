document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const res = await fetch("https://backend-cca7.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "member.html";
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error", err);
    alert("An error occurred. Try again.");
  }
});
