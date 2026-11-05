function Sidebar({
  role,
  activePage,
  onNavigate,
  submittedCount = 0,
  pendingCount = 0,
  overdueCount = 0
}) {
  const isAdmin = role === 'admin';

  const studentMenu = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠'
    },
    {
      id: 'assignments',
      label: 'My Assignments',
      icon: '📚'
    },
    {
      id: 'submitted',
      label: 'Submitted',
      icon: '✅',
      count: submittedCount
    },
    {
      id: 'pending',
      label: 'Pending',
      icon: '⏳',
      count: pendingCount
    },
    {
      id: 'overdue',
      label: 'Overdue',
      icon: '⚠️',
      count: overdueCount
    }
  ];

  const adminMenu = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠'
    },
    {
      id: 'assignments',
      label: 'My Assignments',
      icon: '📚'
    },
    {
      id: 'progress',
      label: 'Student Progress',
      icon: '📊'
    }
  ];

  const menuItems = isAdmin ? adminMenu : studentMenu;

  return (
    <aside className="w-full md:w-64 md:min-h-[calc(100vh-80px)] bg-white border-r border-gray-200 p-4">

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
        {isAdmin ? 'Admin Menu' : 'Student Menu'}
      </p>

      <nav className="space-y-2">

        {menuItems.map(item => {
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >

              <span className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>

              {item.count !== undefined && (
                <span
                  className={`text-xs rounded-full px-2 py-1 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.count}
                </span>
              )}

            </button>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;