// service imports
import { getWalletProvider } from '../../ethers.service';

// ethers imports
import { BrowserProvider, Contract, formatEther, formatUnits, parseEther, parseUnits } from 'ethers';
import { TransactionResponse, JsonRpcSigner } from 'ethers/providers';

// service imports
import { allowance, approve, decimals } from '../token-erc-20/token-erc-20.service';

// metadata imports
import ShineGameFiPresaleMetaData from '../../../../domain/metadata/ShineGameFiPresale.json';

export const firstStagebalances = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());

	const signer: JsonRpcSigner = await ethersProvider.getSigner();
	const account: string = await signer.getAddress();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);
	const balance: bigint = await contract.firstStagebalances(account);

	return Number(formatEther(balance));
};

export const lastClaimTime = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const account: string = await signer.getAddress();
	const lastClaim: bigint = await contract.lastClaimTime(account);

	return Number(lastClaim);
};

export const buyerClaims = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const account: string = await signer.getAddress();
	const numClaims: bigint = await contract.buyerClaims(account);

	return Number(numClaims);
};

export const maxClaims = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const day: bigint = await contract.maxClaims();

	return Number(day);
};

export const claimDay = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const day: bigint = await contract.claimDay();

	return Number(day);
};

export const firstStageClaimDate = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const date: bigint = await contract.firstStageClaimDate();

	return Number(date);
};

export const secondStageClaimDate = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const date: bigint = await contract.secondStageClaimDate();

	return Number(date);
};

export const calculateClaimableAmount = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const account: string = await signer.getAddress();
	const claimableAmount: bigint = await contract.calculateClaimableAmount(account);

	return Number(formatEther(claimableAmount));
};

export const tokenBalanceAvailableForPurchase = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const value: bigint = await contract.tokenBalanceAvailableForPurchase();

	return Number(formatEther(value));
};

export const tokenPerUSDT = async (address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const value: bigint = await contract.tokenPerUSDT();

	return Number(formatEther(value));
};

export const etherToUSDT = async (amount: string, address: string): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);
	const usdtAddress: string = await contract.usdt();

	const value: bigint = await contract.etherToUSDT(String(parseEther(amount)));
	const decimal = await decimals(usdtAddress);

	return Number(formatUnits(value, decimal));
};

export const buyTokensByEther = async (amount: string, address: string): Promise<void> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const tx: TransactionResponse = await contract.buyTokensByEther({ value: parseEther(amount) });
	await tx.wait();
};

export const buyTokensByUSDT = async (amount: string, address: string): Promise<void> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());

	const signer: JsonRpcSigner = await ethersProvider.getSigner();
	const account: string = await signer.getAddress();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);
	const usdtAddress: string = await contract.usdt();

	const allowanceAmount = await allowance(account, address, usdtAddress);
	const decimal = await decimals(usdtAddress);

	if (Number(amount) > allowanceAmount) await approve(address, amount, usdtAddress);
 	
	const tx: TransactionResponse = await contract.buyTokensByUSDT(parseUnits(amount, decimal));
	await tx.wait();
};

export const claimFirstStage = async (address: string): Promise<void> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const tx: TransactionResponse = await contract.claimFirstStage();
	await tx.wait();
};

export const claim = async (address: string): Promise<void> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, ShineGameFiPresaleMetaData.abi, signer);

	const tx: TransactionResponse = await contract.claim();
	await tx.wait();
};
