import React from 'react';

// Mock data for items
const items = [
  {
    id: 1,
    title: 'MacBook Pro M2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAShGPgaaI2aCqR8ex2x1TTKJf26XW04kYJmMongel24bhR2-XSkTznBk68WTxsUU50PJ6OWVcKVJPq4qEE2k7vYurgbhqTifVa_tlWYWwHH478SFaAXMQRTcN-m6RfdGXQ7g53ZaRd9w0E68zYkqVM7Rf8j-cUHYNNaP5IMiqpuSbWtcdYXxlJ5RT9aC2oPrA_KCpgGnhXlqbzglBiu3PX19tWSPHzL4mcoJgTysQauzIuaCTXszOP',
    status: 'lost',
    location: 'Central Park Tech Pavilion',
    date: 'Oct 24, 2023',
    reward: '0.05 ETH',
  },
  {
    id: 2,
    title: 'Leather Bifold Wallet',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzW-dwzhRalqAB3ciuw5zCJYjtsv3fl2vRk-ERhFQaGecwPk7UQ2YYPEmcOYPwQsAn-bhXuRjH4PViZhTXh0Lj_AyrUXBEIo0tjXFy1BZ4kXS5ob2z3AYZqY39wPaVAOAOqZ0CaH2UVYV7FSwoMjXJutfartxnc4so3vcMMfa1eB0nIEKpiQ2rZWDyv1LCrrNaYoVBAxIHwPoYHM5bC0ZqdEHSZ-i2sgy6thpHRs5ijxk5Emp4ls8W',
    status: 'found',
    location: 'Grand Central Terminal',
    date: 'Oct 25, 2023',
    reward: '0.05 ETH',
  },
  {
    id: 3,
    title: 'Tesla Model S Fob',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ETO4xh13D_2VxCJ-ObzKamNGvHOUrtgsDs0_P95VtvUs7OTg6NMAjbcMJAsWJ41ilvLnmNEHD0WtIyP6tD7iwj3HsqJCizKbdAm1vdu5ozFP-YFD7LBg_uUirJ6cR0oMscSZ_tqYOP7Xi2OSNawSe6Kq4G5-sZFK9DH-m14n4p2oABtiFTecFCHRQNlrfNKEzO6yvOqe7bYMl5djLtB8IC7lx6AW5aCA4iLKjOyIer756aJkjZWO',
    status: 'lost',
    location: 'SoHo Parking Garage',
    date: 'Oct 22, 2023',
    reward: '0.05 ETH',
  },
  {
    id: 4,
    title: 'European Passport',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZPWm7zfvUUfoXwp_rYeTZuk7Czsc9Rhq6KNZ6fvs0wMHaw1kJ4zo70Ywy6TEh277sMYB3ZiNQKUcubJaeTSuKOvPGJQKktmxDztFZHztLRgWtgxKJ9W96zbFuWubpRKyTcqb_tqMDVHAM8P9AJd-JY209zpi5T1QJ6klefOIPgftOpWfkLQYYChGBnuR2yAho9QknGFyU24xQsHFY1tTKOyuZXpGd6JgyoyDvwnL14dKwiAqCJS3',
    status: 'lost',
    location: 'JFK Terminal 4',
    date: 'Oct 26, 2023',
    reward: '0.05 ETH',
  },
];

function ItemCard({ item }: { item: typeof items[0] }) {
  const isLost = item.status === 'lost';
  const statusClasses = isLost
    ? 'border-t-2 border-t-tertiary status-glow-lost'
    : 'border-t-2 border-t-secondary status-glow-found';
  const statusLabel = isLost ? 'Lost Item' : 'Found Item';
  const badgeBg = isLost ? 'bg-primary/10' : 'bg-secondary/10';
  const badgeBorder = isLost ? 'border-primary/30' : 'border-secondary/30';
  const badgeText = isLost ? 'text-primary' : 'text-secondary';
  const iconName = isLost ? 'devices' : 'account_balance_wallet';
  const iconColor = isLost ? 'primary' : 'secondary';
  return (
    <div className={`glass-panel rounded-xl overflow-hidden flex flex-col ${statusClasses} cursor-pointer hover:border-outline transition-all duration-300`}> 
      <div className="h-48 w-full relative">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        />
        <div className="absolute top-md left-md">
          <span className={`${badgeBg} border ${badgeBorder} ${badgeText} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md`}>{statusLabel}</span>
        </div>
      </div>
      <div className="p-lg flex flex-col flex-1">
        <div className="flex justify-between items-start mb-sm">
          <h3 className="text-headline-md font-headline-md text-on-surface">{item.title}</h3>
          <span className={`text-${iconColor} material-symbols-outlined`}>{iconName}</span>
        </div>
        <div className="space-y-sm text-body-md font-body-md text-on-surface-variant mb-md">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-sm opacity-60">location_on</span>
            <span>{item.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-sm opacity-60">calendar_today</span>
            <span>{item.date}</span>
          </div>
        </div>
        <div className="mt-auto pt-md border-t border-outline-variant flex items-center justify-between">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-variant flex items-center justify-center text-[10px] font-bold">0x</div>
            <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold text-center">JD</div>
          </div>
          <button className="text-tertiary text-label-sm font-label-sm flex items-center group-hover:underline">View Proofs <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span></button>
        </div>
      </div>
    </div>
  );
}

export default function ItemGrid() {
  return (
    <div id="grid-container" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
