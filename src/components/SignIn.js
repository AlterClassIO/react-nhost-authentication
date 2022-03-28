import { Link } from 'react-router-dom';
import Input from './Input';

const SignIn = () => {
  return (
    <div className="sm:rounded-xl sm:shadow-md sm:border border-opacity-50 bg-white px-4 sm:px-8 py-12 w-full max-w-md flex flex-col items-center">
      <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="logo" width={180} />

      <div className="mt-12 w-full flex flex-col items-center space-y-6">
        <Input type="email" label="Email address" />
        <Input type="password" label="Create password" />
      </div>

      <button className="mt-6 w-full font-medium rounded-md p-3 text-white  bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-transparent disabled:hover:border-bg-600 transition-colors">
        Sign in
      </button>

      <p className="mt-8 text-gray-500">
        No account yet?{' '}
        <Link
          to="/sign-up"
          className="text-blue-600 hover:text-blue-500 hover:underline hover:underline-offset-1 font-medium transition"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
