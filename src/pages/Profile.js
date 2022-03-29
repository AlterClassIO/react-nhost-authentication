import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNhostAuth } from '@nhost/react';
import Input from '../components/Input';

const Profile = () => {
  const { user } = useNhostAuth();

  const [firstName, setFirstName] = useState(user?.metadata?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.metadata?.lastName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  const isFormDirty =
    firstName !== user?.metadata?.firstName ||
    lastName !== user?.metadata?.lastName ||
    email !== user?.email;

  const updateUserData = async e => {
    e.preventDefault();
    // TODO
  };

  return (
    <>
      <Helmet>
        <title>Profile - Nhost</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8">
        <div className="sm:min-w-[320px]">
          <h2 className="text-lg sm:text-xl">Profile</h2>
          <p className="mt-1 text-sm text-gray-500 leading-tight">
            You can update your personal information.
          </p>
        </div>

        <div className="rounded-md shadow-md border border-opacity-50 w-full max-w-screen-md overflow-hidden">
          <form onSubmit={updateUserData}>
            <div className="px-4 md:px-8 py-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Input
                  type="text"
                  label="First name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  label="Last name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="sm:max-w-md">
                <Input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full bg-gray-50 py-4 px-4 md:px-8 flex justify-end">
              <button
                type="submit"
                disabled={!isFormDirty}
                className="bg-gray-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-700 focus:ring-opacity-20 hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
