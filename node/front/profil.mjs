document.addEventListener("DOMContentLoaded", async function () {
  const userIdSpan = document.getElementById("userId");
  const userNameSpan = document.getElementById("userName");
  const userEmailSpan = document.getElementById("userEmail");
  const userPasswordInput = document.getElementById("userPassword");
  const showPasswordCheckbox = document.getElementById("showPassword");

  // Récupérer les informations de l'utilisateur depuis le serveur
  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const userData = await response.json();

  // Afficher les informations de l'utilisateur dans la page
  userIdSpan.textContent = userData.id;
  userNameSpan.textContent = userData.name;
  userEmailSpan.textContent = userData.email;

  // Gérer l'affichage du mot de passe lorsque la case à cocher est cochée/décochée
  showPasswordCheckbox.addEventListener("change", function () {
    if (this.checked) {
      userPasswordInput.type = "text";
    } else {
      userPasswordInput.type = "password";
    }
  });
});
