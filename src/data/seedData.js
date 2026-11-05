
// ========================================
// 1. ADMIN USERS
// ========================================

export const admins = [
  {
    id: "admin1",
    name: "Professor A",
    role: "admin"
  },
  {
    id: "admin2",
    name: "Professor B",
    role: "admin"
  }
];

// ========================================
// 2. STUDENT USERS
// ========================================

export const students = [
  {
    id: "student1",
    name: "Balaji",
    role: "student"
  },
  {
    id: "student2",
    name: "Ravi",
    role: "student"
  },
  {
    id: "student3",
    name: "Suresh",
    role: "student"
  },
  {
    id: "student4",
    name: "Priya",
    role: "student"
  },
  {
    id: "student5",
    name: "Anjali",
    role: "student"
  }
];

// ========================================
// 3. ALL USERS
// ========================================

export const users = [...admins, ...students];

// ========================================
// 4. ASSIGNMENTS
// ========================================

export const assignments = [

  // Assignment 1
  {
    id: "assignment1",
    title: "HTML Fundamentals",
    description: "Complete the HTML fundamentals exercises.",
    dueDate: "2026-11-10",

    driveLink:
      "https://drive.google.com/drive/folders/1HTMLFundamentalsSample",

    createdBy: "admin1",

    assignedStudentIds: [
      "student1",
      "student2",
      "student3",
      "student4",
      "student5"
    ],

    submissions: {
      student1: "submitted",
      student2: "submitted",
      student3: "not_submitted",
      student4: "submitted",
      student5: "not_submitted"
    }
  },

  // Assignment 2
  {
    id: "assignment2",
    title: "CSS Flexbox",
    description: "Create a responsive webpage using CSS Flexbox.",
    dueDate: "2026-11-12",

    driveLink:
      "https://drive.google.com/drive/folders/1CSSFlexboxSample",

    createdBy: "admin1",

    assignedStudentIds: [
      "student1",
      "student2",
      "student3"
    ],

    submissions: {
      student1: "submitted",
      student2: "not_submitted",
      student3: "submitted"
    }
  },

  // Assignment 3
  {
    id: "assignment3",
    title: "JavaScript Basics",
    description: "Complete the JavaScript practice exercises.",
    dueDate: "2026-11-01",

    driveLink:
      "https://drive.google.com/drive/folders/1JavaScriptBasicsSample",

    createdBy: "admin2",

    assignedStudentIds: [
      "student1",
      "student4",
      "student5"
    ],

    submissions: {
      student1: "not_submitted",
      student4: "submitted",
      student5: "not_submitted"
    }
  }

];
