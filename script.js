// Global variables
let currentUser = null;
let userRole = 'student'; // 'student', 'alumni', 'admin'
let alumniData = [];
let eventsData = [];
let requestsData = [];
let currentPage = 'dashboard';
let selectedInterests = [];
let interestedEvents = [];

// Enhanced sample data with SIH requirements
const sampleAlumniData = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@email.com",
        graduationYear: "2020",
        region: "North India",
        specialization: "Employed",
        field: "Software Development",
        company: "Google India",
        position: "Senior Software Engineer",
        skills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning"],
        bio: "Passionate software engineer with 4+ years of experience in full-stack development.",
        avatar: "RS"
    },
    {
        id: 2,
        name: "Priya Patel",
        email: "priya.patel@email.com",
        graduationYear: "2019",
        region: "West India",
        specialization: "Entrepreneur",
        field: "FinTech",
        company: "PayNext Solutions (Founder)",
        position: "CEO & Founder",
        skills: ["Business Strategy", "Finance", "Leadership", "Product Management"],
        bio: "Serial entrepreneur building the next generation of financial technology solutions.",
        avatar: "PP"
    },
    {
        id: 3,
        name: "Dr. Amit Kumar",
        email: "amit.kumar@email.com",
        graduationYear: "2018",
        region: "East India",
        specialization: "Research",
        field: "Artificial Intelligence",
        company: "IIT Delhi",
        position: "Assistant Professor",
        skills: ["Machine Learning", "Deep Learning", "Research", "Python", "TensorFlow"],
        bio: "AI researcher working on computer vision and natural language processing.",
        avatar: "AK"
    },
    {
        id: 4,
        name: "Sneha Reddy",
        email: "sneha.reddy@email.com",
        graduationYear: "2021",
        region: "South India",
        specialization: "Employed",
        field: "Data Science",
        company: "Microsoft",
        position: "Data Scientist",
        skills: ["Data Science", "Python", "SQL", "Machine Learning", "Statistics"],
        bio: "Data scientist passionate about extracting insights from complex datasets.",
        avatar: "SR"
    },
    {
        id: 5,
        name: "Vikram Singh",
        email: "vikram.singh@email.com",
        graduationYear: "2020",
        region: "North India",
        specialization: "Entrepreneur",
        field: "E-commerce",
        company: "ShopEasy (Co-founder)",
        position: "CTO",
        skills: ["E-commerce", "Scalable Systems", "Leadership", "AWS", "Microservices"],
        bio: "Building scalable e-commerce solutions for small and medium businesses.",
        avatar: "VS"
    }
];

const sampleEventsData = [
    {
        id: 1,
        title: "Annual Alumni Tech Conference 2025",
        date: "2025-10-15",
        description: "Join industry leaders and innovators for a day of networking, knowledge sharing, and career opportunities in technology.",
        attendees: 450,
        interested: 123,
        status: "upcoming",
        tags: ["Technology", "Networking", "Career"],
        organizer: "Alumni Relations Office"
    },
    {
        id: 2,
        title: "Startup Pitch Competition",
        date: "2025-11-20",
        description: "Present your startup ideas to successful alumni entrepreneurs and investors. Win funding and mentorship opportunities.",
        attendees: 200,
        interested: 89,
        status: "upcoming", 
        tags: ["Entrepreneurship", "Startups", "Investment"],
        organizer: "Entrepreneurship Cell"
    },
    {
        id: 3,
        title: "AI & Machine Learning Workshop",
        date: "2025-12-05",
        description: "Hands-on workshop on latest AI/ML technologies by industry experts and research scholars.",
        attendees: 150,
        interested: 67,
        status: "upcoming",
        tags: ["AI", "Machine Learning", "Workshop"],
        organizer: "Computer Science Department"
    },
    {
        id: 4,
        title: "Alumni Mentorship Program Launch",
        date: "2025-10-01",
        description: "Connecting current students with successful alumni for career guidance and professional development.",
        attendees: 300,
        interested: 156,
        status: "upcoming",
        tags: ["Mentorship", "Career Development", "Students"],
        organizer: "Alumni Relations Office"
    }
];

