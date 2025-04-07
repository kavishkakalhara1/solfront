import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSignOut = () => {
    dispatch(signoutSuccess());
    navigate('/sign-in');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="z-20 p-4 bg-white shadow-md">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-semibold text-teal-500">Solve3</div>
          <div className="text-3xl font-bold text-gray-700">IT</div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {!currentUser ? (
            <>
              <Link
                to="/sign-in"
                className="text-lg font-medium text-gray-700 transition-colors hover:text-teal-500"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 text-lg font-medium text-white transition-all bg-teal-500 rounded-full shadow-md hover:bg-teal-600"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Profile Picture or Icon */}
              {currentUser.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              ) : (
                <FaUserCircle
                  size={40}
                  className="text-gray-700 cursor-pointer hover:text-teal-500"
                  onClick={toggleDropdown}
                />
              )}

              {/* Dropdown Menu */}
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-60">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold text-gray-800">{currentUser.fullname}</p>
                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;