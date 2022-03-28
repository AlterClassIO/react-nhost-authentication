const Input = ({ type = 'text', label = '', ...props }) => {
  return (
    <div className="w-full flex flex-col">
      {label ? (
        <label className="text-gray-700 font-medium text-sm mb-1">
          {label}
        </label>
      ) : null}
      <input
        type={type}
        value={null}
        onChange={null}
        className="w-full shadow-sm rounded-md p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
};

const SignUp = () => {
  return (
    <div className="rounded-xl shadow-md border border-opacity-50 bg-white px-6 sm:px-8 py-12 max-w-md flex flex-col items-center">
      <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="logo" width={180} />

      <div className="mt-12 flex flex-col items-center space-y-6">
        <div className="flex gap-6">
          <Input label="First name" />
          <Input label="Last name" />
        </div>
        <Input type="email" label="Email address" />
        <Input type="password" label="Create password" />
      </div>

      <button className="mt-6 w-full font-medium rounded-md p-3 text-white  bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed  disabled:hover:bg-transparent disabled:hover:border-bg-600 transition-colors">
        Create account
      </button>

      <p className="mt-8 text-gray-500">
        Already have an account?{' '}
        <a
          href="/sign-in"
          className="text-blue-600 hover:text-blue-500 hover:underline hover:underline-offset-1 font-medium transition"
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
