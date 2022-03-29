import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NhostReactProvider } from '@nhost/react';
import { nhost } from './lib/nhost';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <NhostReactProvider nhost={nhost}>
        <BrowserRouter>
          <Routes>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NhostReactProvider>

      <Toaster />
    </>
  );
}

export default App;
