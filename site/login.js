document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        // Redirection vers une autre page une fois connecté
        window.location.href = "/user/profile.html";
      } else {
        const errorMessage = await response.text();
        message.textContent = errorMessage;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      message.textContent = "Une erreur est survenue lors de la connexion.";
    }
  });
});