const sampleRequestsData = [
    {
        id: 1,
        from: "student1@college.edu",
        to: "rahul.sharma@email.com",
        type: "mentorship",
        message: "Hi Rahul, I'm a final year CS student interested in software engineering at top tech companies. Would love to connect for guidance.",
        status: "pending",
        timestamp: "2025-09-25T10:30:00Z",
        cooldownUntil: null
    },
    {
        id: 2,
        from: "student2@college.edu", 
        to: "priya.patel@email.com",
        type: "internship",
        message: "Hello Priya, I'm interested in fintech and would love to explore internship opportunities at your company.",
        status: "approved",
        timestamp: "2025-09-20T14:15:00Z",
        cooldownUntil: null
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    initializeAuthSystem();
    initializeEventListeners();
});

// Initialize sample data
function initializeData() {
    alumniData = [...sampleAlumniData];
    eventsData = [...sampleEventsData];
    requestsData = [...sampleRequestsData];
}

// Initialize authentication system
function initializeAuthSystem() {
    // Show sign-in page by default
    document.getElementById('signInPage').classList.add('active');
    
    // Initialize auth tabs
    document.querySelectorAll('.auth-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchAuthTab(btn.dataset.tab));
    });

    // Initialize login forms
    document.getElementById('studentLoginForm').addEventListener('submit', (e) => handleLogin(e, 'student'));
    document.getElementById('alumniLoginForm').addEventListener('submit', (e) => handleLogin(e, 'alumni'));
    document.getElementById('adminLoginForm').addEventListener('submit', (e) => handleLogin(e, 'admin'));

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

// Switch authentication tabs
function switchAuthTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.auth-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) btn.classList.add('active');
    });

    // Update tab content
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Handle login
function handleLogin(e, role) {
    e.preventDefault();
    showLoading();

    setTimeout(() => {
        userRole = role;
        currentUser = {
            name: role === 'student' ? 'John Student' : role === 'alumni' ? 'Rahul Sharma' : 'Admin User',
            email: role === 'student' ? 'john.student@college.edu' : role === 'alumni' ? 'rahul.sharma@email.com' : 'admin@college.edu',
            role: role,
            id: role === 'student' ? 'student1' : role === 'alumni' ? 1 : 'admin1'
        };

        // Hide sign-in page and show main app
        document.getElementById('signInPage').classList.remove('active');
        document.getElementById('mainApp').classList.add('active');

        // Initialize main application
        initializeMainApp();
        
        hideLoading();
        showNotification(`Welcome, ${currentUser.name}!`, 'success');
    }, 1500);
}

// Handle logout
function handleLogout() {
    currentUser = null;
    userRole = 'student';
    
    // Hide main app and show sign-in page
    document.getElementById('mainApp').classList.remove('active');
    document.getElementById('signInPage').classList.add('active');
    
    // Reset forms
    document.querySelectorAll('form').forEach(form => form.reset());
    
    showNotification('Logged out successfully');
}

// Initialize main application
function initializeMainApp() {
    updateUserInterface();
    initializeNavigation();
    initializeMainEventListeners();
    showPage('dashboard');
}

// Update UI based on user role
function updateUserInterface() {
    // Update user name displays
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('dashboardUserName').textContent = currentUser.name;
    document.getElementById('userRoleBadge').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    // Update welcome message
    const welcomeMessages = {
        student: "Explore opportunities, connect with alumni, and build your career network.",
        alumni: "Share your expertise, mentor students, and stay connected with your alma mater.",
        admin: "Manage the alumni network, oversee events, and maintain system operations."
    };
    document.getElementById('welcomeMessage').textContent = welcomeMessages[userRole];

    // Show/hide role-specific elements
    const createEventBtn = document.getElementById('createEventBtn');
    const receivedRequestsTab = document.getElementById('receivedRequestsTab');
    
    if (userRole === 'admin' || userRole === 'alumni') {
        createEventBtn.style.display = 'inline-flex';
    }
    
    if (userRole === 'alumni') {
        receivedRequestsTab.style.display = 'block';
    } else {
        receivedRequestsTab.style.display = 'none';
    }

    // Update profile information
    updateProfileDisplay();
}

