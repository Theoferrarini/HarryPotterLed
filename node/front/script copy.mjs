  const formulaire = document.getElementById("formulaire");

  formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
      window.location.href = "/exo/front/profil.html"; // Redirige vers la page de profil
    } else {
      const errorMessage = await response.text();
      document.getElementById("message").innerText = errorMessage; // Affiche le message d'erreur
    }
  });

  const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/profil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Erreur lors de la récupération du profil utilisateur.");
    }
  };
