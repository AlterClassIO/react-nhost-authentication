import { useUserData } from '@nhost/react';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const user = useUserData();

  return (
    <>
      <Helmet>
        <title>Dashboard - Nhost</title>
      </Helmet>

      <div>
        <h2 className="text-3xl font-semibold">Dashboard</h2>

        <p className="mt-2 text-lg">
          Welcome, {user?.metadata?.firstName}{' '}
          <span role="img" alt="hello">
            👋
          </span>
        </p>

        <p className="mt-4 text-gray-500">
          Edit the{' '}
          <code className="bg-blue-100 text-blue-500 px-2 py-px rounded">
            src/pages/Dashboard.js
          </code>{' '}
          file to populate this page.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
