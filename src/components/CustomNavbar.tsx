
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, FileEdit, ClipboardList } from 'lucide-react';

const CustomNavbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container flex justify-between items-center py-4">
        {/* Logo / Brand */}
        <Link to="/" className="font-bold text-xl text-brand-purple">
          VenThatGrant™
        </Link>
        
        {/* Main Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            isActive('/') ? "text-brand-purple" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}>
            Home
          </Link>
          <Link to="/explore" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            isActive('/explore') ? "text-brand-purple" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}>
            Explore Grants
          </Link>
          <Link to="/saved-grants" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            isActive('/saved-grants') ? "text-brand-purple" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}>
            Saved Grants
          </Link>
          <Link to="/proposals" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            isActive('/proposals') ? "text-brand-purple" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}>
            Proposals
          </Link>
          <Link to="/reports" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            isActive('/reports') ? "text-brand-purple" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}>
            Reports
          </Link>
          <Link to="/how-it-works" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            isActive('/how-it-works') ? "text-brand-purple" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}>
            How It Works
          </Link>
          <Link to="/about" className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            isActive('/about') ? "text-brand-purple" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          )}>
            About
          </Link>
        </div>
        
        {/* Mobile Actions */}
        <div className="flex md:hidden space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/saved-grants">
              <BookmarkIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/proposals">
              <FileEdit className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/reports">
              <ClipboardList className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
