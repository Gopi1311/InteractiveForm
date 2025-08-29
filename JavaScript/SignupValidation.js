document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  //validation patterns
  const patterns = {
    name: /^[A-Za-z]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{10}$/,
    zip: /^[0-9]{5,6}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
  };

  //field configuration

  const fields = [
    {
      id: "firstName",
      errorId: "firstNameError",
      pattern: patterns.name,
      message: "Enter a valid first name (letters only)",
    },
    {
      id: "lastName",
      errorId: "lastNameError",
      pattern: patterns.name,
      message: "Enter a valid last name (letters only)",
    },
    {
      id: "email",
      errorId: "emailError",
      pattern: patterns.email,
      message: "Enter a valid email address",
    },
    {
      id: "password",
      errorId: "passwordError",
      pattern: patterns.password,
      message: "Password must contain 1 uppercase, 1 number, min 6 chars",
    },
    {
      id: "address",
      errorId: "addressError",
      custom: (val) => val.length >= 5,
      message: "Enter a valid address",
    },
    {
      id: "phoneNumber",
      errorId: "phoneNumberError",
      pattern: patterns.phone,
      message: "Enter 10 digit phone number",
    },
    {
      id: "city",
      errorId: "cityError",
      pattern: patterns.name,
      message: "Enter a valid city",
    },
    {
      id: "zip",
      errorId: "zipError",
      pattern: patterns.zip,
      message: "Enter a valid ZIP code (5-6 digits)",
    },
  ];

  // Error handling

  const showError = (id, msg) => {
    const el = document.getElementById(id);
    const input = document.getElementById(id.replace("Error", "")); 
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
    fields.forEach(({ id, errorId, custom, pattern, message }) => {
      const value = document.getElementById(id)?.value.trim() || "";
      const valid = custom ? custom(value) : pattern.test(value);
      if (!valid) {
        showError(errorId, message);
        isValid = false;
      } else {
        clearError(errorId);
      }
    });

    const state = document.getElementById("state").value;
    if (state === "Choose...") {
      showError("stateError", "please select a state");
      isValid = false;
    } else {
      clearError("stateError");
    }

    if (isValid) {
      const newUser = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        zip: document.getElementById("zip").value.trim(),
        state: document.getElementById("state").value.trim(),
      };

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // check if email already exists
      const userExists = existingUsers.some(
        (user) => user.email === newUser.email
      );
      if (userExists) {
        alert("Email already registered!");
        return;
      }

      // add new user
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      console.log(localStorage.getItem("user"));
      alert("Form Submitted successfully");
      window.location.href = "LoginForm.html";
      form.reset();
    }
  });
});
