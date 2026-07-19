import Link from 'next/link';
import { Bell, Settings, Wallet } from 'lucide-react';
import { useChainRecovery } from '@/hooks/useChainRecovery';

export default function TopNavBar() {
  const { reportItem } = useChainRecovery();

  const handleDemoReport = async () => {
    try {
      const tx = await reportItem('Demo Lost Phone', 'Black iPhone 14 found in lobby', 0);
      alert(`Tx submitted: ${tx.hash}`);
    } catch (e) {
      console.error(e);
      alert('Report failed – check console');
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-md dark:bg-background/80 border-b border-outline-variant dark:border-outline-variant sticky top-0 z-50 h-16 flex items-center px-gutter max-w-container-max mx-auto">
      <div className="flex-1 flex items-center justify-between">
        <h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed-dim">
          ChainRecovery
        </h1>
        <nav className="hidden md:flex space-x-lg">
          <Link href="#" className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-sm text-label-sm">
            Dashboard
          </Link>
          <Link href="#" className="text-primary dark:text-primary-fixed-dim border-b-2 border-primary pb-1 font-label-sm text-label-sm">
            Report Item
          </Link>
          <Link href="#" className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-sm text-label-sm">
            Claims
          </Link>
        </nav>
        <div className="flex items-center space-x-md">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Bell size={24} />
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Settings size={24} />
          </button>
          <button className="bg-primary text-on-primary px-md py-2 rounded-lg font-label-sm text-label-sm hover:brightness-110 active:scale-95 transition-all glow-primary">
            Connect Wallet
            <Wallet size={20} className="ml-2 inline" />
          </button>
        </div>
      </div>
    </header>
  );
}
