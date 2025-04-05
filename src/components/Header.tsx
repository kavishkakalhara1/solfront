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
    <header className="z-10 p-4 text-black bg-white shadow-md">
      <nav className="flex items-center justify-between">
        <div className='flex justify-items-start'>
        <div className="text-3xl font-semibold text-teal-500">Solve3</div>
        <div className="text-3xl font-bold text-gray-700">IT</div>
        </div>
        <div className="flex items-center space-x-4">
          {!currentUser && <Link to="/sign-in" className="text-xl font-medium hover:text-teal-500">Sign In</Link>}
          {!currentUser && <Link to="/sign-up" className="text-xl font-medium hover:text-teal-500">Sign Up</Link>}
          {currentUser && (
            <div className="relative">
              {currentUser.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              ) : (
                <FaUserCircle size={40} className="cursor-pointer" onClick={toggleDropdown} />
              )}
              {dropdownVisible && (
                <div className="absolute right-0 w-48 mt-2 text-black bg-white rounded shadow-lg">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">{currentUser.fullname}</p>
                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                  </div>
                  
                  <button onClick={handleSignOut} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
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