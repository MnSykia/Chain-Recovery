export type ItemType = 'LOST' | 'FOUND';
export type ItemStatus = 'REPORTED' | 'CLAIMED' | 'VERIFIED' | 'RECOVERED';

export interface Message {
  sender: 'finder' | 'claimant';
  message: string;
  timestamp: string;
}

export interface Claim {
  id: string;
  claimant: string;
  claimantName: string;
  claimantAvatar: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  conversation?: Message[];
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ItemType;
  status: ItemStatus;
  location: string;
  date: string;
  reward: string;
  image: string;
  reporter: string;
  resolver?: string;
  serialNumber?: string;
  trustScore?: number;
  claims: Claim[];
}
