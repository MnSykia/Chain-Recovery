"use client";

import React, { useState, useEffect } from 'react';
// FIX: Changed relative path '../../../' to the absolute alias '@/'
import { useWeb3 } from '@/context/Web3Context';
import { useParams, useRouter } from 'next/navigation';
import { Package, ShieldCheck, CheckCircle2, XCircle, Loader2, Sparkles, MessageSquare, AlertCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function ClaimHub() {
  const params = useParams();
  const router = useRouter();
  const { items, verifyClaim, rejectClaim, address } = useWeb3();

  // FIX: Safe-guard against undefined context state during production load
  if (!items) {
    return (
      <div className="py-12 text-center max-w-lg mx-auto">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <h3 className="text-headline-md font-bold mb-2">Connecting to Ledger...</h3>
        <p className="text-on-surface-variant">Loading network claims state.</p>
      </div>
    );
  }

  const itemId = params.id as string;
  const item = items.find(i => i.id === itemId);

  const [processingClaimId, setProcessingClaimId] = useState<string | null>(null);

  // If item is not found, render a friendly error state
  if (!item) {
    return (
      <div className="py-12 text-center max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-headline-md font-bold mb-2">Record Not Found</h3>
        <p className="text-on-surface-variant mb-6">
          The requested item record does not exist on the current mock ledger state.
        </p>
        <Link href="/" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleApprove = async (claimId: string) => {
    setProcessingClaimId(claimId);
    
    // Simulate smart contract mining latency
    setTimeout(async () => {
      try {
        await verifyClaim(item.id, claimId);
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setProcessingClaimId(null);
      }
    }, 1500);
  };

  const handleReject = async (claimId: string) => {
    try {
      await rejectClaim(item.id, claimId);
    } catch (err) {
      console.error(err);
    }
  };

  const pendingClaims = item.claims.filter(c => c.status === 'PENDING');
  const resolvedClaims = item.claims.filter(c => c.status !== 'PENDING');

  return (
    <div className="py-2">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
        <div>
          <Link href="/" className="text-primary hover:underline text-label-sm font-semibold flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Recovery Feed
          </Link>
          <h1 className="text-headline-lg font-headline font-bold text-on-background mb-base">
            Claim Verification Hub
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Verify ownership of items through decentralized consensus.
          </p>
        </div>
        <div className="flex items-center gap-sm bg-surface-container-high px-md py-sm rounded-full border border-outline-variant/50">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-label-sm font-bold text-secondary uppercase tracking-wider">
            {pendingClaims.length} Active Claims
          </span>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        
        {/* Left Side: The Item specifications */}
        <section className="lg:col-span-5 space-y-lg">
          <h2 className="text-headline-md font-headline font-bold text-primary flex items-center gap-sm">
            <Package className="w-5 h-5" />
            <span>The Item</span>
          </h2>
          <div className="glass rounded-xl overflow-hidden glow-primary">
            <div className="relative h-72 w-full">
              <div 
                className="bg-cover bg-center w-full h-full" 
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary-container/90 backdrop-blur text-on-secondary-container px-md py-xs rounded-full text-label-sm font-bold border border-secondary/30">
                  LOCKED ON-CHAIN
                </span>
              </div>
            </div>

            <div className="p-lg space-y-md">
              <div>
                <h3 className="text-headline-md font-bold text-on-surface">{item.title}</h3>
                <p className="text-code font-code text-primary-fixed-dim mt-xs break-all text-xs">
                  ID: {item.id}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
                  <span className="text-[10px] text-on-surface-variant block mb-xs uppercase font-bold tracking-wider">Category</span>
                  <span className="text-label-sm font-bold text-on-surface">{item.category}</span>
                </div>
                <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
                  <span className="text-[10px] text-on-surface-variant block mb-xs uppercase font-bold tracking-wider">Location Found</span>
                  <span className="text-label-sm font-bold text-on-surface">{item.location}</span>
                </div>
              </div>

              <div className="pt-md border-t border-outline-variant/30">
                <p className="text-label-sm font-bold text-on-surface-variant uppercase mb-sm tracking-wider">
                  Verification Progress
                </p>
                <div className="space-y-lg relative pl-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] status-timeline-dashed" />
                  
                  <div className="relative flex items-center gap-md">
                    <div className="absolute -left-[23px] w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-on-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-label-sm font-bold text-on-surface">Item Logged &amp; Anchored</p>
                      <p className="text-[11px] text-on-surface-variant">Reported {item.date}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-md">
                    <div className={`absolute -left-[23px] w-4 h-4 rounded-full flex items-center justify-center ${
                      item.status === 'VERIFIED' || item.status === 'RECOVERED' ? 'bg-secondary' : 'bg-primary'
                    }`}>
                      <CheckCircle2 className="w-3 h-3 text-on-primary" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-label-sm font-bold ${
                        item.status === 'VERIFIED' || item.status === 'RECOVERED' ? 'text-on-surface' : 'text-primary font-bold'
                      }`}>
                        Claim Verification Phase
                      </p>
                      <p className="text-[11px] text-on-surface-variant">
                        {item.status === 'VERIFIED' || item.status === 'RECOVERED' ? 'Consensus Approved' : 'Awaiting owner confirmation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Pending Claims */}
        <section className="lg:col-span-7 space-y-lg">
          <h2 className="text-headline-md font-headline font-bold text-primary flex items-center gap-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Pending Claims</span>
          </h2>

          <div className="space-y-md">
            {pendingClaims.length === 0 && resolvedClaims.length === 0 && (
              <div className="glass rounded-xl p-8 text-center text-on-surface-variant text-label-sm border border-outline-variant/30">
                No claims have been filed for this item yet.
              </div>
            )}

            {/* List active/pending claims */}
            {pendingClaims.map(claim => (
              <div 
                key={claim.id} 
                className="glass rounded-xl p-lg space-y-lg border-t-2 border-primary group hover:border-primary/60 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-outline bg-surface-container relative">
                      <img 
                        src={claim.claimantAvatar} 
                        alt={claim.claimantName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-body-md font-bold text-on-surface">{claim.claimantName}</p>
                      <p className="text-code font-code text-primary-fixed-dim text-xs select-all">
                        {claim.claimant.substring(0, 8)}...{claim.claimant.substring(claim.claimant.length - 6)}
                      </p>
                    </div>
                  </div>
                  <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-lg text-label-sm font-bold">
                    CLAIM #{claim.id}
                  </span>
                </div>

                <div className="bg-surface-container-lowest/50 p-md rounded-lg border border-outline-variant/30">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-xs tracking-wider">Proof Description</p>
                  <p className="text-label-sm text-on-surface leading-relaxed">
                    {claim.description}
                  </p>
                </div>

                {/* Conversation Thread if exists */}
                {claim.conversation && claim.conversation.length > 0 && (
                  <div className="space-y-sm">
                    <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Conversation</p>
                    <div className="bg-surface-container-high/40 rounded-xl p-md space-y-sm">
                      {claim.conversation.map((msg, index) => (
                        <div key={index} className="flex gap-sm items-start text-label-sm">
                          <span className={`font-bold capitalize ${
                            msg.sender === 'finder' ? 'text-secondary' : 'text-primary'
                          }`}>
                            {msg.sender === 'finder' ? 'Finder' : claim.claimantName}:
                          </span>
                          <p className="text-on-surface">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-md pt-md">
                  <button 
                    onClick={() => handleApprove(claim.id)}
                    disabled={processingClaimId !== null}
                    className="flex-grow bg-secondary-container text-on-secondary-container py-3 rounded-lg font-bold flex items-center justify-center gap-sm hover:brightness-110 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                  >
                    {processingClaimId === claim.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Proof...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Claim</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => handleReject(claim.id)}
                    disabled={processingClaimId !== null}
                    className="px-lg border border-error text-error py-3 rounded-lg font-bold hover:bg-error-container/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {/* List resolved/rejected claims */}
            {resolvedClaims.map(claim => (
              <div 
                key={claim.id} 
                className={`glass rounded-xl p-lg space-y-lg border-t-2 transition-all duration-300 opacity-60 ${
                  claim.status === 'APPROVED' ? 'border-t-secondary bg-secondary-container/5' : 'border-t-outline'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container relative">
                      <img 
                        src={claim.claimantAvatar} 
                        alt={claim.claimantName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-label-sm font-bold text-on-surface">{claim.claimantName}</p>
                      <p className="text-[11px] text-on-surface-variant font-code">
                        {claim.claimant.substring(0, 8)}...{claim.claimant.substring(claim.claimant.length - 6)}
                      </p>
                    </div>
                  </div>
                  <span className={`border px-3 py-0.5 rounded text-[10px] font-bold ${
                    claim.status === 'APPROVED' 
                      ? 'bg-secondary/10 border-secondary/20 text-secondary' 
                      : 'bg-error-container/10 border-error-container/20 text-error'
                  }`}>
                    {claim.status}
                  </span>
                </div>
                <p className="text-label-sm text-on-surface-variant line-clamp-2">
                  {claim.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
