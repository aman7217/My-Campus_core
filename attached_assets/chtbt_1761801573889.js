/***** Mock data & utilities *****/
const DB = {
    _version: '2',
    announcements: [],
    resources: [
        { id: 1, name: 'IT Lab', type: 'lab', location: 'IT Block' },
        { id: 2, name: 'Chemistry Lab', type: 'lab', location: 'Labs Block' },
        { id: 3, name: 'E-Classroom', type: 'room', location: 'Admin Block' },
        { id: 4, name: 'Physics Lab', type: 'lab', location: 'Labs Block' },
        { id: 5, name: 'Smart Classroom', type: 'classroom', location: 'IT-Block' },
        { id: 6, name: 'Seminar Hall', type: 'hall', location: 'Admin Block' }
    ],
    courses: [
        { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:00-11:40', day: 'Mon' },
        { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '11:40-1:20', day: 'Mon' },
        { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', day: 'Mon' },
        { code: 'CS302', title: 'AAD', room: 'IT Lab', time: '3:20-5:00', day: 'Mon' },
        { code: 'IT301', title: 'SE', room: 'Smart class', time: '10:00-11:40', day: 'Tue' },
        { code: 'CS303', title: 'AAD', room: 'IT Lab', time: '11:40-1:20', day: 'Tue' },
        { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-5:00', day: 'Tue' },
        { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '10:00-11:40', day: 'Wed' },
        { code: 'CS302', title: 'AAD', room: 'IT Lab', time: '11:40-1:20', day: 'Wed' },
        { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', day: 'Wed' },
        { code: 'EL301', title: 'Java', room: 'IT Lab', time: '3:20-5:00', day: 'Wed' },
        { code: 'IT301', title: 'SE', room: 'Smart class', time: '10:00-11:40', day: 'Thu' },
        { code: 'CS302', title: 'ADD', room: 'IT Lab', time: '11:40-1:20', day: 'Thu' },
        { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', day: 'Thu' },
        { code: 'EL301', title: 'Java', room: 'IT Lab', time: '3:20-5:00', day: 'Thu' },
        { code: 'CS302', title: 'MP', room: 'IT Lab', time: '10:00-11:20', day: 'Fri' },
        { code: 'CS302', title: 'AAD', room: 'IT Lab', time: '11:20-11:40', day: 'Fri' },
        { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '11:40-1:20', day: 'Fri' },
        { code: 'EL301', title: 'Java', room: 'IT Lab', time: '1:40-3:20', day: 'Fri' },
        { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:00-11:40', day: 'Sat' },
        { code: 'CS302', title: 'MP', room: 'IT Lab', time: '11:40-1:20', day: 'Sat' },
        { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', day: 'Sat' }
    ],
    timetable: []
};

/* --- Helpers --- */
function seed() {
    try {
        const raw = localStorage.getItem('sc_demo');
        const existing = raw ? JSON.parse(raw) : null;
        if (!existing || existing._version !== DB._version) {
            const store = {
                _version: DB._version,
                user: { id: 1, name: "Student" },
                announcements: [],
                resources: DB.resources,
                courses: DB.courses,
                bookings: []
            };
            localStorage.setItem('sc_demo', JSON.stringify(store));
        }
    } catch {
        const store = {
            _version: DB._version,
            user: { id: 1, name: "Student" },
            announcements: [],
            resources: DB.resources,
            courses: DB.courses,
            bookings: []
        };
        localStorage.setItem('sc_demo', JSON.stringify(store));
    }
}
function store() { return JSON.parse(localStorage.getItem('sc_demo')); }
function save(s) { localStorage.setItem('sc_demo', JSON.stringify(s)); }
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

/* --- Rendering Functions --- */
function renderProfile() {
    const s = store();
    if (qs('#userBadge')) qs('#userBadge').textContent = s.user ? s.user.name : 'Guest';
}

function renderAnnouncements() {
    const el = qs('#announcements');
    if (!el) return;
    el.innerHTML = '';
    const adminAnnouncements = JSON.parse(localStorage.getItem('adminAnnouncements')) || [];
    if (adminAnnouncements.length === 0) {
        el.innerHTML = '<div class="muted">No announcements posted yet.</div>';
        return;
    }
    adminAnnouncements.forEach(a => {
        const d = document.createElement('div');
        d.className = 'mb';
        d.innerHTML = `<strong>${a.title}</strong>`;
        el.appendChild(d);
    });
}

function renderQuickTable() {
    const s = store();
    const container = qs('#quickTable');
    if (!container) return;
    container.innerHTML = '';
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const items = (s.courses || []).filter(c => c.day.toLowerCase().startsWith(today.toLowerCase()));
    if (!items.length) {
        container.innerHTML = '<div class="qt-muted">No classes today 🎉</div>';
        if (qs('#todayClasses')) qs('#todayClasses').textContent = 'No classes today';
        return;
    }
    items.sort((a, b) => a.time.localeCompare(b.time));
    items.forEach(c => {
        const card = document.createElement('div');
        card.className = 'qt-card';
        card.innerHTML = `
            <div class="qt-time">${c.time}</div>
            <div class="qt-title">${(c.title || '').toUpperCase()}</div>
            <div class="qt-room">${c.room} · ${c.day}</div>
        `;
        container.appendChild(card);
    });
    if (qs('#todayClasses')) qs('#todayClasses').textContent = `${items.length} class${items.length > 1 ? 'es' : ''} today`;
}

function renderFullTable() {
    const s = store();
    const timetableGrid = qs("#timetableGrid");
    if (!timetableGrid) return;
    timetableGrid.innerHTML = "";
    const days = {};
    s.courses.forEach(c => {
        if (!days[c.day]) days[c.day] = [];
        days[c.day].push(c);
    });
    for (const [day, courses] of Object.entries(days)) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day-card");
        let dayHTML = `<h3>${day}</h3>`;
        courses.forEach(c => {
            const teacher = getTeacher(c.code);
            dayHTML += `
                <div class="subject-card" data-tooltip="📘 Subject: ${c.title}\n🏫 Room: ${c.room}\n👨‍🏫 Teacher: ${teacher}">
                    <strong>${c.title}</strong><br>
                    <small>🕒 ${c.time}</small>
                </div>`;
        });
        dayDiv.innerHTML = dayHTML;
        timetableGrid.appendChild(dayDiv);
    }
}

function getTeacher(code) {
    const teachers = {
        'Java': 'Mr. Bhupendra Rana',
        'E-COMM': 'Mrs. Reena',
        'MP': 'Mr. Bhupendra Rana',
        'SE': 'Mrs. Prerna Puri',
        'AAD': 'Mrs. Reena',
    };
    const s = store();
    const course = s.courses.find(c => c.code === code);
    return course ? (teachers[course.title] || 'TBD') : 'TBD';
}

function renderResources() {
    const s = store();
    const select = qs('#resourceSelect');
    if (!select) return;
    select.innerHTML = '';
    s.resources.forEach(r => {
        const o = document.createElement('option');
        o.value = r.id;
        o.textContent = `${r.name} — ${r.location}`;
        select.appendChild(o);
    });
}

function renderBookings() {
    const s = store();
    const list = qs('#bookingList');
    if (!list) return;
    list.innerHTML = '';
    if (!s.bookings.length) {
        list.innerHTML = '<div class="muted">No Reservations yet</div>';
        return;
    }
    s.bookings.forEach(b => {
        const d = document.createElement('div');
        d.className = 'mb';
        d.innerHTML = `<strong>${b.resourceName}</strong> — ${b.date} ${b.from}-${b.to} <span class="small muted">(${b.status})</span>`;
        list.appendChild(d);
    });
}

/* --- Auth UI --- */
function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userType = localStorage.getItem('userType');
    if (isLoggedIn && userType === 'student') {
        if (qs('#loginBtn')) qs('#loginBtn').style.display = 'none';
        if (qs('#logoutBtn')) qs('#logoutBtn').style.display = 'inline-block';
        const s = store();
        if (qs('#userBadge')) qs('#userBadge').textContent = s.user.name;
    } else {
        if (qs('#loginBtn')) qs('#loginBtn').style.display = 'inline-block';
        if (qs('#logoutBtn')) qs('#logoutBtn').style.display = 'none';
        renderProfile();
    }
}

/* --- Initialize Everything --- */
document.addEventListener('DOMContentLoaded', () => {
    seed();
    renderProfile();
    renderAnnouncements();
    renderQuickTable();
    renderFullTable();
    renderResources();
    renderBookings();
    updateAuthUI();

    // ✅ LOGIN BUTTON
    if (qs('#loginBtn')) {
        qs('#loginBtn').addEventListener('click', () => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', 'student');
            updateAuthUI();
            alert('Logged in successfully!');
        });
    }

    // ✅ LOGOUT BUTTON
    if (qs('#logoutBtn')) {
        qs('#logoutBtn').addEventListener('click', () => {
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('userType');
            updateAuthUI();
            alert('Logged out successfully!');
        });
    }

    // ✅ Navigation
    qsa('nav .nav-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const dt = item.dataset.target;
            const target = dt || (item.id ? item.id.replace(/^nav/, '').toLowerCase() : null);
            if (target) navTo(target);
        });
    });
    navTo('home');
});

/* --- Navigation --- */
function navTo(id) {
    qsa('#mainContent > div').forEach(v => v.style.display = 'none');
    const view = qs(`#${id}View`);
    if (view) view.style.display = 'block';
    qsa('nav .nav-item').forEach(n => n.classList.remove('active'));
    const navId = '#nav' + (id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1));
    const activeEl = qs(navId);
    if (activeEl) activeEl.classList.add('active');
}
