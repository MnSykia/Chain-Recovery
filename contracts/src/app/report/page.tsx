"use client";

import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle2, ShieldAlert, Sparkles, MapPin, Loader2, ArrowLeft, ArrowRight, Link as LinkIcon, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReportItem() {
  const { reportItem, isConnected, connectWallet } = useWeb3();
  const router = useRouter();

  const [activeType, setActiveType] = useState<'LOST' | 'FOUND'>('LOST');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reward, setReward] = useState('0.05');
  const [location, setLocation] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Step names
  const steps = ['Item Details', 'Media Assets', 'Blockchain Submission'];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      // Create item and add it to our state
      await reportItem(
        title,
        `Category: ${category}. Serial Number: ${serialNumber || 'N/A'}. Reported details.`,
        category,
        activeType,
        location || 'Not Specified',
        date,
        imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg-AOuCHEXiDjTvisf0mP7Vlte9LzDcNVVcj6TqxMQ_meeEe56ZaqAsQz029hD4gXJNRdIbi-A3nG3geB79DdprPLUMSuSu_hLFPaO-S41LcAdFL4KPTz6bcxRpISTg03UlcJuwZUrxP5zACAORUXiEAwFG-_qt-U7Q8ntv_-fuNh3_7dgSVT-IsYBVyQmn0NRpstmf9KZaEA5v1EUE7ReoelOq2rzRiIILT4D3rK8ty3QY7Hb0Seq',
        serialNumber
      );

      // Trigger standard hackathon reward celebration
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Redirect to Dashboard Feed
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-2">
      <div className="flex flex-col lg:flex-row gap-xl">
        {/* Left Side: Form Content */}
        <div className="flex-1 max-w-3xl">
          {/* Header & Mode Toggle */}
          <div className="mb-xl">
            <h1 className="font-headline text-headline-lg font-bold mb-sm text-on-background">
              Submit New Report
            </h1>
            <p className="text-on-surface-variant mb-lg">
              Securely anchor your lost or found item data to the blockchain.
            </p>
            <div className="flex p-1 bg-surface-container rounded-xl w-fit">
              <button 
                type="button"
                onClick={() => setActiveType('LOST')}
                className={`px-lg py-2 rounded-lg font-bold text-label-sm transition-all duration-300 ${
                  activeType === 'LOST' 
                    ? 'bg-primary-container text-on-primary-container shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                Reporting a Lost Item
              </button>
              <button 
                type="button"
                onClick={() => setActiveType('FOUND')}
                className={`px-lg py-2 rounded-lg font-bold text-label-sm transition-all duration-300 ${
                  activeType === 'FOUND' 
                    ? 'bg-primary-container text-on-primary-container shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                Reporting a Found Item
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-xl relative">
            <div className="flex justify-between items-center mb-base">
              <span className="text-label-sm font-bold text-primary">
                STEP {currentStep} OF 3
              </span>
              <span className="text-label-sm font-bold text-on-surface-variant">
                {steps[currentStep - 1]}
              </span>
            </div>
            <div className="h-1 bg-surface-container rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 shadow-[0_0_8px_rgba(173,198,255,0.5)]" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Form Container */}
          <form onSubmit={handleSubmit} className="space-y-xl">
            {/* Step 1: Item Details */}
            {currentStep === 1 && (
              <div className="space-y-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  <div className="flex flex-col space-y-base">
                    <label className="text-label-sm font-semibold text-on-surface-variant px-1">Item Name</label>
                    <input 
                      type="text" 
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Ledger Nano X Silver"
                      className="bg-surface-container-low border border-outline-variant text-on-surface rounded-lg p-md focus:ring-0" 
                    />
                  </div>

                  <div className="flex flex-col space-y-base">
                    <label className="text-label-sm font-semibold text-on-surface-variant px-1">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-surface-container-low border border-outline-variant text-on-surface rounded-lg p-md focus:ring-0"
                    >
                      <option>Electronics</option>
                      <option>Wallets &amp; Keys</option>
                      <option>Bags &amp; Luggage</option>
                      <option>Jewelry</option>
                      <option>Documents</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-base">
                    <label className="text-label-sm font-semibold text-on-surface-variant px-1">Date Lost/Found</label>
                    <input 
                      type="date" 
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-surface-container-low border border-outline-variant text-on-surface rounded-lg p-md focus:ring-0" 
                    />
                  </div>

                  <div className="flex flex-col space-y-base">
                    <label className="text-label-sm font-semibold text-on-surface-variant px-1">Reward Amount (ETH)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        step="0.001"
                        min="0"
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                        placeholder="0.05"
                        className="w-full bg-surface-container-low border border-outline-variant text-on-surface rounded-lg p-md focus:ring-0 pr-16" 
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-code font-bold">ETH</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-base">
                    <label className="text-label-sm font-semibold text-on-surface-variant px-1">Location Details</label>
                    <input 
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. JFK Terminal 4 / Central Park Pavilion"
                      className="bg-surface-container-low border border-outline-variant text-on-surface rounded-lg p-md focus:ring-0"
                    />
                  </div>

                  <div className="flex flex-col space-y-base">
                    <label className="text-label-sm font-semibold text-on-surface-variant px-1">Serial Number / Unique Hash (Optional)</label>
                    <input 
                      type="text"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      placeholder="e.g. SN-9283-X9"
                      className="bg-surface-container-low border border-outline-variant text-on-surface rounded-lg p-md focus:ring-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-base">
                  <label className="text-label-sm font-semibold text-on-surface-variant px-1">Location Mapping Blueprint</label>
                  <div className="relative h-48 rounded-xl overflow-hidden border border-outline-variant group">
                    <div 
                      className="bg-cover bg-center w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" 
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKiK_N3XPzM9jFXdV-b2b5rJPW1OCevkMdnm_-yySl9QwOyhmbtHQTCxtar4HMncAM1ZSsdUNOkRU_EgZSkmdp26OtUX8DUbqH4G2-PTtZ1MTFGX8z10iLQXE3ETGw89DSgOjsYavcStUFenzDu3tPmreZ31iEaJIdAiAfAKa2jwWeYakuMJu30gSqzxNRgk39lH3BwuTTH74BP8M7jfFM5nWE35kR8kK3HY1sQuPCqmcqzI-p2ZeG')" }}
                    />
                    <div className="absolute inset-0 bg-background/20 pointer-events-none" />
                    <div className="absolute top-4 left-4 glass-panel px-md py-2 rounded-lg flex items-center space-x-2">
                      <MapPin className="text-primary w-4 h-4" />
                      <span className="text-label-sm font-bold">Select on Map (Secured GPS Hash)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Media */}
            {currentStep === 2 && (
              <div className="space-y-lg">
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center space-y-md bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer min-h-[220px]">
                  <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center">
                    <UploadCloud className="text-primary w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-body-lg font-bold">Drag and drop item photos</p>
                    <p className="text-on-surface-variant text-label-sm">Support for JPG, PNG, up to 10MB each</p>
                  </div>
                  <button 
                    type="button"
                    className="bg-surface-variant text-on-surface px-lg py-2 rounded-lg font-bold text-label-sm hover:bg-outline-variant transition-colors"
                  >
                    Browse Files
                  </button>
                </div>

                <div className="flex flex-col space-y-base">
                  <label className="text-label-sm font-semibold text-on-surface-variant px-1">Mock Upload Demo URL (Simulated IPFS/JSON Metadata)</label>
                  <input 
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or Google Image Link"
                    className="bg-surface-container-low border border-outline-variant text-on-surface rounded-lg p-md focus:ring-0"
                  />
                  <span className="text-[11px] text-on-surface-variant opacity-70">
                    Provide an image link to show on the dashboard, otherwise a beautiful mock asset is assigned automatically.
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: Blockchain Submission */}
            {currentStep === 3 && (
              <div className="space-y-lg">
                <div className="glass p-lg rounded-xl border-l-4 border-l-secondary">
                  <div className="flex items-start space-x-md">
                    <CheckCircle2 className="text-secondary w-5 h-5 mt-1" />
                    <div>
                      <h4 className="font-bold text-on-surface">Immutable Verification Anchor</h4>
                      <p className="text-on-surface-variant text-label-sm">
                        Your submission will be hashed and signed by your connected wallet. This record cannot be altered or removed from the ledger.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container p-lg rounded-xl border border-outline-variant space-y-md">
                  <h4 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Review Transaction Blueprint
                  </h4>
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/30 text-label-sm">
                    <span className="text-on-surface-variant">Protocol Fee</span>
                    <span className="font-code font-bold">0.0010 ETH</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/30 text-label-sm">
                    <span className="text-on-surface-variant">Reward Stake Escrow</span>
                    <span className="font-code font-bold">{reward} ETH</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-bold text-body-lg">
                    <span className="text-primary">Total Est. Gas</span>
                    <span className="text-primary font-code">~ {(parseFloat(reward) + 0.0024).toFixed(4)} ETH</span>
                  </div>
                </div>

                <div className="flex items-center space-x-base p-md rounded-lg bg-primary-container/10 border border-primary/20 text-label-sm text-on-surface-variant">
                  <Info className="text-primary w-4 h-4 mr-2" />
                  <span>Estimated transaction mining time: &lt; 15 seconds</span>
                </div>
              </div>
            )}

            {/* Form Controls */}
            <div className="flex justify-between pt-xl">
              <button 
                type="button"
                onClick={handleBack}
                className={`px-lg py-3 rounded-lg font-bold text-label-sm border border-outline-variant text-on-surface hover:bg-surface-variant transition-all ${
                  currentStep === 1 ? 'invisible' : 'visible'
                }`}
              >
                Back
              </button>

              {currentStep < 3 ? (
                <button 
                  type="button"
                  onClick={handleNext}
                  className="px-xl py-3 rounded-lg font-bold text-label-sm bg-primary text-on-primary hover:brightness-110 active:scale-95 transition-all glow-primary flex items-center space-x-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  {isConnected ? (
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-xl py-3 rounded-lg font-bold text-label-sm bg-primary text-on-primary hover:brightness-110 active:scale-95 transition-all glow-primary flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Anchoring to Chain...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit to Blockchain</span>
                          <LinkIcon className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={connectWallet}
                      className="px-xl py-3 rounded-lg font-bold text-label-sm bg-secondary text-on-secondary hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2"
                    >
                      <span>Connect Wallet to Submit</span>
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </div>

        {/* Right Side: Status/Guidance */}
        <div className="lg:w-80 space-y-lg shrink-0">
          <div className="glass-panel p-lg rounded-xl space-y-md">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <CheckCircle2 className="text-primary w-5 h-5" />
              <span>Chain Protocol</span>
            </h3>
            <div className="space-y-base text-label-sm text-on-surface-variant leading-relaxed">
              <div className="flex gap-3">
                <span className="text-secondary">•</span>
                <p>Data is stored inside decentralized JSON schemas synced via IPFS.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-secondary">•</span>
                <p>Ethereum signature verifies origin.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-secondary">•</span>
                <p>State transition maps to immutable block logs.</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-lg rounded-xl space-y-md">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <ShieldAlert className="text-tertiary w-5 h-5" />
              <span>Escrow Stake</span>
            </h3>
            <div className="space-y-base text-label-sm text-on-surface-variant leading-relaxed">
              <div className="flex gap-3">
                <span className="text-tertiary">•</span>
                <p>Staked rewards are locked inside smart contract escrow until item recovery is validated.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-tertiary">•</span>
                <p>In case of disputes, validators verify evidence to release stakes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
