import { useState } from 'react';
import { useSignInEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import Input from './Input';
import Spinner from './Spinner';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword(email, password);

  const handleOnSubmit = e => {
    e.preventDefault();
    signInEmailPassword();
  };

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="sm:rounded-xl sm:shadow-md sm:border border-opacity-50 bg-white px-4 sm:px-8 py-12 w-full max-w-lg flex flex-col items-center">
      <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="logo" width={180} />

      <form onSubmit={handleOnSubmit} className="w-full">
        <div className="mt-12 w-full flex flex-col items-center space-y-6">
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full font-medium inline-flex justify-center items-center rounded-md p-3 text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-blue-600 disabled:hover:border-bg-600 transition-colors"
        >
          {isLoading ? <Spinner size="sm" /> : 'Sign in'}
        </button>

        {isError ? (
          <p className="mt-4 text-red-500 text-center">{error?.message}</p>
        ) : needsEmailVerification ? (
          <p className="mt-4 text-orange-500 text-center">
            Please check your mailbox and follow the verification link to verify
            your email
          </p>
        ) : null}
      </form>

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
