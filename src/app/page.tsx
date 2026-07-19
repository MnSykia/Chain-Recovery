"use client";
import TopNavBar from '@/components/TopNavBar';
import SideNavBar from '@/components/SideNavBar';
import ItemGrid from '@/components/ItemGrid';

export default function Dashboard() {
  return (
    <>
      <TopNavBar />
      <div className="flex max-w-container-max mx-auto px-gutter py-lg">
        <SideNavBar />
        <main className="flex-1 lg:ml-md">
          <h1 className="text-headline-lg font-headline-lg mb-sm text-on-background">Active Recovery Feed</h1>
          <p className="text-body-lg text-on-surface-variant mb-xl max-w-2xl">
            Browse the decentralized ledger of reported lost and found items. Real-time verification secured by the ChainRecovery smart contracts.
          </p>
          <ItemGrid />
        </main>
      </div>
    </>
  );
}
