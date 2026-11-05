
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

export const users = [...admins, ...students];

export const assignments = [
  {
    id: "assignment1",
    title: "HTML Fundamentals",
    description: "Complete the HTML fundamentals exercises.",
    dueDate: "2026-11-10",
    driveLink: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content",
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
  {
    id: "assignment2",
    title: "CSS Flexbox",
    description: "Create a responsive webpage using CSS Flexbox.",
    dueDate: "2026-11-12",
    driveLink: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox",
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
  {
    id: "assignment3",
    title: "JavaScript Basics",
    description: "Complete the JavaScript practice exercises.",
    dueDate: "2026-11-01",
    driveLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
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
