document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");

    // Default credentials stored in localStorage if not already saved
    if (!localStorage.getItem("userCreds")) {
        const creds = {
            admin: { user: "admin", pass: "@123admin" },
            student: { user: "student", pass: "@123student" }
        };
        localStorage.setItem("userCreds", JSON.stringify(creds));
    }

    // Redirect if already logged in
    const userType = localStorage.getItem("userType");
    if (localStorage.getItem("isLoggedIn") === "true") {
        if (userType === "admin") {
            window.location.href = "chtbt-admin.html";
        } else if (userType === "student") {
            window.location.href = "chtbt.html";
        }
    }

    // Login handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const enteredUser = usernameInput.value.trim();
        const enteredPass = passwordInput.value.trim();
        const savedCreds = JSON.parse(localStorage.getItem("userCreds"));

        if (enteredUser === savedCreds.admin.user && enteredPass === savedCreds.admin.pass) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", "admin");
            window.location.href = "chtbt-admin.html";
        }
        else if (enteredUser === savedCreds.student.user && enteredPass === savedCreds.student.pass) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", "student");
            window.location.href = "chtbt.html";
        }
        else {
            errorMsg.textContent = "Invalid username or password!";
        }
    });
});
