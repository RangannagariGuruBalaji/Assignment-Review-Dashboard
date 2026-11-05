
import { useState } from 'react';
import { users } from '../data/seedData';

function Login({ onLogin }) {

  // Store the selected user ID
  const [selectedUserId, setSelectedUserId] = useState('');

  // Handle login button click
  function handleLogin() {

    // Find the selected user
    const selectedUser = users.find(
      (user) => user.id === selectedUserId
    );

    // Check whether a user was selected
    if (!selectedUser) {
      alert('Please select a user first.');
      return;
    }

    // Send selected user to App.jsx
    onLogin(selectedUser);

  }

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Application Name */}
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          Joineazy
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Assignment & Review Dashboard
        </p>

        {/* Login Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mt-8">
          Welcome Back!
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Select your account to continue.
        </p>

        {/* User Selection */}
        <div className="mt-6">

          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select User
          </label>

          <select
            id="user"
            value={selectedUserId}
            onChange={(event) =>
              setSelectedUserId(event.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Choose your account
            </option>

            {users.map((user) => (

              <option key={user.id} value={user.id}>
                {user.name} - {user.role}
              </option>

            ))}

          </select>

        </div>

        {/* Login Button */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6 transition"
        >
          Login
        </button>

        {/* Mock Login Information */}
        <p className="text-xs text-gray-400 text-center mt-5">
          Demo login · No password required
        </p>

      </div>

    </div>

  );

}

export default Login;
