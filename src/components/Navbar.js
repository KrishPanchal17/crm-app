import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-900/90 backdrop-blur-sm p-4 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-400">CRM Elite</h1>
        <ul className="flex space-x-6">
          <li><a href="/dashboard" className="text-gray-200 hover:text-yellow-400 transition">Dashboard</a></li>
          <li><a href="/product" className="text-gray-200 hover:text-yellow-400 transition">Products</a></li>
          <li>
            <button
              onClick={handleLogout}
              className="text-gray-200 hover:text-red-400 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;