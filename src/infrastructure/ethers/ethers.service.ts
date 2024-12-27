// config imports
import ethersEnv from '../../domain/env/ethers.env';
import networkEnv from '../../domain/env/network.env';

// web3modal imports
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// ethers imports
import { Eip1193Provider } from 'ethers/providers';

const projectId = ethersEnv.wcProjectId;

const match = {
	chainId: Number(networkEnv.matchId),
	explorerUrl: 'https://matchscan.io/',
  	currency: 'MATCH',
  	name: 'Match Chain',
	rpcUrl: networkEnv.matchRpc,
};

const bsc = {
	chainId: Number(networkEnv.bscId),
	name: 'BNB Smart Chain',
	currency: 'BNB',
	explorerUrl: 'https://bscscan.com',
	rpcUrl: networkEnv.bscRpc,
};

const metadata = {
	name: 'Shine Sale',
	description: 'Shine Sale Token',
	url: 'https://www.shinegamefi.com/',
	icons: ['https://www.shinegamefi.com/'],
};

const config = defaultConfig({
	metadata,
	enableEIP6963: true,
	enableInjected: true,
	enableCoinbase: true,
});

const web3Modal = createWeb3Modal({
	ethersConfig: config,
	chains: [match, bsc],
	projectId,
	themeMode: 'dark',
	enableAnalytics: false,
	enableOnramp: true,
	chainImages: {
		56: '',
		698: 'https://matchscan.io/assets/configs/network_icon.svg',
	},
});

export const getWalletProvider = (): Eip1193Provider => {
	const provider: Eip1193Provider | undefined = web3Modal.getWalletProvider();
	if (!provider) {
		throw new Error('Wallet provider not initialized');
	}

	return provider;
};
