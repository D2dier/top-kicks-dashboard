import React from 'react';
import { Outlet } from 'react-router-dom';
import BilingualNavbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({ language, onLanguageChange }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BilingualNavbar language={language} onLanguageChange={onLanguageChange} />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer language={language} onLanguageChange={onLanguageChange} />
    </div>
  );
};

export default Layout;
