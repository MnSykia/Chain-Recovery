// src/hooks/useChainRecovery.ts
import { useWeb3 } from '@/context/Web3Context';
import { useCallback } from 'react';
import { ethers } from 'ethers';

// Types that match your contract (add more if needed)
export interface Claim {
    id: ethers.BigNumber;
    owner: string;
    status: number; // 0 = Lost, 1 = Found (example)
    title: string;
    description: string;
    // …add other fields matching the Solidity struct
}

export const useChainRecovery = () => {
    const { contract, signer } = useWeb3();

    /** Get a claim by its numeric ID */
    const getClaim = useCallback(
        async (claimId: number | string): Promise<Claim | null> => {
            if (!contract) {
                console.warn('Contract not initialized yet');
                return null;
            }
            try {
                // Assuming your contract has a `getClaim(uint256)` view function
                const raw = await contract.getClaim(claimId);
                // Map the raw tuple to a friendly object
                return {
                    id: raw.id,
                    owner: raw.owner,
                    status: raw.status,
                    title: raw.title,
                    description: raw.description,
                };
            } catch (e) {
                console.error('Failed to fetch claim', e);
                return null;
            }
        },
        [contract]
    );

    /** Submit a new claim (lost/found) */
    const reportItem = useCallback(
        async (title: string, description: string, status: number) => {
            if (!contract || !signer) {
                throw new Error('Wallet not connected');
            }
            const tx = await contract
                .connect(signer)
                .reportItem(title, description, status);
            await tx.wait(); // wait for mining
            return tx;
        },
        [contract, signer]
    );

    return { getClaim, reportItem };
};
