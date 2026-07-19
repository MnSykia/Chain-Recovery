# ChainRecovery 🛡️ - Blockchain Lost & Found System

ChainRecovery is a decentralized, secure, and production-ready **Blockchain Lost & Found System** built for hackathons and production deployments. It bridges physical item tracking with tamper-proof blockchain consensus, offering cryptographic claims, staked escrows, and a verifier-based history ledger.

The application is built using the **Next.js App Router**, **Tailwind CSS**, and **Ethers.js**, featuring a dual-mode integration that connects seamlessly to MetaMask or falls back gracefully to a fully interactive mock state for deployment testing and immediate judging evaluation.

---

## 🚀 Key Features

1. **Active Recovery Feed Dashboard**:
   - Tab-based navigation showing active "Lost" and "Found" item records.
   - Live query searching and responsive category filtering (Electronics, Wallets, Keys, Documents).
   
2. **Hybrid Wallet Connection**:
   - Detects `window.ethereum` and bridges to MetaMask or other Web3 wallets.
   - Dynamic UI dropdown displaying user balance, address, and network.
   - Automatically fallbacks to **ChainRecovery Local Mock** on static server platforms or during evaluation if a local node RPC is not configured.

3. **Multi-Step Structured Item Submission**:
   - Standardized 3-step item registration (Item Details -> Media Assets / IPFS mock upload -> Blockchain summary).
   - Securely computes gas and staking fees (ETH reward pools) for items.

4. **Claims & Verification Marketplace**:
   - Claimant registry hub where users submit details/descriptions to claim custody.
   - Smart contracts enable finders/reporters to approve or dispute claims.
   - Built-in mini conversations between finder and claimant.

5. **Lifecycle Timeline History**:
   - Chronological nodes logging checkpoints: `Reported` -> `Claimed` -> `Verified` (consensus achieved) -> `Recovered`.
   - Handshake escrow release paying out reward pool stakes immediately.

---

## 🛠️ Architecture & Technology Stack

- **Frontend Core**: React 18 / Next.js 14 App Router.
- **Styling**: Tailwind CSS with custom glassmorphism panels, dark mode defaults, and status glow animations imported from Google Stitch layout blueprints.
- **Icons**: Lucide React.
- **Smart Contract Layer**: Solidity contract `contracts/ChainRecovery.sol` defining immutable states, custom errors (`Unauthorized`, `InvalidState`), and events for items, claims, consensus, and stake escrow withdrawals.
- **Web3 Integration**: Ethers.js for wallet signers, address formatting, and providers.
- **Effects**: `canvas-confetti` celebrations on successful claims and stake releases.

---

## 📁 Repository Structure

```text
f:\Lost and Found\
├── src\
│   ├── app\
│   │   ├── layout.tsx             # Root layout wrapping Web3 Context and dashboard shell
│   │   ├── page.tsx               # Feed page with category filters & claim submission modal
│   │   ├── report\
│   │   │   └── page.tsx           # Multi-step Report Item form
│   │   ├── claims\
│   │   │   └── [id]\
│   │   │       └── page.tsx       # Claim verification details & actions
│   │   ├── history\
│   │   │   └── [id]\
│   │   │       └── page.tsx       # Lifecycle tracking & escrow release handshake
│   │   └── globals.css            # Global CSS style declarations
│   ├── components\
│   │   ├── Sidebar.tsx            # Left category filter sidebar
│   │   ├── TopNavBar.tsx          # Dynamic header with connect/disconnect actions
│   │   └── ItemCard.tsx           # Individual card renderer
│   ├── context\
│   │   └── Web3Context.tsx        # Wallet state manager with localStorage persistence
│   ├── data\
│   │   └── mockData.ts            # High-fidelity mock seed database
│   └── types\
│       └── index.ts               # Shared types for items, claims, and messages
├── contracts\
│   └── ChainRecovery.sol          # Solc compiler compatible smart contract code
├── .env.example                   # Local and testnet env configuration template
├── tailwind.config.js             # Styling configuration mapping colors & fonts
├── tsconfig.json                  # Strict TypeScript compiler options
├── package.json                   # Project packages & command scripts
└── README.md                      # Presentation documentation
```

---

## 🏎️ Getting Started

### Prerequisites

You need **Node.js** and **npm** installed on your system.

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Copy the configuration file:
   ```bash
   cp .env.example .env.local
   ```

3. Launch the local Next.js development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to test.

### Production Build

Verify production builds compile without error:
```bash
npm run build
```

---

## 📜 Smart Contract Logic (`contracts/ChainRecovery.sol`)

The contract controls items, claims, and rewards:
- **`reportItem`**: Registers an item with specific categories, locations, and optional reward stakes (deposited in ETH escrow).
- **`submitClaim`**: Claimant submits physical description proofs. Transitions item state to `CLAIMED`.
- **`verifyClaim`**: Reporter/Finder validates proof details. Marks claim approved and shifts status to `VERIFIED`.
- **`confirmRecovery`**: Owner/Claimant confirms physical handover. Transfers locked escrow stake rewards to the finder, transitions status to `RECOVERED`.
