import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const currentUser = useSelector((state: any) => state.user.currentUser);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-extrabold leading-tight text-yellow-300 sm:text-5xl md:text-6xl drop-shadow-lg">
        Track, Manage, and Solve Issues with{" "}
        <span className="text-purple-400 animate-pulse">SolveIt</span>
      </h1>
      <p className="max-w-3xl mt-6 mb-10 text-lg text-gray-300 sm:text-xl md:text-2xl">
        A modern issue tracking system designed for seamless collaboration,
        efficiency, and rapid resolution.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {!currentUser ? (
          <>
            <Link
              to="/sign-in"
              className="px-8 py-3 text-lg font-medium text-white transition-transform duration-300 bg-teal-500 rounded-full shadow-lg hover:bg-teal-600 hover:scale-105"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="px-8 py-3 text-lg font-medium text-white transition-transform duration-300 bg-purple-500 rounded-full shadow-lg hover:bg-purple-600 hover:scale-105"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            to="/create-ticket"
            className="px-8 py-3 text-lg font-medium text-white transition-transform duration-300 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-600 hover:scale-105"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;