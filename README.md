 Assignment & Review Dashboard

A responsive assignment management dashboard built using React.js and Tailwind CSS. The application provides separate dashboards for students and administrators to manage assignments, track submissions, and monitor student progress.

## 🚀 Live Demo

**Live Application:** https://assignment-review-dashboard-five.vercel.app/

**GitHub Repository:** https://github.com/RangannagariGuruBalaji/Assignment-Review-Dashboard

## 📌 Project Overview

Joineazy is an assignment management platform designed for students and professors.

Administrators can create, edit, and delete assignments, assign them to all students or selected students, and monitor submission progress.

Students can view their assigned assignments, access learning materials, confirm submissions, and track their overall completion progress.

The application uses mock authentication and browser localStorage for data persistence. No backend is required.

## ✨ Features

### Admin Features

- Mock login for administrator accounts.
- Create, edit, and delete assignments.
- Assign assignments to all students or selected students.
- Add assignment descriptions, due dates, and learning resource links.
- View individual student submission statuses.
- Monitor class completion percentages through progress bars.
- View assignments created by the logged-in administrator.

### Student Features

- View assignments assigned to the logged-in student.
- Access assignment learning materials through external links.
- View assignment due dates and statuses.
- Confirm assignment submission through a two-step confirmation process.
- Track overall assignment completion progress.
- Filter assignments by submitted, pending, and overdue status.

### Additional Features

- Responsive dashboard layout.
- Search assignments by title.
- Filter and sort assignments by due date and status.
- Overdue assignment indicators.
- Light and dark mode.
- Browser localStorage persistence.
- Role-based dashboard navigation.

## 🛠️ Technologies Used

- React.js
- JavaScript
- Tailwind CSS
- HTML5
- CSS3
- Vite
- Git and GitHub
- Vercel
- Browser localStorage

## 👥 Demo Login Accounts

The application uses mock login without passwords.

### Administrators

| Name        | Role  |
| ----------- | ----- |
| Professor A | Admin |
| Professor B | Admin |

### Students

| Name   | Role    |
| ------ | ------- |
| Balaji | Student |
| Ravi   | Student |
| Suresh | Student |
| Priya  | Student |
| Anjali | Student |

Select an account from the login dropdown to access its dashboard.

## 📂 Project Structure

```text
assignment-dashboard/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── Login.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── AssignmentForm.jsx
│   │   └── AdminProgress.jsx
│   │
│   ├── data/
│   │   └── seedData.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/RangannagariGuruBalaji/Assignment-Review-Dashboard.git
```

### 2. Navigate to the project folder

```bash
cd Assignment-Review-Dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

## 🏗️ Architecture and Design Decisions

### Component-Based Architecture

The application is divided into reusable React components to make the code organized, maintainable, and easier to extend.

### State Management

React `useState` manages login state, assignment data, submission statuses, search, filters, sorting, and theme preferences.

React `useEffect` synchronizes assignment and theme data with browser localStorage.

### Role-Based Access

The logged-in user's role determines which dashboard, assignments, and navigation options are displayed.

### Data Persistence

Browser localStorage stores assignment information and theme preferences so that changes remain available after refreshing the browser.

### Responsive Design

Tailwind CSS utility classes are used to create a responsive interface for desktop and mobile screens.

## 💾 Data Storage

This project uses browser localStorage instead of a backend database.

- Assignment data is stored in `joineazy_assignments`.
- Theme preference is stored in `joineazy_theme`.

The application starts with sample data defined in `src/data/seedData.js`.

## 🔮 Future Improvements

- Backend API integration.
- Database integration.
- Secure authentication and authorization.
- Real assignment file uploads.
- Email and deadline notifications.
- Advanced reporting and analytics.

## 👨‍💻 Developer

**R. Guru Balaji**

B.Tech – Computer Science and Engineering

**GitHub:** https://github.com/RangannagariGuruBalaji

---

## 📌 Project Links

- **Live Demo:** https://assignment-review-dashboard-five.vercel.app/
- **Source Code:** https://github.com/RangannagariGuruBalaji/Assignment-Review-Dashboard
