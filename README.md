# ChainRecovery 🛡️
### A Blockchain-Powered Lost & Found System

ChainRecovery is a modern lost and found platform that uses blockchain to make the recovery process more transparent, secure, and trustworthy. Instead of relying on centralized records that can be modified or lost, every important action—from reporting an item to verifying ownership—is recorded on-chain.

The project was built with **Next.js**, **Tailwind CSS**, **Ethers.js**, and **Solidity**, making it suitable both as a hackathon prototype and as a foundation for a production-ready application.

One of the goals behind ChainRecovery was accessibility. If a Web3 wallet such as MetaMask is available, the application connects automatically. If not, it seamlessly switches to a fully interactive mock environment, allowing anyone to explore every feature without needing a blockchain network.

---

## Features

### Browse Lost & Found Items

The home dashboard provides a clean feed of both lost and found reports. Users can:

- Switch between Lost and Found listings
- Search items instantly
- Filter by categories such as:
  - Electronics
  - Wallets
  - Keys
  - Documents

Everything updates dynamically to make finding an item as quick as possible.

---

### Wallet Support with Automatic Fallback

ChainRecovery works whether you're connected to Web3 or not.

- Connects automatically to MetaMask or any compatible wallet
- Displays wallet address, balance, and current network
- Falls back to a local mock blockchain when no wallet or RPC is available

This makes the project easy to demonstrate during hackathons while remaining ready for real blockchain deployment.

---

### Guided Item Reporting

Reporting an item is intentionally simple.

The process is divided into three clear steps:

1. Item details
2. Image / media upload (mock IPFS integration)
3. Blockchain summary before submission

If a reward is offered, the application also estimates gas costs and staking values before the transaction is submitted.

---

### Secure Claim Verification

Finding an item is only half the process.

ChainRecovery includes a complete claim workflow where users can:

- Submit ownership claims
- Describe identifying characteristics
- Communicate with the finder
- Receive approval or rejection through the verification process

This reduces fraudulent claims while keeping the recovery process transparent.

---

### Complete Item History

Every item includes a visual timeline showing its entire journey:

```
Reported
    ↓
Claimed
    ↓
Verified
    ↓
Recovered
```

Once recovery is confirmed, escrow rewards are released automatically according to the smart contract rules.

---

## 🛠 Tech Stack

**Frontend**

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Lucide React Icons

**Blockchain**

- Solidity
- Ethers.js

**UI & Experience**

- Responsive interface
- Glassmorphism design
- Dark mode
- Animated status indicators
- Confetti celebrations for successful recoveries

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── report/
│   ├── claims/
│   ├── history/
│   └── globals.css
│
├── components/
│   ├── Sidebar.tsx
│   ├── TopNavBar.tsx
│   └── ItemCard.tsx
│
├── context/
│   └── Web3Context.tsx
│
├── data/
│   └── mockData.ts
│
└── types/
    └── index.ts

contracts/
└── ChainRecovery.sol

.env.example
package.json
tailwind.config.js
tsconfig.json
README.md
```

---

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js
- npm

### Installation

Install the project dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

---

### Production Build

To verify that everything compiles correctly:

```bash
npm run build
```

---

## 📜 Smart Contract Overview

The `ChainRecovery.sol` contract manages the complete lifecycle of an item.

### `reportItem()`

Creates a new lost or found report and stores the associated metadata on-chain. If a reward is specified, the ETH is locked in escrow.

### `submitClaim()`

Allows someone to claim ownership by providing identifying information. The item's status changes to **CLAIMED**.

### `verifyClaim()`

The original reporter or finder reviews the submitted evidence and either approves or rejects the claim. Approved claims move to the **VERIFIED** stage.

### `confirmRecovery()`

Once the item has been successfully returned, recovery is confirmed on-chain. The escrowed reward is automatically transferred to the finder, and the item's final status becomes **RECOVERED**.

---

## 🎯 Why ChainRecovery?

Most lost-and-found systems rely on trust alone. Records can be edited, ownership disputes are difficult to resolve, and reward payments often happen outside the platform.

ChainRecovery addresses these problems by combining a familiar user experience with blockchain-backed transparency. Every report, claim, verification, and reward payment follows a clear, verifiable trail, giving both owners and finders greater confidence throughout the recovery process.
