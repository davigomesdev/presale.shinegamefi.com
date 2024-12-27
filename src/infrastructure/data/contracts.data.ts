// env imports
import networkEnv from '../../domain/env/network.env';
import ethersEnv from '../../domain/env/ethers.env';

const contracts = {
	[networkEnv.bscId]: ethersEnv.shineGameFiBscPresaleAddress,
	[networkEnv.matchId]: ethersEnv.shineGameFiMatchPresaleAddress,
};

export default contracts;
