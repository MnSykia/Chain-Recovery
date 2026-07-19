"use client";

import React from 'react';
import { Item } from '../types';
import { MapPin, Calendar, ArrowRight, Laptop, Wallet, Key, FileText, Lock, Share2, Plus, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ItemCardProps {
  item: Item;
  onClaimClick?: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onClaimClick }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return <Laptop className="w-5 h-5" />;
      case 'wallets':
      case 'wallets & keys':
        return <Wallet className="w-5 h-5" />;
      case 'keys':
        return <Key className="w-5 h-5" />;
      case 'documents':
        return <FileText className="w-5 h-5" />;
      default:
        return <Laptop className="w-5 h-5" />;
    }
  };

  const isLost = item.type === 'LOST';

  return (
    <div 
      className={`glass-panel rounded-xl overflow-hidden flex flex-col border-t-2 ${
        isLost 
          ? 'border-t-tertiary status-glow-lost' 
          : 'border-t-secondary status-glow-found'
      } group cursor-pointer hover:border-outline transition-all duration-300`}
    >
      {/* Card Header Media */}
      <div className="h-48 w-full relative">
        <div 
          className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
          style={{ backgroundImage: `url('${item.image}')` }}
        />
        <div className="absolute top-md left-md">
          <span 
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${
              isLost 
                ? 'bg-tertiary/10 border-tertiary/30 text-tertiary' 
                : 'bg-secondary/10 border-secondary/30 text-secondary'
            }`}
          >
            {isLost ? 'Lost Item' : 'Found Item'}
          </span>
        </div>

        {item.reward !== '0.00' && item.reward !== '0' && (
          <div className="absolute top-md right-md">
            <span className="bg-primary/20 border border-primary/40 text-primary px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md font-code">
              {item.reward} ETH
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-lg flex flex-col flex-1">
        <div className="flex justify-between items-start mb-sm">
          <h3 className="text-headline-md font-headline font-semibold text-on-surface line-clamp-1">
            {item.title}
          </h3>
          <span className={isLost ? 'text-tertiary' : 'text-secondary'}>
            {getCategoryIcon(item.category)}
          </span>
        </div>

        <p className="text-label-sm text-on-surface-variant line-clamp-2 mb-md min-h-[32px]">
          {item.description}
        </p>

        <div className="space-y-sm text-body-md text-on-surface-variant mb-md">
          <div className="flex items-center space-x-2 text-label-sm">
            <MapPin className="w-4 h-4 opacity-60 text-primary" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-label-sm">
            <Calendar className="w-4 h-4 opacity-60 text-primary" />
            <span>{isLost ? 'Lost' : 'Found'} {item.date}</span>
          </div>
        </div>

        {/* Card Footer actions */}
        <div className="mt-auto pt-md border-t border-outline-variant/30 flex items-center justify-between">
          {item.status === 'RECOVERED' ? (
            <div className="flex items-center space-x-2 text-secondary">
              <Sparkles className="w-4 h-4" />
              <span className="text-label-sm font-bold uppercase tracking-wider">Recovered</span>
            </div>
          ) : !isLost ? (
            // Found Item Page actions
            <>
              {item.status === 'VERIFIED' ? (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-label-sm font-bold text-secondary">Verified Owner</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-on-surface-variant/80">
                  <span className="text-label-sm font-bold">{item.claims.length} Claims Filed</span>
                </div>
              )}
              {item.status !== 'VERIFIED' && onClaimClick ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClaimClick(item);
                  }}
                  className="bg-secondary text-on-secondary px-4 py-1.5 rounded-lg text-label-sm font-bold hover:brightness-110 transition-all"
                >
                  Claim Item
                </button>
              ) : (
                <Link 
                  href={`/history/${item.id}`}
                  className="text-secondary text-label-sm font-semibold flex items-center hover:underline"
                >
                  View Details <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              )}
            </>
          ) : (
            // Lost Item Page actions
            <>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-variant flex items-center justify-center text-[9px] font-bold text-on-surface-variant font-code">0x</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-primary-container text-on-primary-container flex items-center justify-center text-[9px] font-bold font-code text-center">JD</div>
              </div>

              {item.status === 'CLAIMED' ? (
                <Link 
                  href={`/claims/${item.id}`}
                  className="text-tertiary text-label-sm font-semibold flex items-center hover:underline"
                >
                  View Claims <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              ) : onClaimClick ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClaimClick(item);
                  }}
                  className="text-tertiary text-label-sm font-semibold flex items-center group-hover:underline"
                >
                  I Found This <Plus className="ml-1 w-4 h-4" />
                </button>
              ) : (
                <Link 
                  href={`/history/${item.id}`}
                  className="text-tertiary text-label-sm font-semibold flex items-center hover:underline"
                >
                  View Timeline <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
