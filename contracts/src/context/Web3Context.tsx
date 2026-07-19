// src/context/Web3Context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ethers } from 'ethers';
import ChainRecoveryABI from '@/contracts/ChainRecovery.json';

interface Web3ContextProps {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  address: string | null;
  contract: ethers.Contract | null;
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextProps | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  // ---- wallet connection -------------------------------------------------
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const eth = (window as any).ethereum;
      try {
        await eth.request({ method: 'eth_requestAccounts' });
        const prov = new ethers.providers.Web3Provider(eth);
        const sign = prov.getSigner();
        const addr = await sign.getAddress();

        setProvider(prov);
        setSigner(sign);
        setAddress(addr);
      } catch (e) {
        console.error('Wallet connection failed', e);
      }
    } else {
      // ---- mock provider (dev mode) ---------------------------------------
      const mockProvider = new ethers.providers.JsonRpcProvider(
        // Public Alchemy Goerli endpoint – replace with your own later
        'https://eth-goerli.alchemyapi.io/v2/demo'
      );
      const mockSigner = mockProvider.getSigner();
      const mockAddr = '0xMockAddress0000000000000000000000';

      setProvider(mockProvider as any);
      setSigner(mockSigner);
      setAddress(mockAddr);
    }
  };

  // ---- contract instance --------------------------------------------------
  useEffect(() => {
    if (provider) {
      // Replace with the actual deployed contract address later
      const contractAddress = '0xYourContractAddressHere';
      const ctr = new ethers.Contract(contractAddress, ChainRecoveryABI, provider);
      setContract(ctr);
    }
  }, [provider]);

  // Auto‑connect on mount (makes the UI instantly show a wallet address)
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <Web3Context.Provider
      value={{ provider, signer, address, contract, connectWallet }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error('useWeb3 must be used within Web3Provider');
  return ctx;
};
