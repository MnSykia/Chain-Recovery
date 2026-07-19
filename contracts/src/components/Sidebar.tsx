"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, ShieldCheck, History, Laptop, Wallet, Key, FileText, Settings, HelpCircle, Shield } from 'lucide-react';

interface SidebarProps {
  selectedCategories?: string[];
  onCategoryToggle?: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  selectedCategories = [], 
  onCategoryToggle 
}) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      active: pathname === '/'
    },
    {
      name: 'Report Item',
      href: '/report',
      icon: PlusCircle,
      active: pathname === '/report'
    },
    {
      name: 'Claims Hub',
      href: '/claims/0x82f281a83017a02c918a2e1d743a192c73362198052', // Maps to MacBook Pro 14" claim page
      icon: ShieldCheck,
      active: pathname.startsWith('/claims')
    },
    {
      name: 'History Feed',
      href: '/history/0x7a2d3490cca0800a52d8291a139bc733621984f9b', // Maps to Rolex timeline page
      icon: History,
      active: pathname.startsWith('/history')
    }
  ];

  const categories = [
    { name: 'Electronics', icon: Laptop },
    { name: 'Wallets', icon: Wallet },
    { name: 'Keys', icon: Key },
    { name: 'Documents', icon: FileText }
  ];

  return (
    <aside className="w-64 sticky top-24 hidden lg:flex flex-col pr-md shrink-0 self-start">
      {/* Navigation block */}
      <div className="flex flex-col space-y-md">
        <div className="text-label-sm font-semibold text-on-surface-variant/60 px-md uppercase tracking-wider">
          Navigation
        </div>
        <nav className="flex flex-col space-y-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-sm p-md rounded-xl transition-all ${
                  item.active
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-md scale-[0.98]'
                    : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-body-md">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Categories Checkboxes (visible only on Dashboard page for filtering) */}
        {onCategoryToggle && (
          <div className="pt-xl">
            <div className="text-label-sm font-semibold text-on-surface-variant/60 px-md uppercase tracking-wider mb-sm">
              Categories
            </div>
            <div className="flex flex-col space-y-xs">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isChecked = selectedCategories.includes(cat.name);
                return (
                  <label 
                    key={cat.name} 
                    className="flex items-center justify-between p-md hover:bg-surface-variant rounded-xl cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center space-x-sm">
                      <Icon className="w-5 h-5 text-primary group-hover:brightness-110 transition-all" />
                      <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">{cat.name}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onCategoryToggle(cat.name)}
                      className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Support footer menu inside Sidebar */}
      <div className="mt-16 pt-md border-t border-outline-variant flex flex-col space-y-xs">
        <a className="flex items-center space-x-sm p-md text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all" href="#">
          <Settings className="w-5 h-5" />
          <span className="text-body-md">Settings</span>
        </a>
        <a className="flex items-center space-x-sm p-md text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all" href="#">
          <HelpCircle className="w-5 h-5" />
          <span className="text-body-md">Support</span>
        </a>
      </div>
    </aside>
  );
};
