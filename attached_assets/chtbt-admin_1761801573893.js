// Redirect to login page if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    alert("Logged out successfully!");
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
    // --- DOM References ---
    const menuItems = document.querySelectorAll(".sidebar li");
    const sections = document.querySelectorAll(".section");
    const sectionTitle = document.getElementById("section-title");
    const studentTable = document.getElementById("student-table");
    const facultyTable = document.getElementById("faculty-table");
    const annFeed = document.getElementById("announcement-feed");
    const annText = document.getElementById("announcement-text");

    // --- LocalStorage Helpers ---
    const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
    const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    // --- Navigation ---
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            const target = item.getAttribute("data-section");
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(target).classList.add("active");
            sectionTitle.textContent = item.textContent.replace(/[^a-zA-Z ]/g, "");
            updateDashboard();
        });
    });

    // --- Students ---
    function renderStudents() {
        const students = getData("students");
        studentTable.innerHTML = students
            .map(
                (s, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${s.name}</td>
          <td>${s.father || ""}</td>
          <td>${s.course}</td>
          <td>
            <button class="delete-btn" onclick="deleteStudent(${i})">Delete</button>
            <button class="edit-btn" onclick="editStudent(${i})">Edit</button>
          </td>
        </tr>
        `
            )
            .join("");
    }

    window.deleteStudent = (index) => {
        const students = getData("students");
        students.splice(index, 1);
        setData("students", students);
        renderStudents();
        updateDashboard();
    };

    window.editStudent = (index) => {
        const students = getData("students");
        const student = students[index];

        const name = prompt("Edit student name:", student.name);
        if (name === null) return; // cancel
        const father = prompt("Edit father's name:", student.father || "");
        if (father === null) return; // cancel
        const course = prompt("Edit course:", student.course);
        if (course === null) return; // cancel

        students[index] = { name, father, course };
        setData("students", students);
        renderStudents();
        updateDashboard();
    };

    document.getElementById("add-student").addEventListener("click", () => {
        const name = prompt("Enter student name:");
        if (!name) return;
        const father = prompt("Enter father's name:") || "";
        const course = prompt("Enter course:");
        if (!course) return;

        const students = getData("students");
        students.push({ name, father, course });
        setData("students", students);
        renderStudents();
        updateDashboard();
    });


    // --- Faculty ---
    function renderFaculty() {
        const faculty = getData("faculty");
        facultyTable.innerHTML = faculty
            .map(
                (f, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${f.name}</td>
          <td>${f.dept}</td>
          <td><button class="delete-btn" onclick="deleteFaculty(${i})">Delete</button></td>
        </tr>`
            )
            .join("");
    }

    window.deleteFaculty = (index) => {
        const faculty = getData("faculty");
        faculty.splice(index, 1);
        setData("faculty", faculty);
        renderFaculty();
        updateDashboard();
    };

    document.getElementById("add-faculty").addEventListener("click", () => {
        const name = prompt("Enter Teacher name:");
        const dept = prompt("Enter department:");
        if (name && dept) {
            const faculty = getData("faculty");
            faculty.push({ name, dept });
            setData("faculty", faculty);
            renderFaculty();
            updateDashboard();
        }
    });

    // --- Announcements ---
    function renderAnnouncements() {
        const announcements = getData("announcements");
        annFeed.innerHTML = announcements
            .map(a => `<div><b>${a.time}</b><br>${a.text}</div>`)
            .reverse()
            .join("");
    }

    document.addEventListener("DOMContentLoaded", () => {
        const annText = document.getElementById("announcement-text");

        // Initialize if not exists
        if (!localStorage.getItem("adminAnnouncements")) {
            localStorage.setItem("adminAnnouncements", JSON.stringify([]));
        }

        document.getElementById("post-announcement").addEventListener("click", () => {
            const text = annText.value.trim();
            if (!text) return alert("Please write something!");

            const announcements = getData("adminAnnouncements");
            announcements.push({ text, time: new Date().toLocaleString() });
            setData("adminAnnouncements", announcements);

            annText.value = "";  // clear input
            renderAnnouncements();
            updateDashboard();
        });
    });


    // --- Dashboard Counts ---
    function updateDashboard() {
        document.getElementById("student-count").textContent = getData("students").length;
        document.getElementById("faculty-count").textContent = getData("faculty").length;
        document.getElementById("announcement-count").textContent = getData("announcements").length;
    }

    // --- Logout Simulation ---
    document.getElementById("logout-btn").addEventListener("click", () => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });

    // --- Initialize ---
    renderStudents();
    renderFaculty();
    renderAnnouncements();
    updateDashboard();
});

