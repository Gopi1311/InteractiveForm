// password toggle

const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword?.addEventListener("click", () => {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  togglePassword.classList.toggle("bi-eye-fill");
  togglePassword.classList.toggle("bi-eye-slash-fill");
});


  //clear the error message when reset form
  document.getElementById("resetBtn").addEventListener("click",()=>{
    document.querySelectorAll(".is-invalid").forEach(clear=>clear.classList.remove("is-invalid"));
  });
