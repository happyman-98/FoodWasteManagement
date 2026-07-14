// src/pages/Admin/components/Sidebar.jsx
import React from 'react';
import { 
  LayoutDashboard, Users, Building2, ShieldCheck, 
  Gift, BarChart3, Settings as SettingsIcon, LogOut, Menu, X 
} from 'lucide-react';

export const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 mx-4 rounded-full cursor-pointer transition-all ${
      isActive 
        ? 'bg-[#2a7a38] text-white shadow-sm' 
        : 'text-green-100 hover:bg-white/10 hover:text-white'
    }`}
  >
    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'text-green-100'} />
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
        fixed md:static inset-y-0 left-0 w-64 bg-[#14532d] text-white flex flex-col transition-transform duration-300 z-40
      `}>
        {/* Brand Identity */}
        <div className="p-6 pt-8 pb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide">ShareCycle</h1>
        </div>

        {/* Section Header */}
        <div className="px-8 pb-3">
          <span className="text-[10px] font-bold text-green-200/60 uppercase tracking-widest">
            Admin Panel
          </span>
        </div>

        {/* Navigation Routing Elements */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            isActive={activePage === 'Dashboard'}
            onClick={() => { setActivePage('Dashboard'); setIsMobileMenuOpen(false); }}
          />
          <SidebarItem
            icon={Users}
            label="Users"
            isActive={activePage === 'Users'}
            onClick={() => { setActivePage('Users'); setIsMobileMenuOpen(false); }}
          />
          <SidebarItem
            icon={Building2}
            label="Restaurants"
            isActive={activePage === 'Restaurants'}
            onClick={() => { setActivePage('Restaurants'); setIsMobileMenuOpen(false); }}
          />
          <SidebarItem
            icon={ShieldCheck}
            label="NGOs"
            isActive={activePage === 'NGOs'}
            onClick={() => { setActivePage('NGOs'); setIsMobileMenuOpen(false); }}
          />
          <SidebarItem
            icon={Gift}
            label="Donations"
            isActive={activePage === 'Donations'}
            onClick={() => { setActivePage('Donations'); setIsMobileMenuOpen(false); }}
          />
          <SidebarItem
            icon={BarChart3}
            label="Reports"
            isActive={activePage === 'Reports'}
            onClick={() => { setActivePage('Reports'); setIsMobileMenuOpen(false); }}
          />
          <SidebarItem
            icon={SettingsIcon}
            label="Settings"
            isActive={activePage === 'Settings'}
            onClick={() => { setActivePage('Settings'); setIsMobileMenuOpen(false); }}
          />
        </nav>

        {/* System Footnote controls */}
        <div className="p-4 mt-auto mb-4 mx-2">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-full text-green-100 hover:bg-white/10 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}