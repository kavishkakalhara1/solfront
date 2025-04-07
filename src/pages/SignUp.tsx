import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!firstname || !lastname || !fullname || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://13.61.21.9/api/userService/auth/signup', {
        firstname,
        lastname,
        fullname,
        email,
        password,
      });
      toast.success('Signup successful');
      navigate('/sign-in'); // Navigate to sign-in page on successful sign-up
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error('Signup failed1: ' + error.response.data.message);
      } else {
        toast.error('Signup failed: An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm p-4 mx-auto bg-white shadow-md mt-14 ring-2 ring-teal-400 rounded-2xl hover:shadow-2xl">
      <div className="flex justify-center"><h2 className="mb-4 text-2xl ">Sign Up</h2></div>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        className="w-full p-2 mb-4 border rounded-2xl"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="w-full p-2 mb-4 border rounded-2xl"
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="w-full p-2 mb-4 border rounded-2xl"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded-2xl"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded-2xl"
      />
      <div className="flex justify-center">
      <button
        onClick={handleSignUp}
        className="w-32 p-2 font-medium text-white bg-teal-800 hover:bg-teal-500 rounded-2xl"
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </div>
    </div>
  );
}

export default SignUp;