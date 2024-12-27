// service imports
import { getWalletProvider } from '../../ethers.service';

// ethers imports
import { BrowserProvider, Contract, formatEther, formatUnits, parseUnits } from 'ethers';
import { TransactionResponse, JsonRpcSigner } from 'ethers/providers';

// metadata imports
import TokenERC20MetaData from '../../../../domain/metadata/TokenERC20.json';

export const balanceOfEther = async (account: string): Promise<string> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const balance: bigint = await ethersProvider.getBalance(account);

	return formatEther(balance);
};

export const balanceOf = async (account: string, address: string): Promise<string> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, TokenERC20MetaData.abi, signer);

	const decimals: bigint = await contract.decimals();
	const balance: bigint = await contract.balanceOf(account);

	return formatUnits(balance, Number(decimals));
};

export const allowance = async (
	owner: string,
	spender: string,
	address: string,
): Promise<number> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, TokenERC20MetaData.abi, signer);

	const decimals: bigint = await contract.decimals();
	const allowanceAmount: bigint = await contract.allowance(owner, spender);

	return Number(formatUnits(allowanceAmount, Number(decimals)));
};

export const decimals = async (address: string): Promise<number> => {
  const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
  const signer: JsonRpcSigner = await ethersProvider.getSigner();

  const contract: Contract = new Contract(address, TokenERC20MetaData.abi, signer);

  const decimals: bigint = await contract.decimals();

  return Number(decimals);
};

export const approve = async (spender: string, value: string, address: string): Promise<void> => {
	const ethersProvider: BrowserProvider = new BrowserProvider(getWalletProvider());
	const signer: JsonRpcSigner = await ethersProvider.getSigner();

	const contract: Contract = new Contract(address, TokenERC20MetaData.abi, signer);
	const decimals: bigint = await contract.decimals();

	const tx: TransactionResponse = await contract.approve(
		spender,
		parseUnits(value, Number(decimals)),
	);
	await tx.wait();
};
