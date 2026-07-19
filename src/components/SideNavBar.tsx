import Link from 'next/link';
import { LucideIcon, Home, AddBox, VerifiedUser, History, Settings, HelpCircle } from 'lucide-react';

const menuItems = [
  { href: '#', label: 'Dashboard', icon: Home },
  { href: '#', label: 'Report Item', icon: AddBox },
  { href: '#', label: 'Claims', icon: VerifiedUser },
  { href: '#', label: 'History', icon: History },
];

export default function SideNavBar() {
  return (
    <aside className="h-[calc(100vh-120px)] w-64 sticky top-24 hidden lg:flex flex-col space-y-base pr-md">
      <div className="text-label-sm font-label-sm text-on-surface-variant/60 px-md uppercase tracking-wider">
        Navigation
      </div>
      <nav className="flex flex-col space-y-xs">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center space-x-sm p-md bg-primary-container text-on-primary-container rounded-xl font-bold transition-all scale-98">
            <item.icon className="text-primary" />
            <span className="text-body-md font-body-md">{item.label}</span>
          </Link>
        ))}
        <div className="pt-xl">
          <div className="text-label-sm font-label-sm text-on-surface-variant/60 px-md uppercase tracking-wider mb-sm">
            Categories
          </div>
          <div className="flex flex-col space-y-xs">
            {['Electronics', 'Wallets & Keys', 'Bags & Luggage', 'Jewelry', 'Pets'].map((cat) => (
              <label key={cat} className="flex items-center justify-between p-md hover:bg-surface-variant rounded-xl cursor-pointer group">
                <div className="flex items-center space-x-sm">
                  <Home className="text-primary" />
                  <span className="text-body-md font-body-md">{cat}</span>
                </div>
                <input type="checkbox" className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary" />
              </label>
            ))}
          </div>
        </div>
        <div className="mt-auto flex flex-col space-y-xs border-t border-outline-variant pt-md">
          <Link href="#" className="flex items-center space-x-sm p-md text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all">
            <Settings className="text-primary" />
            <span className="text-body-md font-body-md">Settings</span>
          </Link>
          <Link href="#" className="flex items-center space-x-sm p-md text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all">
            <HelpCircle className="text-primary" />
            <span className="text-body-md font-body-md">Support</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
