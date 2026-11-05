
function Navbar({ name, role, onLogout }) {

  return (

    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">

      <div className="flex items-center justify-between">

        {/* Application Name */}
        <h1 className="text-2xl font-bold text-blue-600">
          Joineazy
        </h1>

        {/* User Information and Logout */}
        <div className="flex items-center gap-4">

          <div className="text-right">

            <p className="text-sm font-semibold text-gray-800">
              Welcome, {name}
            </p>

            <p className="text-xs text-gray-500 capitalize">
              {role}
            </p>

          </div>

          {/* Profile Circle */}
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {name.charAt(0).toUpperCase()}
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;