// Initialize navigation
function initializeNavigation() {
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            showPage(page);
        });
    });
}

// Initialize main event listeners
function initializeMainEventListeners() {
    initializeSearch();
    initializeDashboardQuickActions();
    initializeAlumniDirectory();
    initializeReachOut();
    initializeEvents();
    initializeProfile();
    initializeModals();
}

// Initialize search functionality
function initializeSearch() {
    const searchBtn = document.getElementById('alumniSearchBtn');
    const searchInput = document.getElementById('alumniSearchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performAlumniSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performAlumniSearch();
        });
    }

    // Filter functionality
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    
    if (applyFiltersBtn) applyFiltersBtn.addEventListener('click', applyAlumniFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearAlumniFilters);
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;

        // Load page-specific content
        switch(pageId) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'alumni-directory':
                loadAlumniDirectory();
                break;
            case 'reach-out':
                loadReachOut();
                break;
            case 'events':
                loadEvents();
                break;
            case 'profile':
                loadProfile();
                break;
        }
    }

    // Update navigation active state
    document.querySelectorAll('[data-page]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Dashboard functionality
function initializeDashboardQuickActions() {
    const container = document.getElementById('dashboardQuickActions');
    if (!container) return;

    let quickActions = [];

    if (userRole === 'student') {
        quickActions = [
            { id: 'findMentors', icon: 'fas fa-user-friends', text: 'Find Mentors', action: () => showPage('reach-out') },
            { id: 'browseEvents', icon: 'fas fa-calendar', text: 'Browse Events', action: () => showPage('events') },
            { id: 'exploreAlumni', icon: 'fas fa-users', text: 'Explore Alumni', action: () => showPage('alumni-directory') },
            { id: 'updateProfile', icon: 'fas fa-user-edit', text: 'Update Profile', action: () => openEditProfile() }
        ];
    } else if (userRole === 'alumni') {
        quickActions = [
            { id: 'viewRequests', icon: 'fas fa-inbox', text: 'View Requests', action: () => showPage('reach-out') },
            { id: 'createEvent', icon: 'fas fa-plus-circle', text: 'Create Event', action: () => createEvent() },
            { id: 'mentorStudents', icon: 'fas fa-graduation-cap', text: 'Mentor Students', action: () => showPage('reach-out') },
            { id: 'updateProfile', icon: 'fas fa-user-edit', text: 'Update Profile', action: () => openEditProfile() }
        ];
    } else if (userRole === 'admin') {
        quickActions = [
            { id: 'manageUsers', icon: 'fas fa-users-cog', text: 'Manage Users', action: () => showNotification('User management feature') },
            { id: 'analytics', icon: 'fas fa-chart-bar', text: 'View Analytics', action: () => showNotification('Analytics dashboard') },
            { id: 'manageEvents', icon: 'fas fa-calendar-alt', text: 'Manage Events', action: () => showPage('events') },
            { id: 'systemSettings', icon: 'fas fa-cog', text: 'System Settings', action: () => showNotification('System settings') }
        ];
    }

    container.innerHTML = `
        <h2><i class="fas fa-bolt"></i> Quick Actions</h2>
        <div class="actions-grid">
            ${quickActions.map(action => `
                <button class="action-btn" onclick="${action.action.name}()">
                    <i class="${action.icon}"></i>
                    ${action.text}
                </button>
            `).join('')}
        </div>
    `;
}

function loadDashboard() {
    loadUpcomingEvents();
    loadRecentActivity();
    loadAIRecommendations();
}

function loadUpcomingEvents() {
    const container = document.getElementById('upcomingEventsSlider');
    if (!container) return;

    const upcomingEvents = eventsData.filter(event => new Date(event.date) > new Date()).slice(0, 3);
    
    container.innerHTML = upcomingEvents.map(event => `
        <div class="event-card">
            <div class="event-date">
                <i class="fas fa-calendar"></i> ${formatDate(event.date)}
            </div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description.substring(0, 100)}...</div>
            <div class="event-stats">
                <span class="event-attendees">
                    <i class="fas fa-users"></i> ${event.interested} interested
                </span>
                <button class="interest-btn ${interestedEvents.includes(event.id) ? 'interested' : ''}" 
                        onclick="toggleEventInterest(${event.id})">
                    <i class="fas fa-heart"></i>
                    ${interestedEvents.includes(event.id) ? 'Interested' : 'Show Interest'}
                </button>
            </div>
        </div>
    `).join('');
}

function loadRecentActivity() {
    const container = document.getElementById('activityFeed');
    if (!container) return;

    const activities = [
        { icon: 'fas fa-user-plus', title: 'New alumni joined', description: '5 new alumni joined this week', time: '2 hours ago' },
        { icon: 'fas fa-calendar-plus', title: 'New event created', description: 'AI Workshop scheduled for December', time: '1 day ago' },
        { icon: 'fas fa-handshake', title: 'Connection made', description: 'Student connected with alumni mentor', time: '2 days ago' },
        { icon: 'fas fa-star', title: 'Achievement unlocked', description: 'Profile completion badge earned', time: '3 days ago' }
    ];

    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

function loadAIRecommendations() {
    const container = document.getElementById('recommendationsGrid');
    if (!container) return;

    let recommendations = [];

    if (userRole === 'student') {
        recommendations = [
            { title: 'Recommended Alumni', description: 'Connect with alumni in your field of interest', action: 'View Matches' },
            { title: 'Upcoming Events', description: 'Events matching your career interests', action: 'Browse Events' },
            { title: 'Skill Development', description: 'Courses recommended by alumni', action: 'View Courses' }
        ];
    } else if (userRole === 'alumni') {
        recommendations = [
            { title: 'Student Requests', description: 'Students seeking mentorship in your field', action: 'View Requests' },
            { title: 'Networking Events', description: 'Connect with fellow alumni', action: 'Join Events' },
            { title: 'Give Back', description: 'Opportunities to contribute to college', action: 'Explore Ways' }
        ];
    }

    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
            <button class="btn-primary btn-small">${rec.action}</button>
        </div>
    `).join('');
}

// Alumni Directory functionality
function initializeAlumniDirectory() {
    // Already handled in initializeSearch
}

function loadAlumniDirectory() {
    displayAlumniGrid(alumniData);
}

function performAlumniSearch() {
    const query = document.getElementById('alumniSearchInput').value.toLowerCase().trim();
    
    if (!query) {
        displayAlumniGrid(alumniData);
        return;
    }

    showLoading();

    setTimeout(() => {
        const results = alumniData.filter(alumni => 
            alumni.name.toLowerCase().includes(query) ||
            alumni.field.toLowerCase().includes(query) ||
            alumni.company.toLowerCase().includes(query) ||
            alumni.skills.some(skill => skill.toLowerCase().includes(query))
        );

        displayAlumniGrid(results);
        hideLoading();
        showNotification(`Found ${results.length} alumni matching "${query}"`);
    }, 500);
}

function applyAlumniFilters() {
    const batch = document.getElementById('batchFilter').value;
    const region = document.getElementById('regionFilter').value;
    const specialization = document.getElementById('specializationFilter').value;
    const field = document.getElementById('fieldFilter').value;

    let filteredData = [...alumniData];

    if (batch) filteredData = filteredData.filter(alumni => alumni.graduationYear === batch);
    if (region) filteredData = filteredData.filter(alumni => alumni.region === region);
    if (specialization) filteredData = filteredData.filter(alumni => alumni.specialization === specialization);
    if (field) filteredData = filteredData.filter(alumni => alumni.field.toLowerCase().includes(field.toLowerCase()));

    displayAlumniGrid(filteredData);
    showNotification(`Applied filters - ${filteredData.length} alumni found`);
}

function clearAlumniFilters() {
    document.getElementById('batchFilter').value = '';
    document.getElementById('regionFilter').value = '';
    document.getElementById('specializationFilter').value = '';
    document.getElementById('fieldFilter').value = '';
    document.getElementById('alumniSearchInput').value = '';
    
    displayAlumniGrid(alumniData);
    showNotification('Filters cleared');
}

function displayAlumniGrid(alumni) {
    const container = document.getElementById('alumniGrid');
    if (!container) return;

    container.innerHTML = alumni.map(alumni => `
        <div class="alumni-card">
            <div class="alumni-header">
                <div class="alumni-avatar">${alumni.avatar}</div>
                <div class="alumni-info">
                    <h3>${alumni.name}</h3>
                    <p>${alumni.position} at ${alumni.company}</p>
                </div>
            </div>
            <div class="alumni-details">
                <div class="detail-item">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Class of ${alumni.graduationYear}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${alumni.region}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${alumni.specialization} - ${alumni.field}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-envelope"></i>
                    <span>${alumni.email}</span>
                </div>
            </div>
            <div class="alumni-tags">
                ${alumni.skills.slice(0, 3).map(skill => `<span class="tag">${skill}</span>`).join('')}
            </div>
            <p style="margin: 1rem 0; color: var(--text-light); font-size: 0.9rem;">${alumni.bio}</p>
            <div class="alumni-actions">
                ${userRole === 'student' ? `
                    <button class="btn-primary btn-small" onclick="sendConnectionRequest(${alumni.id})">
                        <i class="fas fa-plus"></i> Connect
                    </button>
                ` : ''}
                <button class="btn-secondary btn-small" onclick="viewAlumniProfile(${alumni.id})">
                    <i class="fas fa-user"></i> View Profile
                </button>
            </div>
        </div>
    `).join('');
}

// Reach Out functionality
function initializeReachOut() {
    // Interest tags selection
    document.querySelectorAll('#interestTags .tag').forEach(tag => {
        tag.addEventListener('click', () => toggleInterestTag(tag));
    });

    // Find matching alumni button
    const findBtn = document.getElementById('findMatchingAlumniBtn');
    if (findBtn) {
        findBtn.addEventListener('click', findMatchingAlumni);
    }

    // Request tabs
    document.querySelectorAll('.requests-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchRequestTab(btn.dataset.tab));
    });
}

function loadReachOut() {
    loadMyRequests();
    if (userRole === 'alumni') {
        loadReceivedRequests();
    }
}

function toggleInterestTag(tag) {
    const interest = tag.dataset.interest;
    
    if (selectedInterests.includes(interest)) {
        selectedInterests = selectedInterests.filter(i => i !== interest);
        tag.classList.remove('selected');
    } else {
        selectedInterests.push(interest);
        tag.classList.add('selected');
    }
}

function findMatchingAlumni() {
    if (selectedInterests.length === 0) {
        showNotification('Please select at least one area of interest', 'warning');
        return;
    }

    showLoading();

    setTimeout(() => {
        // AI-powered matching algorithm simulation
        const matchingAlumni = alumniData.filter(alumni => {
            return selectedInterests.some(interest => 
                alumni.skills.some(skill => skill.toLowerCase().includes(interest.toLowerCase())) ||
                alumni.field.toLowerCase().includes(interest.toLowerCase())
            );
        });

        displayMatchingAlumni(matchingAlumni);
        hideLoading();
        showNotification(`Found ${matchingAlumni.length} alumni matching your interests!`, 'success');
    }, 1000);
}

function displayMatchingAlumni(alumni) {
    const container = document.getElementById('matchedAlumniGrid');
    if (!container) return;

    container.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--text-dark);">
            <i class="fas fa-magic"></i> AI-Matched Alumni (${alumni.length})
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
            ${alumni.map(alumni => `
                <div class="alumni-card" style="margin-bottom: 0;">
                    <div class="alumni-header">
                        <div class="alumni-avatar">${alumni.avatar}</div>
                        <div class="alumni-info">
                            <h3>${alumni.name}</h3>
                            <p>${alumni.position}</p>
                        </div>
                    </div>
                    <div class="alumni-details">
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>${alumni.company}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Class of ${alumni.graduationYear}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${alumni.region}</span>
                        </div>
                    </div>
                    <div class="alumni-tags">
                        ${alumni.skills.filter(skill => 
                            selectedInterests.some(interest => skill.toLowerCase().includes(interest.toLowerCase()))
                        ).slice(0, 3).map(skill => `<span class="tag selected">${skill}</span>`).join('')}
                    </div>
                    <div class="alumni-actions" style="margin-top: 1rem;">
                        <button class="btn-primary btn-small" onclick="sendConnectionRequest(${alumni.id})">
                            <i class="fas fa-paper-plane"></i> Send Request
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function switchRequestTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.requests-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) btn.classList.add('active');
    });

    // Update tab content
    document.querySelectorAll('.request-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Load tab-specific content
    if (tabName === 'received-requests' && userRole === 'alumni') {
        loadReceivedRequests();
    } else if (tabName === 'my-requests') {
        loadMyRequests();
    }
}

