import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header-content">
        <h1 className="header-title">Creating Optimized Productivity In Lines Of Typescript - Simple Task Manager</h1>
        <nav>
          <div className="flex gap-md">
            <Link 
              to="/" 
              className={`btn ${location.pathname === '/' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Tasks
            </Link>
            <Link 
              to="/tags" 
              className={`btn ${location.pathname === '/tags' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Tags
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