// Redirect to login page if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    alert("Logged out successfully!");
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
    // --- DOM References ---
    const menuItems = document.querySelectorAll(".sidebar li");
    const sections = document.querySelectorAll(".section");
    const sectionTitle = document.getElementById("section-title");
    const studentTable = document.getElementById("student-table");
    const facultyTable = document.getElementById("faculty-table");
    const annFeed = document.getElementById("announcement-feed");
    const annText = document.getElementById("announcement-text");

    // --- LocalStorage Helpers ---
    const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
    const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    // --- Navigation ---
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            const target = item.getAttribute("data-section");
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(target).classList.add("active");
            sectionTitle.textContent = item.textContent.replace(/[^a-zA-Z ]/g, "");
            updateDashboard();
        });
    });

    // --- Students ---
    function renderStudents() {
        const students = getData("students");
        studentTable.innerHTML = students
            .map(
                (s, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${s.name}</td>
          <td>${s.course}</td>
          <td><button class="delete-btn" onclick="deleteStudent(${i})">Delete</button></td>
        </tr>`
            )
            .join("");
    }

    window.deleteStudent = (index) => {
        const students = getData("students");
        students.splice(index, 1);
        setData("students", students);
        renderStudents();
        updateDashboard();
    };

    document.getElementById("add-student").addEventListener("click", () => {
        const name = prompt("Enter student name:");
        const course = prompt("Enter course:");
        if (name && course) {
            const students = getData("students");
            students.push({ name, course });
            setData("students", students);
            renderStudents();
            updateDashboard();
        }
    });

    // --- Faculty ---
    function renderFaculty() {
        const faculty = getData("faculty");
        facultyTable.innerHTML = faculty
            .map(
                (f, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${f.name}</td>
          <td>${f.dept}</td>
          <td><button class="delete-btn" onclick="deleteFaculty(${i})">Delete</button></td>
        </tr>`
            )
            .join("");
    }

    window.deleteFaculty = (index) => {
        const faculty = getData("faculty");
        faculty.splice(index, 1);
        setData("faculty", faculty);
        renderFaculty();
        updateDashboard();
    };

    document.getElementById("add-faculty").addEventListener("click", () => {
        const name = prompt("Enter Teacher name:");
        const dept = prompt("Enter department:");
        if (name && dept) {
            const faculty = getData("faculty");
            faculty.push({ name, dept });
            setData("faculty", faculty);
            renderFaculty();
            updateDashboard();
        }
    });

    // --- Announcements ---
    function renderAnnouncements() {
        const announcements = getData("adminAnnouncements");
        annFeed.innerHTML = announcements
            .map(
                (a, i) => `
            <div class="announcement-item">
                <p><b>${a.time}</b></p>
                <p>${a.text}</p>
                <button class="delete-btn" onclick="deleteAnnouncement(${i})">Delete</button>
                <hr>
            </div>`
            )
            .reverse()
            .join("");
    }

    window.deleteAnnouncement = (index) => {
        const announcements = getData("adminAnnouncements");
        announcements.splice(index, 1);
        setData("adminAnnouncements", announcements);
        renderAnnouncements();
        updateDashboard();
    };

    document.getElementById("post-announcement").addEventListener("click", () => {
        const text = annText.value.trim();
        if (!text) return alert("Please write something!");
        const announcements = getData("adminAnnouncements");
        announcements.push({ text, time: new Date().toLocaleString() });
        setData("adminAnnouncements", announcements);
        annText.value = "";
        renderAnnouncements();
        updateDashboard();
    });

    // --- Dashboard Counts ---
    function updateDashboard() {
        document.getElementById("student-count").textContent = getData("students").length;
        document.getElementById("faculty-count").textContent = getData("faculty").length;
        document.getElementById("announcement-count").textContent = getData("adminAnnouncements").length;
    }

    // --- Initialize ---
    renderStudents();
    renderFaculty();
    renderAnnouncements();
    updateDashboard();
});

document.addEventListener("DOMContentLoaded", () => {
    const studentTable = document.getElementById("student-table");
    const addStudentBtn = document.getElementById("add-student");

    const modal = document.getElementById("student-form-modal");
    const closeModal = document.getElementById("close-modal");
    const form = document.getElementById("student-form");
    const modalTitle = document.getElementById("modal-title");
    const nameInput = document.getElementById("student-name");
    const fatherInput = document.getElementById("student-father");
    const courseInput = document.getElementById("student-course");
    const indexInput = document.getElementById("student-index");

    // LocalStorage helpers
    const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
    const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    // Render students
    function renderStudents() {
        const students = getData("students");
        studentTable.innerHTML = students.map((s, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${s.name}</td>
                <td>${s.father || ""}</td>
                <td>${s.course}</td>
                <td>
                    <button onclick="editStudent(${i})">Edit</button>
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>
        `).join("");
    }

    // Delete student
    window.deleteStudent = (index) => {
        const students = getData("students");
        students.splice(index, 1);
        setData("students", students);
        renderStudents();
    };

    // Open modal to edit student
    window.editStudent = (index) => {
        const students = getData("students");
        const s = students[index];
        modal.style.display = "flex";
        modalTitle.textContent = "Edit Student";
        nameInput.value = s.name;
        fatherInput.value = s.father || "";
        courseInput.value = s.course;
        indexInput.value = index; // store index
    };

    // Open modal to add new student
    addStudentBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        modalTitle.textContent = "Add Student";
        nameInput.value = "";
        fatherInput.value = "";
        courseInput.value = "";
        indexInput.value = "";
    });

    // Close modal
    closeModal.addEventListener("click", () => modal.style.display = "none");

    // Submit form
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const father = fatherInput.value.trim();
        const course = courseInput.value.trim();
        const index = indexInput.value;

        if (!name || !course) return alert("Name and Course are required!");

        const students = getData("students");

        if (index === "") {
            // Add new student
            students.push({ name, father, course });
        } else {
            // Edit existing student
            students[index] = { name, father, course };
        }

        setData("students", students);
        renderStudents();
        modal.style.display = "none";
    });

    renderStudents();
});
