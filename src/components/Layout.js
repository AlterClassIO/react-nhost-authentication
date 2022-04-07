import { Fragment } from 'react';
import { useUserData, useSignOut } from '@nhost/react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline';

const Avatar = ({ src = '', alt = '' }) => (
  <img
    width={35}
    height={35}
    className="rounded-full bg-gray-100"
    src={src}
    alt={alt}
  />
);

const Layout = () => {
  const user = useUserData();
  const { signOut } = useSignOut();

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: HomeIcon,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: UserIcon,
    },
    {
      label: 'Logout',
      onClick: signOut,
      icon: LogoutIcon,
    },
  ];

  return (
    <div>
      <header className="fixed z-10 top-0 inset-x-0 h-[60px] shadow bg-white">
        <div className="container mx-auto px-4 py-3 flex justify-between">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="logo" />
          </Link>

          <Menu as="div" className="relative z-50">
            <Menu.Button className="flex items-center space-x-px group">
              <Avatar src={user?.avatarUrl} alt={user?.displayName} />
              <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                  <div className="shrink-0">
                    <Avatar src={user?.avatarUrl} alt={user?.displayName} />
                  </div>
                  <div className="flex flex-col truncate">
                    <span>{user?.displayName}</span>
                    <span className="text-sm text-gray-500">{user?.email}</span>
                  </div>
                </div>

                <div className="py-2">
                  {menuItems.map(({ label, href, onClick, icon: Icon }) => (
                    <div
                      key={label}
                      className="px-2 last:border-t last:pt-2 last:mt-2"
                    >
                      <Menu.Item>
                        {href ? (
                          <Link
                            to={href}
                            className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                          >
                            <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                            <span>{label}</span>
                          </Link>
                        ) : (
                          <button
                            className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                            onClick={onClick}
                          >
                            <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                            <span>{label}</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      <main className="mt-[60px]">
        <div className="container mx-auto px-4 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
