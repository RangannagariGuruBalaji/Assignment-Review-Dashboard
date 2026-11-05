import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import Login from './components/Login';
import AssignmentCard from './components/AssignmentCard';
import AssignmentForm from './components/AssignmentForm';
import AdminProgress from './components/AdminProgress';

import { assignments } from './data/seedData';

function App() {
  // Current logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Assignment data with localStorage
  const [assignmentData, setAssignmentData] = useState(() => {
    try {
      const saved = localStorage.getItem('joineazy_assignments');
      return saved ? JSON.parse(saved) : assignments;
    } catch {
      return assignments;
    }
  });

  // Form visibility
  const [showForm, setShowForm] = useState(false);

  // Assignment currently being edited
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Search, filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('earliest');

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('joineazy_theme') === 'dark';
  });

  // Active sidebar page
  const [activePage, setActivePage] = useState('dashboard');

  // Save assignment data
  useEffect(() => {
    localStorage.setItem(
      'joineazy_assignments',
      JSON.stringify(assignmentData)
    );
  }, [assignmentData]);

  // Save selected theme
  useEffect(() => {
    localStorage.setItem(
      'joineazy_theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  // Login
  function handleLogin(user) {
    setCurrentUser(user);
    setActivePage('dashboard');
  }

  // Logout
  function handleLogout() {
    setCurrentUser(null);
    setShowForm(false);
    setEditingAssignment(null);
    setSearchTerm('');
    setStatusFilter('all');
    setSortOrder('earliest');
    setActivePage('dashboard');
  }

  // Sidebar navigation
  function handleNavigation(page) {
    setActivePage(page);

    // Clear search and filters when changing pages
    setSearchTerm('');
    setStatusFilter('all');
    setSortOrder('earliest');

    // Close assignment form when changing pages
    setShowForm(false);
    setEditingAssignment(null);
  }

  // Student submission
  function handleSubmission(assignmentId) {
    setAssignmentData(previous =>
      previous.map(assignment => {
        if (assignment.id === assignmentId) {
          return {
            ...assignment,
            submissions: {
              ...assignment.submissions,
              [currentUser.id]: 'submitted'
            }
          };
        }

        return assignment;
      })
    );
  }

  // Create or update assignment
  function handleSaveAssignment(formData) {
    if (editingAssignment) {
      setAssignmentData(previous =>
        previous.map(assignment => {
          if (assignment.id === editingAssignment.id) {
            const updatedSubmissions = {};

            formData.assignedStudentIds.forEach(studentId => {
              updatedSubmissions[studentId] =
                assignment.submissions[studentId] || 'not_submitted';
            });

            return {
              ...assignment,
              ...formData,
              submissions: updatedSubmissions
            };
          }

          return assignment;
        })
      );
    } else {
      const newAssignment = {
        id: `assignment-${Date.now()}`,
        ...formData,
        createdBy: currentUser.id,
        submissions: Object.fromEntries(
          formData.assignedStudentIds.map(studentId => [
            studentId,
            'not_submitted'
          ])
        )
      };

      setAssignmentData(previous => [
        ...previous,
        newAssignment
      ]);
    }

    setShowForm(false);
    setEditingAssignment(null);
    setActivePage('assignments');
  }

  // Open edit form
  function handleEditAssignment(assignment) {
    setEditingAssignment(assignment);
    setShowForm(true);
    setActivePage('assignments');
  }

  // Delete assignment
  function handleDeleteAssignment(assignmentId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this assignment?'
    );

    if (!confirmed) return;

    setAssignmentData(previous =>
      previous.filter(
        assignment => assignment.id !== assignmentId
      )
    );
  }

  // If not logged in
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const isAdmin = currentUser.role === 'admin';

  // Get current user's assignments
  const myAssignments = assignmentData.filter(assignment => {
    if (isAdmin) {
      return assignment.createdBy === currentUser.id;
    }

    return assignment.assignedStudentIds.includes(currentUser.id);
  });

  // Calculate today's date safely
  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  // Student statistics
  const submittedCount = myAssignments.filter(
    assignment =>
      assignment.submissions[currentUser.id] === 'submitted'
  ).length;

  const pendingCount = myAssignments.filter(
    assignment =>
      assignment.submissions[currentUser.id] !== 'submitted' &&
      assignment.dueDate >= todayString
  ).length;

  const overdueCount = myAssignments.filter(
    assignment =>
      assignment.submissions[currentUser.id] !== 'submitted' &&
      assignment.dueDate < todayString
  ).length;

  // Search, filter and sort assignments
  const filteredAssignments = myAssignments

    // Search by title
    .filter(assignment =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Sidebar page filtering
    .filter(assignment => {
      if (activePage === 'submitted') {
        return assignment.submissions[currentUser.id] === 'submitted';
      }

      if (activePage === 'pending') {
        return (
          assignment.submissions[currentUser.id] !== 'submitted' &&
          assignment.dueDate >= todayString
        );
      }

      if (activePage === 'overdue') {
        return (
          assignment.submissions[currentUser.id] !== 'submitted' &&
          assignment.dueDate < todayString
        );
      }

      return true;
    })

    // Filter by status dropdown
    .filter(assignment => {
      if (statusFilter === 'all') {
        return true;
      }

      if (isAdmin) {
        const statuses = Object.values(assignment.submissions);

        if (statusFilter === 'completed') {
          return statuses.length > 0 &&
            statuses.every(status => status === 'submitted');
        }

        if (statusFilter === 'has_pending') {
          return statuses.some(status => status !== 'submitted');
        }

        return true;
      }

      const status = assignment.submissions[currentUser.id];

      if (statusFilter === 'submitted') {
        return status === 'submitted';
      }

      if (statusFilter === 'pending') {
        return status !== 'submitted' &&
          assignment.dueDate >= todayString;
      }

      if (statusFilter === 'overdue') {
        return status !== 'submitted' &&
          assignment.dueDate < todayString;
      }

      return true;
    })

    // Sort by due date
    .sort((a, b) => {
      if (sortOrder === 'earliest') {
        return a.dueDate.localeCompare(b.dueDate);
      }

      return b.dueDate.localeCompare(a.dueDate);
    });

  // Dashboard statistics
  const statistics = isAdmin
    ? [
        {
          title: 'Created Assignments',
          value: myAssignments.length,
          description: 'Assignments you created',
          color: 'text-blue-600'
        },
        {
          title: 'Assigned Students',
          value: new Set(
            myAssignments.flatMap(a => a.assignedStudentIds)
          ).size,
          description: 'Unique students',
          color: 'text-green-600'
        },
        {
          title: 'Total Submissions',
          value: myAssignments.reduce(
            (total, assignment) =>
              total + Object.values(assignment.submissions)
                .filter(status => status === 'submitted').length,
            0
          ),
          description: 'Confirmed submissions',
          color: 'text-orange-500'
        },
        {
          title: 'Total Assignments',
          value: myAssignments.length,
          description: 'Your assignments',
          color: 'text-red-600'
        }
      ]
    : [
        {
          title: 'Total Assignments',
          value: myAssignments.length,
          description: 'Assigned to you',
          color: 'text-blue-600'
        },
        {
          title: 'Submitted',
          value: submittedCount,
          description: 'Assignments completed',
          color: 'text-green-600'
        },
        {
          title: 'Pending',
          value: pendingCount,
          description: 'Not yet due',
          color: 'text-orange-500'
        },
        {
          title: 'Overdue',
          value: overdueCount,
          description: 'Past due assignments',
          color: 'text-red-600'
        }
      ];

  // Page headings
  const pageTitles = {
    dashboard: isAdmin ? 'Admin Dashboard' : 'Student Dashboard',
    assignments: 'My Assignments',
    submitted: 'Submitted Assignments',
    pending: 'Pending Assignments',
    overdue: 'Overdue Assignments',
    progress: 'Student Progress'
  };

  // Check whether the current page displays assignments
  const showAssignmentList = isAdmin
    ? activePage === 'assignments'
    : ['assignments', 'submitted', 'pending', 'overdue'].includes(activePage);

  // Show dashboard overview
  const showDashboard = activePage === 'dashboard';

  // Show admin progress
  const showAdminProgress = isAdmin && activePage === 'progress';

  return (
    <div className={`min-h-screen bg-gray-100 ${isDarkMode ? 'dark-mode' : ''}`}>

      <Navbar
        name={currentUser.name}
        role={currentUser.role}
        onLogout={handleLogout}
      />

      <div className="flex flex-col md:flex-row">

        <Sidebar
          role={currentUser.role}
          activePage={activePage}
          onNavigate={handleNavigation}
          submittedCount={submittedCount}
          pendingCount={pendingCount}
          overdueCount={overdueCount}
        />

        <main className="flex-1 min-w-0 p-6">

          {/* Page heading */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {pageTitles[activePage]}
              </h2>

              <p className="mt-2 text-gray-600">
                Welcome, {currentUser.name}!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* Admin create button */}
              {isAdmin && activePage === 'assignments' && !showForm && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAssignment(null);
                    setShowForm(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
                >
                  + Create Assignment
                </button>
              )}

              {/* Dark mode toggle */}
              <button
                type="button"
                onClick={() => setIsDarkMode(previous => !previous)}
                className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-medium transition"
              >
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>

            </div>

          </div>

          {/* Assignment form */}
          {isAdmin && showForm && activePage === 'assignments' && (
            <div className="mb-8">

              <AssignmentForm
                initialData={editingAssignment}
                onSave={handleSaveAssignment}
                onCancel={() => {
                  setShowForm(false);
                  setEditingAssignment(null);
                }}
              />

            </div>
          )}

          {/* Dashboard overview */}
          {showDashboard && (
            <>
              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {statistics.map(stat => (
                  <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    description={stat.description}
                    color={stat.color}
                  />
                ))}

              </div>

              {/* Student overall progress */}
              {!isAdmin && (
                <div className="bg-white border border-gray-200 rounded-xl p-5 mt-8">

                  <h2 className="font-semibold text-gray-800">
                    My Overall Progress
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    {submittedCount} of {myAssignments.length} assignments submitted
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          myAssignments.length
                            ? (submittedCount / myAssignments.length) * 100
                            : 0
                        }%`
                      }}
                    ></div>
                  </div>

                </div>
              )}

              {/* Admin student progress preview */}
              {isAdmin && (
                <section className="mt-8">

                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Student Progress Overview
                  </h2>

                  <AdminProgress assignments={myAssignments} />

                  <button
                    type="button"
                    onClick={() => handleNavigation('progress')}
                    className="mt-4 text-blue-600 font-medium hover:underline"
                  >
                    View Full Student Progress →
                  </button>

                </section>
              )}

              {/* Recent assignments preview */}
              <section className="mt-8">

                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold text-gray-800">
                    {isAdmin ? 'Your Assignments' : 'Recent Assignments'}
                  </h2>

                  <button
                    type="button"
                    onClick={() => handleNavigation('assignments')}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {myAssignments.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl text-center text-gray-500">
                    No assignments available.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {myAssignments.slice(0, 2).map(assignment => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        isAdmin={isAdmin}
                        status={
                          isAdmin
                            ? null
                            : assignment.submissions[currentUser.id]
                        }
                        onSubmit={handleSubmission}
                        onEdit={handleEditAssignment}
                        onDelete={handleDeleteAssignment}
                      />
                    ))}

                  </div>
                )}

              </section>
            </>
          )}

          {/* Admin full student progress page */}
          {showAdminProgress && (
            <section>
              <p className="text-gray-600 mb-5">
                Track assignment completion and submission status for your students.
              </p>

              <AdminProgress assignments={myAssignments} />
            </section>
          )}

          {/* Assignment pages */}
          {showAssignmentList && (
            <section className="mt-2">

              {/* Search, Filter and Sort */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 mb-5">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Assignment
                    </label>

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={event => setSearchTerm(event.target.value)}
                      placeholder="Search by title..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Status
                    </label>

                    <select
                      value={statusFilter}
                      onChange={event => setStatusFilter(event.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    >
                      <option value="all">All Assignments</option>

                      {isAdmin ? (
                        <>
                          <option value="completed">Fully Completed</option>
                          <option value="has_pending">Has Pending Students</option>
                        </>
                      ) : (
                        <>
                          <option value="submitted">Submitted</option>
                          <option value="pending">Pending</option>
                          <option value="overdue">Overdue</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort by Due Date
                    </label>

                    <select
                      value={sortOrder}
                      onChange={event => setSortOrder(event.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    >
                      <option value="earliest">Earliest First</option>
                      <option value="latest">Latest First</option>
                    </select>
                  </div>

                </div>

                {/* Reset filters */}
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setSortOrder('earliest');
                  }}
                  className="text-sm text-blue-600 font-medium mt-4 hover:underline"
                >
                  Reset Search & Filters
                </button>

              </div>

              {/* Assignment results */}
              {filteredAssignments.length === 0 ? (

                <div className="bg-white p-8 rounded-xl text-center text-gray-500">
                  {activePage === 'submitted' && 'You have not submitted any assignments yet.'}
                  {activePage === 'pending' && 'Great! You have no pending assignments.'}
                  {activePage === 'overdue' && 'You have no overdue assignments.'}
                  {activePage === 'assignments' && 'No matching assignments found.'}
                </div>

              ) : (

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                  {filteredAssignments.map(assignment => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      isAdmin={isAdmin}
                      status={
                        isAdmin
                          ? null
                          : assignment.submissions[currentUser.id]
                      }
                      onSubmit={handleSubmission}
                      onEdit={handleEditAssignment}
                      onDelete={handleDeleteAssignment}
                    />
                  ))}

                </div>

              )}

            </section>
          )}

        </main>

      </div>

    </div>
  );
}

export default App;