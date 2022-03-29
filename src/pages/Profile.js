import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNhostAuth } from '@nhost/react';
import { nhost } from '../lib/nhost';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';

const UPDATE_USER_QUERY = `
  mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
    updateUser(
      pk_columns: { id: $id },
      _set: { displayName: $displayName, metadata: $metadata }
    ) {
      id
      displayName
      metadata
    }
  }
`;

const Profile = () => {
  const { user } = useNhostAuth();

  const [firstName, setFirstName] = useState(user?.metadata?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.metadata?.lastName ?? '');

  const isFirstNameDirty = firstName !== user?.metadata?.firstName;
  const isLastNameDirty = lastName !== user?.metadata?.lastName;
  const isFormDirty = isFirstNameDirty || isLastNameDirty;

  const updateUserProfile = async e => {
    e.preventDefault();

    const { data, error } = await nhost.graphql.request(UPDATE_USER_QUERY, {
      id: user.id,
      displayName: `${firstName} ${lastName}`.trim(),
      metadata: {
        firstName,
        lastName,
      },
    });

    if (error) {
      toast.error('Unable to update profile', { id: 'updateProfile' });
    } else if (data) {
      toast.success('Updated successfully', { id: 'updateProfile' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - Nhost</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8">
        <div className="sm:min-w-[320px]">
          <h2 className="text-lg sm:text-xl">Profile</h2>
          <p className="mt-1 text-gray-500 leading-tight">
            You can update your personal information.
          </p>
        </div>

        <div className="rounded-md shadow-md border border-opacity-50 w-full max-w-screen-md overflow-hidden bg-white">
          <form onSubmit={updateUserProfile}>
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
                  value={user?.email}
                  readOnly
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
