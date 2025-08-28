document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
    const patterns={
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
    }
    const fields=[
        
             {
      id: "email",
      errorId: "emailError",
      pattern: patterns.email,
      message: "Invalid email or User not exist",
    },
    {
      id: "password",
      errorId: "passwordError",
      pattern: patterns.password,
      message: "Invalid Password",
    }
        
    ]

    //error handling

      const showError = (id, msg) => {
    const el = document.getElementById(id);
    const input = document.getElementById(id.replace("Error", "")); // match input by ID
    if (el) {
      el.textContent = msg;
    }
    if (input) {
      input.classList.add("is-invalid");
    }
  };

  const clearError = (id) => {
    const el = document.getElementById(id);
    const input = document.getElementById(id.replace("Error", ""));
    if (el) {
      el.textContent = "";
    }
    if (input) {
      input.classList.remove("is-invalid");
    }
  };

    form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    fields.forEach(({ id, errorId, pattern, message }) => {
      const value = document.getElementById(id)?.value.trim() || "";
      const valid =  pattern.test(value);
      if (!valid) {
        showError(errorId, message);
        isValid = false;
      } else {
        clearError(errorId);
      }
    });
    if(!isValid) return;
    let storedUsers=JSON.parse(localStorage.getItem("users"))||[];
    console.log(storedUsers);
    
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value.trim();
const foundUser = storedUsers.find(u => u.email === email && u.password === password);
     if (foundUser) {
    alert("✅ Successfully Logged In");
    form.reset();
    // window.location.href = "dashboard.html";
  } else {
    alert("❌ User Not Found or Wrong Credentials");
  }


});

});