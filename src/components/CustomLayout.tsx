
import React from 'react';
import CustomNavbar from './CustomNavbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CustomLayout;
