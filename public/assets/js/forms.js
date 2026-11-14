// A demonstração não transmite os campos nem cria uma sessão.
document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    form.querySelector(".form-message").textContent =
      "Esta é uma demonstração. Nenhum dado foi enviado ou salvo.";
  });
});
