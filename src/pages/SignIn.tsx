import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    dispatch(signInStart());
    try {
      const response = await axios.post('https://solveitsl.site/api/userService/auth/signin', { email, password });
      //const response = await axios.post('http://localhost:3000/api/userService/auth/signin', { email, password });
      dispatch(signInSuccess(response.data));
      navigate('/'); // Navigate to home page on successful sign-in
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred');
        dispatch(signInFailure(error.response.data.message || 'An error occurred'));
      } else {
        setError('An error occurred');
        dispatch(signInFailure('An error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm p-4 mx-auto bg-white shadow-md mt-36 ring-2 ring-teal-400 rounded-2xl hover:shadow-2xl">
      <div className="flex justify-center"><h2 className="mb-4 text-2xl">Sign In</h2></div>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 rounded-2xl"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 rounded-2xl"
      />
      <div className="flex justify-center">
      <button onClick={handleSignIn} className="w-32 p-2 font-medium text-white bg-teal-800 hover:bg-teal-500 rounded-2xl" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      </div>
    </div>
  );
}

export default SignIn;