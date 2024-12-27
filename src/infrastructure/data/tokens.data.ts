// env imports
import networkEnv from '../../domain/env/network.env';
import ethersEnv from '../../domain/env/ethers.env';

// image imports
import BNBImage from '../../presentation/assets/images/tokens/bnb.png';
import USDTImage from '../../presentation/assets/images/tokens/usdt.png';
import SHIFIImage from '../../presentation/assets/images/tokens/shifi.png';

const tokens = {
	[networkEnv.bscId]: [
		{ name: 'BNB', symbol: BNBImage, contract: null, decimal: 18 },
		{ name: 'USDT', symbol: USDTImage, contract: ethersEnv.usdtBscContractAddress, decimal: 18 },
		{ name: 'MINER', symbol: SHIFIImage, contract: ethersEnv.shifiBsc, decimal: 18 },
	],
	[networkEnv.matchId]: [
		{ name: 'BNB', symbol: BNBImage, contract: null, decimal: 18 },
		{ name: 'USDT', symbol: USDTImage, contract: ethersEnv.usdtMatchContractAddress, decimal: 6 },
		{ name: 'MINER', symbol: SHIFIImage, contract: ethersEnv.shifiMatch, decimal: 18 },
	],
};

export default tokens;
