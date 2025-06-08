import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Login: Attempting login with username=', username);
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 30,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Login: API response=', response.data);
      const { id, username: apiUsername, email, accessToken } = response.data;
      if (!apiUsername || !accessToken) {
        throw new Error('Invalid response structure');
      }
      const userData = {
        user: { id, username: apiUsername, email },
        token: accessToken,
      };
      dispatch(setCredentials(userData));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login: Error=', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Login failed. Please check credentials or try again.');
    }
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
        {error && <p className="text-red-400 bg-red-900/50 p-2 rounded mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              required
              placeholder="Enter username"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-800/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              required
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-yellow-400 transition"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 p-3 rounded-lg font-semibold hover:bg-yellow-300 transition-transform duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;