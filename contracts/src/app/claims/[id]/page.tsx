// src/app/claims/[id]/page.tsx
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useChainRecovery, Claim } from '@/hooks/useChainRecovery';
import { useWeb3 } from '@/context/Web3Context';

export default function ClaimPage() {
  const router = useRouter();
  const { getClaim } = useChainRecovery();
  const { address } = useWeb3();

  // Extract the claim ID from the URL (Next.js 14 App Router)
  const [claimId, setClaimId] = useState<string | null>(null);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Next.js 14 dynamic segments are available via `router`
    const path = window.location.pathname; // e.g. /claims/12
    const parts = path.split('/');
    const id = parts[parts.length - 1];
    setClaimId(id);
  }, []);

  useEffect(() => {
    if (!claimId) return;
    (async () => {
      setLoading(true);
      const data = await getClaim(claimId);
      setClaim(data);
      setLoading(false);
    })();
  }, [claimId, getClaim]);

  if (loading) {
    return <div className="p-8 text-body-md">Loading claim…</div>;
  }

  if (!claim) {
    return (
      <div className="p-8 text-body-md">
        No claim found for ID <strong>{claimId}</strong>.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Claim #{claim.id.toString()}</h1>
      <p className="mb-2"><strong>Owner:</strong> {claim.owner}</p>
      <p className="mb-2"><strong>Status:</strong>{' '}
        {claim.status === 0 ? 'Lost' : 'Found'}
      </p>
      <p className="mb-2"><strong>Title:</strong> {claim.title}</p>
      <p className="mb-2"><strong>Description:</strong> {claim.description}</p>
      <p className="text-sm text-on-surface-variant">
        (You are connected as <span className="font-mono">{address}</span>)
      </p>
    </div>
  );
}
