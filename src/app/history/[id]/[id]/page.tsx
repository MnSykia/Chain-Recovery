"use client";

import React, { useState } from 'react';
import { useWeb3 } from '../../../context/Web3Context';
import { useParams, useRouter } from 'next/navigation';
import { Shield, Sparkles, Activity, MapPin, Calendar, Heart, ShieldAlert, Zap, Headphones, CheckCircle2, Lock, ArrowLeft, Loader2, Fingerprint, PenTool, Check } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function HistoryTimeline() {
  const params = useParams();
  const router = useRouter();
  const { items, confirmRecovery, isConnected, connectWallet, address } = useWeb3();

  const itemId = params.id as string;
  const item = items.find(i => i.id === itemId);

  const [isReleasing, setIsReleasing] = useState(false);

  if (!item) {
    return (
      <div className="py-12 text-center max-w-lg mx-auto">
        <ShieldAlert className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-headline-md font-bold mb-2">Lifecycle Not Found</h3>
        <p className="text-on-surface-variant mb-6">
          The requested item timeline could not be loaded from the blockchain ledger.
        </p>
        <Link href="/" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleConfirmRecovery = async () => {
    setIsReleasing(true);
    // Simulate smart contract state confirmation
    setTimeout(async () => {
      try {
        await confirmRecovery(item.id);
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsReleasing(false);
      }
    }, 1500);
  };

  const isRecovered = item.status === 'RECOVERED';
  const isVerified = item.status === 'VERIFIED';
  const isClaimed = item.status === 'CLAIMED';
  const isReported = item.status === 'REPORTED';

  return (
    <div className="py-2">
      <div className="mb-md">
        <Link href="/" className="text-primary hover:underline text-label-sm font-semibold flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Item Info Header Card */}
      <div className="glass-panel rounded-xl p-lg mb-xl flex flex-col md:flex-row gap-lg items-center border-t-2 border-secondary">
        <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant bg-surface-container relative">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-sm mb-xs">
            <h1 className="text-headline-md font-headline font-bold text-on-surface">{item.title}</h1>
            <span className={`text-[10px] px-3 py-0.5 rounded-full uppercase tracking-widest font-bold w-fit mx-auto md:mx-0 ${
              isRecovered 
                ? 'bg-secondary/15 border border-secondary/30 text-secondary' 
                : 'bg-primary/15 border border-primary/30 text-primary'
            }`}>
              {item.status}
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mb-md">
            Serial: {item.serialNumber || 'Unspecified'} • Reported date: {item.date}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-md">
            <div className="bg-surface-container-highest/50 px-md py-sm rounded-lg border border-outline-variant/30 text-left">
              <p className="text-[9px] text-outline uppercase font-bold">Smart Contract</p>
              <p className="font-code text-xs text-primary">{item.id.substring(0, 10)}...{item.id.substring(item.id.length - 8)}</p>
            </div>
            <div className="bg-surface-container-highest/50 px-md py-sm rounded-lg border border-outline-variant/30 text-left">
              <p className="text-[9px] text-outline uppercase font-bold">Consensus confirmations</p>
              <p className="font-code text-xs text-primary">12 Validated Signatures</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lifecycle Timeline Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        
        {/* Left: The Visual Timeline */}
        <div className="lg:col-span-8 space-y-0 relative">
          
          {/* Vertical Line Connector */}
          <div className="absolute left-[27px] top-8 bottom-8 w-[2px] timeline-line z-0" />
          
          {/* Fill Active Progress Line */}
          <div 
            className="absolute left-[27px] top-8 w-[2px] timeline-line-active z-0 transition-all duration-1000" 
            style={{ 
              height: isRecovered 
                ? '100%' 
                : isVerified 
                  ? '75%' 
                  : isClaimed 
                    ? '50%' 
                    : '25%' 
            }}
          />

          {/* Step 1: Logged on Chain */}
          <div className="relative pl-16 pb-xl">
            <div className="absolute left-0 top-0 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center z-10 glow-primary border-4 border-background shadow-md">
              <Activity className="w-6 h-6" />
            </div>
            <div className="glass-panel rounded-xl p-lg border-l-4 border-secondary hover:border-brightness-125 transition-all">
              <div className="flex justify-between items-start mb-md">
                <div>
                  <h3 className="text-headline-md font-bold text-on-surface">Item Logged on Chain</h3>
                  <p className="text-on-surface-variant text-label-sm">Initial metadata reports anchored onto blockchain.</p>
                </div>
                <span className="text-[11px] font-bold text-secondary font-code">COMPLETED</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
                  <p className="text-[9px] text-outline uppercase font-bold mb-xs">Timestamp</p>
                  <p className="font-code text-xs text-on-surface">{item.date} 14:22:10 UTC</p>
                </div>
                <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
                  <p className="text-[9px] text-outline uppercase font-bold mb-xs">Anchor Block</p>
                  <p className="font-code text-xs text-on-surface">#18,442,901</p>
                </div>
              </div>
              <div className="mt-md flex items-center gap-sm text-label-sm text-outline">
                <span>Reporter Wallet Address: {item.reporter}</span>
              </div>
            </div>
          </div>

          {/* Step 2: Verification Phase */}
          <div className="relative pl-16 pb-xl">
            <div className={`absolute left-0 top-0 w-14 h-14 rounded-full flex items-center justify-center z-10 border-4 border-background shadow-md ${
              isClaimed || isVerified || isRecovered ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest text-outline'
            }`}>
              <Shield className="w-6 h-6" />
            </div>
            <div className={`glass-panel rounded-xl p-lg border-l-4 ${
              isClaimed || isVerified || isRecovered ? 'border-l-secondary' : 'border-l-outline-variant opacity-60'
            }`}>
              <div className="flex justify-between items-start mb-md">
                <div>
                  <h3 className="text-headline-md font-bold text-on-surface">Claims Submission</h3>
                  <p className="text-on-surface-variant text-label-sm">Evidence submitted by validators and claimants.</p>
                </div>
                <span className={`text-[11px] font-bold font-code ${
                  isClaimed || isVerified || isRecovered ? 'text-secondary' : 'text-outline'
                }`}>
                  {isClaimed || isVerified || isRecovered ? 'COMPLETED' : 'AWAITING CLAIMS'}
                </span>
              </div>
              
              {item.claims.length > 0 ? (
                <div className="space-y-sm">
                  {item.claims.map((claim, idx) => (
                    <div key={idx} className="flex items-center justify-between p-sm bg-surface-container-low rounded-lg border border-outline-variant/30">
                      <span className="font-code text-xs text-on-surface-variant">Claimant: {claim.claimantName} ({claim.claimant.substring(0, 10)}...)</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        claim.status === 'APPROVED' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
                      }`}>{claim.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-label-sm text-on-surface-variant italic">No claims filed yet.</p>
              )}
            </div>
          </div>

          {/* Step 3: Ownership Proven */}
          <div className="relative pl-16 pb-xl">
            <div className={`absolute left-0 top-0 w-14 h-14 rounded-full flex items-center justify-center z-10 border-4 border-background shadow-md ${
              isVerified || isRecovered ? 'bg-secondary text-on-secondary' : isClaimed ? 'bg-primary text-on-primary pulse-node' : 'bg-surface-container-highest text-outline'
            }`}>
              <Fingerprint className="w-6 h-6" />
            </div>
            <div className={`glass-panel rounded-xl p-lg border-l-4 ${
              isVerified || isRecovered ? 'border-l-secondary' : isClaimed ? 'border-l-primary' : 'border-l-outline-variant opacity-60'
            }`}>
              <div className="flex justify-between items-start mb-md">
                <div>
                  <h3 className="text-headline-md font-bold text-on-surface">Ownership Proven</h3>
                  <p className="text-on-surface-variant text-label-sm">Cryptographic verification submitted by the owner.</p>
                </div>
                <span className={`text-[11px] font-bold font-code ${
                  isVerified || isRecovered ? 'text-secondary' : isClaimed ? 'text-primary animate-pulse' : 'text-outline'
                }`}>
                  {isRecovered ? 'VERIFIED' : isVerified ? 'AWAITING FINAL HANDSHAKE' : 'LOCKED'}
                </span>
              </div>
              
              {isVerified && (
                <div className="bg-primary/5 border border-primary/20 p-md rounded-lg space-y-md">
                  <p className="text-label-sm text-on-surface-variant">
                    Owner signature validated. Release stake to trigger reward payouts and confirm physical item handover.
                  </p>
                  
                  {isConnected ? (
                    <button 
                      onClick={handleConfirmRecovery}
                      disabled={isReleasing}
                      className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-label-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2"
                    >
                      {isReleasing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Executing contract payouts...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Release Stake &amp; Confirm Handshake</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button 
                      onClick={connectWallet}
                      className="bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-bold text-label-sm hover:brightness-110 active:scale-95 transition-all"
                    >
                      Connect Wallet to Release Stake
                    </button>
                  )}
                </div>
              )}

              {isRecovered && (
                <div className="bg-secondary/10 border border-secondary/20 p-md rounded-lg text-label-sm text-secondary font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Stakes released successfully. Reward transacted.</span>
                </div>
              )}
            </div>
          </div>

          {/* Step 4: Returned Handover */}
          <div className="relative pl-16">
            <div className={`absolute left-0 top-0 w-14 h-14 rounded-full flex items-center justify-center z-10 border-4 border-background shadow-md ${
              isRecovered ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest text-outline'
            }`}>
              <Check className="w-6 h-6" />
            </div>
            <div className={`glass-panel rounded-xl p-lg border-l-4 ${
              isRecovered ? 'border-l-secondary' : 'border-l-outline-variant opacity-60'
            }`}>
              <h3 className="text-headline-md font-bold text-on-surface">Item Returned</h3>
              <p className="text-on-surface-variant text-label-sm leading-relaxed mt-1">
                Physical handover confirmed by both parties via QR-Handshake. Escrow release closed.
              </p>
              {!isRecovered && (
                <p className="mt-md text-[10px] text-outline font-bold uppercase tracking-widest">
                  Locked Until Previous Step Completion
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Trust Scores */}
        <div className="lg:col-span-4 space-y-lg">
          
          {/* Trust Score */}
          <div className="glass-panel rounded-xl p-lg">
            <h4 className="text-label-sm font-bold text-outline uppercase mb-md tracking-wider">
              Trust Score
            </h4>
            <div className="flex items-end gap-sm mb-md">
              <span className="text-headline-lg font-bold text-secondary">
                {item.trustScore || '95.0'}%
              </span>
              <span className="text-on-surface-variant mb-base text-xs">
                Immutability Rating
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div 
                className="bg-secondary h-full transition-all duration-1000" 
                style={{ width: `${item.trustScore || 95.0}%` }}
              />
            </div>
          </div>

          {/* Network activity */}
          <div className="glass-panel rounded-xl p-lg">
            <h4 className="text-label-sm font-bold text-outline uppercase mb-md tracking-wider">
              Network Confirmations
            </h4>
            <div className="space-y-md text-label-sm">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">L1 Block Confirmations</span>
                <span className="font-code font-bold text-primary">128</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Zk-Proof Status</span>
                <span className="text-secondary flex items-center gap-xs font-bold">
                  <Check className="w-4 h-4" /> Valid
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Oracle Health</span>
                <span className="text-secondary flex items-center gap-xs font-bold">
                  <Zap className="w-4 h-4 fill-secondary" /> Active
                </span>
              </div>
            </div>
          </div>

          {/* Disputes info */}
          <div className="glass-panel rounded-xl p-lg bg-primary-container/10 border border-primary/20">
            <h4 className="text-label-sm font-bold text-primary uppercase mb-sm tracking-wider">
              Case disputes
            </h4>
            <p className="text-label-sm text-on-surface mb-md leading-relaxed">
              Need to dispute a lifecycle node? Contact your assigned validator.
            </p>
            <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-bold flex items-center justify-center gap-sm hover:brightness-110 active:scale-95 transition-all text-label-sm shadow">
              <Headphones className="w-4 h-4" />
              <span>Open dispute ticket</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
