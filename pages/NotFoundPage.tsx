

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-extrabold text-brand-purple">404</h1>
      <h2 className="text-3xl font-bold text-textPrimary mt-4">Page Not Found</h2>
      <p className="text-textSecondary mt-2 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;