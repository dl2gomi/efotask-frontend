import { useState, useEffect } from 'react';
import {
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  formatUnits,
  getAddress,
  parseUnits,
  Signer,
  Eip1193Provider,
  BaseContract,
  Numeric,
} from 'ethers';
import VaultABI from '../contracts/efoVault.abi.json';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

// interface IVaultContract extends Contract {
//   getOwner(): Promise<string>;
//   // getTokenPrice: () => Promise<number>;
//   // getMaxSupply: () => Promise<number>;
//   // getRole: (address: string) => Promise<string>;
//   // setTokenDetails: (maxSupply: number, tokenPrice: number) => Promise<any>;
//   // isStarted: () => Promise<boolean>;
//   // startVault: () => Promise<any>;
//   // invest: (amount: number) => Promise<any>;
//   // addCEO: (address: string) => Promise<any>;
//   // removeCEO: (address: string) => Promise<any>;
//   // addOperator: (address: string) => Promise<any>;
//   // removeOperator: (address: string) => Promise<any>;
//   // getCEOAddresses: () => Promise<string[]>;
//   // getOperatorAddresses: () => Promise<string[]>;
//   // withdraw: (address: string, amount: number) => Promise<any>;
//   // getProfitPool: () => Promise<number>;
//   // getInvestors: () => Promise<string[]>;
//   // getLastInvestedAt: (address: string) => Promise<number>;
//   // getTaxYears: () => Promise<number[]>;
//   // depositProfit: (taxYear: number, amount: number) => Promise<any>;
//   // uploadTaxDoc: (taxYear: number, cid: string, amount: number) => Promise<any>;
//   // getTaxDetail: (year: number) => Promise<any>;
//   // getProfitClaimedAt: (address: string, year?: number) => Promise<number | null>;
//   // claimProfit: (year?: number) => Promise<any>;
//   // listAllClaims?: (address?: string) => any;
//   // getProfitAmount: (address: string, year?: number) => Promise<number>;
// }

export const useVault = () => {
  const [contract, setContract] = useState<any>(null);
  const { isConnected } = useAppKitAccount();
  const [signer, setSigner] = useState<Signer | null>(null);
  const { walletProvider } = useAppKitProvider<Eip1193Provider>('eip155');

  if (!window.ethereum) throw new Error('No wallet found');

  useEffect(() => {
    const loadContract = async () => {
      const provider = walletProvider
        ? new BrowserProvider(walletProvider)
        : new JsonRpcProvider(import.meta.env.VITE_DEFAULT_RPC_URL);
      const readonlyContract = new Contract(import.meta.env.VITE_ERC20_EFOVAULT_ADDRESS, VaultABI, provider);
      setContract(readonlyContract);

      if (isConnected && walletProvider) {
        const signer = await provider.getSigner();
        const tokenContract = readonlyContract.connect(signer);
        setSigner(signer);
        setContract(tokenContract);
      }
    };

    if (window.ethereum) loadContract();
  }, [isConnected, walletProvider, window.ethereum]);

  const getOwner = async () => {
    if (!contract) return null;

    return await contract.owner();
  };

  const getBalance = async () => {
    if (!contract) return null;

    return await contract.contractBalance();
  };

  const deposit = async (amount: string) => {
    if (!contract) return;
    if (!isConnected) return;

    try {
      // Send the transaction to set the field
      const tx = await contract.deposit(parseUnits(amount, 6));

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log('Transaction successful:', receipt.transactionHash ?? receipt.hash);
      return receipt;
    } catch (error) {
      console.error('Error depositing:');
      throw error;
    }
  };

  const withdrawWithSignature = async (amount: string, nonce: Numeric, signature: string) => {
    if (!contract) return;
    if (!isConnected) return;

    try {
      const tx = await contract.withdrawWithSignature(parseUnits(amount, 6), nonce, signature);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log('Transaction successful:', receipt.transactionHash ?? receipt.hash);
      return receipt;
    } catch (error) {
      console.error('Error withdrawing with signature:');
      throw error;
    }
  };

  const adminWithdraw = async (amount: string) => {
    if (!contract) return;
    if (!isConnected) return;

    try {
      // Send the transaction to set the field
      const tx = await contract.adminWithdraw(parseUnits(amount, 6));

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log('Transaction successful:', receipt.transactionHash ?? receipt.hash);
      return receipt;
    } catch (error) {
      console.error('Error admin withdrawing:');
      throw error;
    }
  };

  const addAdmin = async (address: string) => {
    if (!contract) return;
    if (!isConnected) return;

    try {
      // Send the transaction to set the field
      const tx = await contract.addAdmin(address);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log('Transaction successful:', receipt.transactionHash ?? receipt.hash);
      return receipt;
    } catch (error) {
      console.error('Error adding Admin address:');
      throw error;
    }
  };

  const removeAdmin = async (address: string) => {
    if (!contract) return;
    if (!isConnected) return;

    try {
      // Send the transaction to set the field
      const tx = await contract.removeAdmin(address);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log('Transaction successful:', receipt.transactionHash ?? receipt.hash);
      return receipt;
    } catch (error) {
      console.error('Error removing Admin address:');
      throw error;
    }
  };

  const updateBackendSigner = async (address: string) => {
    if (!contract) return;
    if (!isConnected) return;

    try {
      // Send the transaction to set the field
      const tx = await contract.updateBackendSigner(address);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log('Transaction successful:', receipt.transactionHash ?? receipt.hash);
      return receipt;
    } catch (error) {
      console.error('Error updating backend signer:');
      throw error;
    }
  };

  return {
    signer,
    contract,
    getOwner,
    getBalance,
    deposit,
    withdrawWithSignature,
    adminWithdraw,
    addAdmin,
    removeAdmin,
    updateBackendSigner,
  };
};