function loadMyRequests() {
    const container = document.getElementById('myRequestsList');
    if (!container) return;

    const myRequests = requestsData.filter(request => 
        request.from === currentUser.email || 
        (userRole === 'student' && request.from.includes('student'))
    );

    if (myRequests.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No requests sent yet</h3>
                <p>Connect with alumni to start building your network!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = myRequests.map(request => {
        const alumni = alumniData.find(a => a.email === request.to);
        return `
            <div class="request-card">
                <div class="request-header">
                    <div>
                        <h4>Request to ${alumni ? alumni.name : 'Alumni'}</h4>
                        <div class="request-type">${request.type}</div>
                    </div>
                    <div class="request-status ${request.status}">${request.status.toUpperCase()}</div>
                </div>
                <p style="margin: 1rem 0; color: var(--text-light);">${request.message}</p>
                <div style="font-size: 0.8rem; color: var(--text-light);">
                    Sent: ${formatDate(request.timestamp)}
                    ${request.cooldownUntil ? `<br>Cooldown until: ${formatDate(request.cooldownUntil)}` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function loadReceivedRequests() {
    const container = document.getElementById('receivedRequestsList');
    if (!container || userRole !== 'alumni') return;

    const receivedRequests = requestsData.filter(request => request.to === currentUser.email);

    if (receivedRequests.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No requests received</h3>
                <p>Students will be able to connect with you through the platform.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = receivedRequests.map(request => `
        <div class="request-card">
            <div class="request-header">
                <div>
                    <h4>Request from Student</h4>
                    <div class="request-type">${request.type}</div>
                </div>
                <div class="request-status ${request.status}">${request.status.toUpperCase()}</div>
            </div>
            <p style="margin: 1rem 0; color: var(--text-light);">${request.message}</p>
            <div style="font-size: 0.8rem; color: var(--text-light); margin-bottom: 1rem;">
                Received: ${formatDate(request.timestamp)}
            </div>
            ${request.status === 'pending' ? `
                <div class="request-actions">
                    <button class="btn-primary btn-small" onclick="respondToRequest(${request.id}, 'approved')">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn-secondary btn-small" onclick="respondToRequest(${request.id}, 'rejected')">
                        <i class="fas fa-times"></i> Decline
                    </button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function sendConnectionRequest(alumniId) {
    const alumni = alumniData.find(a => a.id === alumniId);
    if (!alumni) return;

    // Check for existing requests and cooldown
    const existingRequest = requestsData.find(req => 
        req.from === currentUser.email && 
        req.to === alumni.email &&
        req.cooldownUntil && 
        new Date(req.cooldownUntil) > new Date()
    );

    if (existingRequest) {
        const cooldownEnd = new Date(existingRequest.cooldownUntil);
        showNotification(`You're in cooldown period until ${cooldownEnd.toLocaleDateString()}. Please wait before sending another request.`, 'warning');
        return;
    }

    // Store alumni info and show modal
    window.selectedAlumni = alumni;
    document.getElementById('selectedAlumniInfo').innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
            <div class="alumni-avatar" style="width: 50px; height: 50px;">${alumni.avatar}</div>
            <div>
                <h4>${alumni.name}</h4>
                <p style="color: var(--text-light); margin: 0;">${alumni.position} at ${alumni.company}</p>
            </div>
        </div>
    `;
    
    showModal('sendRequestModal');
}

function respondToRequest(requestId, response) {
    const request = requestsData.find(r => r.id === requestId);
    if (!request) return;

    showLoading();

    setTimeout(() => {
        request.status = response;
        
        // If rejected, set cooldown period (3 months)
        if (response === 'rejected') {
            const cooldown = new Date();
            cooldown.setMonth(cooldown.getMonth() + 3);
            request.cooldownUntil = cooldown.toISOString();
        }

        loadReceivedRequests();
        hideLoading();
        showNotification(`Request ${response} successfully!`, response === 'approved' ? 'success' : 'info');
    }, 500);
}

// Events functionality
function initializeEvents() {
    const createEventBtn = document.getElementById('createEventBtn');
    if (createEventBtn) {
        createEventBtn.addEventListener('click', () => {
            showNotification('Event creation feature - would open create event modal');
        });
    }
}

function loadEvents() {
    const container = document.getElementById('eventFeedContainer');
    if (!container) return;

    container.innerHTML = eventsData.map(event => `
        <div class="event-card">
            <div class="event-header">
                <div class="event-date">
                    <i class="fas fa-calendar"></i> ${formatDate(event.date)}
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description}</div>
            <div class="event-stats">
                <div class="event-attendees">
                    <i class="fas fa-users"></i> ${event.attendees} attending • ${event.interested} interested
                </div>
                <button class="interest-btn ${interestedEvents.includes(event.id) ? 'interested' : ''}" 
                        onclick="toggleEventInterest(${event.id})">
                    <i class="fas fa-heart"></i>
                    ${interestedEvents.includes(event.id) ? 'Interested' : 'Show Interest'}
                </button>
            </div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; display: flex; justify-content: between; align-items: center;">
                <small style="color: var(--text-light);">Organized by ${event.organizer}</small>
                ${userRole === 'admin' ? `
                    <button class="btn-secondary btn-small" onclick="editEvent(${event.id})" style="margin-left: auto;">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function toggleEventInterest(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    if (interestedEvents.includes(eventId)) {
        interestedEvents = interestedEvents.filter(id => id !== eventId);
        event.interested--;
        showNotification(`Removed interest from ${event.title}`);
    } else {
        interestedEvents.push(eventId);
        event.interested++;
        showNotification(`Marked interested in ${event.title}!`, 'success');
    }

    // Refresh the events display
    if (currentPage === 'events') {
        loadEvents();
    }
    if (currentPage === 'dashboard') {
        loadUpcomingEvents();
    }
}

// Profile functionality
function initializeProfile() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', openEditProfile);
    }
}

function loadProfile() {
    updateProfileDisplay();
}

function updateProfileDisplay() {
    // Update profile card
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRoleBadge').textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1);

    // Update profile details based on role
    const profileDetails = document.getElementById('profileDetails');
    if (!profileDetails) return;

    if (userRole === 'alumni') {
        const alumniData = sampleAlumniData.find(a => a.email === currentUser.email);
        if (alumniData) {
            profileDetails.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                    <div>
                        <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Professional Information</h3>
                        <div class="detail-item" style="margin-bottom: 1rem;">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Class of ${alumniData.graduationYear}</span>
                        </div>
                        <div class="detail-item" style="margin-bottom: 1rem;">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${alumniData.region}</span>
                        </div>
                        <div class="detail-item" style="margin-bottom: 1rem;">
                            <i class="fas fa-briefcase"></i>
                            <span>${alumniData.specialization}</span>
                        </div>
                        <div class="detail-item" style="margin-bottom: 1rem;">
                            <i class="fas fa-building"></i>
                            <span>${alumniData.company}</span>
                        </div>
                        <div class="detail-item" style="margin-bottom: 1rem;">
                            <i class="fas fa-user-tie"></i>
                            <span>${alumniData.position}</span>
                        </div>
                    </div>
                    <div>
                        <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Skills & Expertise</h3>
                        <div class="alumni-tags" style="margin-bottom: 2rem;">
                            ${alumniData.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                        </div>
                        <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Bio</h3>
                        <p style="color: var(--text-light); line-height: 1.6;">${alumniData.bio}</p>
                    </div>
                </div>
            `;
        }
    } else {
        profileDetails.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-user-circle" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>Complete Your Profile</h3>
                <p>Add more information to help alumni and peers connect with you.</p>
                <button class="btn-primary" onclick="openEditProfile()" style="margin-top: 1rem;">
                    <i class="fas fa-edit"></i> Edit Profile
                </button>
            </div>
        `;
    }
}

function openEditProfile() {
    // Pre-fill form with current user data if available
    const form = document.getElementById('editProfileForm');
    if (userRole === 'alumni') {
        const alumniData = sampleAlumniData.find(a => a.email === currentUser.email);
        if (alumniData) {
            form.fullName.value = alumniData.name;
            form.email.value = alumniData.email;
            form.graduationYear.value = alumniData.graduationYear;
            form.region.value = alumniData.region;
            form.specialization.value = alumniData.specialization;
            form.field.value = alumniData.field;
            form.company.value = alumniData.company;
            form.position.value = alumniData.position;
            form.skills.value = alumniData.skills.join(', ');
            form.bio.value = alumniData.bio;
        }
    } else {
        form.fullName.value = currentUser.name;
        form.email.value = currentUser.email;
        
        // Hide alumni-specific fields for students
        document.getElementById('graduationYearGroup').style.display = userRole === 'student' ? 'none' : 'block';
        document.getElementById('specializationGroup').style.display = userRole === 'student' ? 'none' : 'block';
        document.getElementById('fieldGroup').style.display = userRole === 'student' ? 'none' : 'block';
        document.getElementById('companyGroup').style.display = userRole === 'student' ? 'none' : 'block';
        document.getElementById('positionGroup').style.display = userRole === 'student' ? 'none' : 'block';
    }
    
    showModal('editProfileModal');
}

// Modal functionality
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');

    // Close modal buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeModal(e.target.closest('.modal').id);
        });
    });

    // Close modal on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Form submissions
    document.getElementById('sendRequestForm').addEventListener('submit', handleSendRequest);
    document.getElementById('editProfileForm').addEventListener('submit', handleUpdateProfile);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

function handleSendRequest(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const requestType = formData.get('requestType');
    const message = formData.get('message');
    
    if (!window.selectedAlumni) return;

    showLoading();

    setTimeout(() => {
        // Create new request
        const newRequest = {
            id: requestsData.length + 1,
            from: currentUser.email,
            to: window.selectedAlumni.email,
            type: requestType,
            message: message,
            status: 'pending',
            timestamp: new Date().toISOString(),
            cooldownUntil: null
        };

        requestsData.push(newRequest);
        
        closeModal('sendRequestModal');
        e.target.reset();
        hideLoading();
        
        showNotification(`Connection request sent to ${window.selectedAlumni.name}!`, 'success');
        
        // Refresh requests if on reach-out page
        if (currentPage === 'reach-out') {
            loadMyRequests();
        }
    }, 1000);
}

function handleUpdateProfile(e) {
    e.preventDefault();
    showLoading();

    setTimeout(() => {
        hideLoading();
        closeModal('editProfileModal');
        showNotification('Profile updated successfully!', 'success');
        
        if (currentPage === 'profile') {
            updateProfileDisplay();
        }
    }, 1000);
}

// Utility functions
function showLoading() {
    document.getElementById('loadingSpinner').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.remove('show');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#43e97b' : type === 'warning' ? '#fee140' : '#667eea'};
        color: ${type === 'warning' ? '#333' : 'white'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function viewAlumniProfile(id) {
    const alumni = alumniData.find(a => a.id === id);
    showNotification(`Viewing detailed profile for ${alumni.name}`);
    // In real implementation, this would open a detailed profile modal
}

// Quick action functions (called from HTML)
function findMentors() { showPage('reach-out'); }
function browseEvents() { showPage('events'); }
function exploreAlumni() { showPage('alumni-directory'); }
function viewRequests() { showPage('reach-out'); }
function createEvent() { 
    showNotification('Event creation feature - would open create event modal', 'info');
}
function mentorStudents() { 
    showPage('reach-out');
    setTimeout(() => switchRequestTab('received-requests'), 100);
}

// Add notification styles to head
const style = document.createElement('style');
style.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--text-light);
    }
    
    .detail-item i {
        width: 20px;
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);