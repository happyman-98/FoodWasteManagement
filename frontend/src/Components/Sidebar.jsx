// src/Components/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, User, Package, MessageSquare, LogOut, Menu, X } from 'lucide-react';

export const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div 
    onClick={onClick} 
    className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${
      isActive ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-900'
    }`}
  >
    <Icon size={20} className={isActive ? 'text-white' : 'text-green-100'} />
    <span className="font-medium">{label}</span>
  </div>
);

export default function Sidebar({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 bg-[#174624] text-white rounded-lg shadow-md focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Sidebar Panel */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        fixed md:static inset-y-0 left-0 w-64 bg-[#174624] text-white flex flex-col transition-transform duration-300 z-40 shadow-xl
      `}>
        {/* Brand Identity */}
        <div className="p-6 pt-8 pb-10 flex items-center gap-2">
          <div className="bg-green-500 rounded-full p-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-wide">Share<span className="text-green-400">Cycle</span></h1>
        </div>

        {/* Navigation Routing Elements */}
        <nav className="flex-1 space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            isActive={activePage === 'Dashboard'} 
            onClick={() => { setActivePage('Dashboard'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={Package} 
            label="My Listings" 
            isActive={activePage === 'My Listings'} 
            onClick={() => { setActivePage('My Listings'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Inbox" 
            isActive={activePage === 'Inbox'} 
            onClick={() => { setActivePage('Inbox'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={User} 
            label="Profile" 
            isActive={activePage === 'Profile'} 
            onClick={() => { setActivePage('Profile'); setIsMobileMenuOpen(false); }} 
          />
        </nav>

        {/* System Footnote controls */}
        <div className="p-4 border-t border-green-800">
          <button className="flex items-center gap-3 px-6 py-3 text-green-200 hover:text-white transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}