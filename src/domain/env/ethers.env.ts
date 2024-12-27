const wcProjectId = import.meta.env.VITE_WC_PROJECT_ID as string;

const shifiBsc = import.meta.env.VITE_MINER_BSC as string;
const shifiMatch = import.meta.env.VITE_MINER_MATCH as string;

const usdtBscContractAddress = import.meta.env.VITE_USDT_BSC_CONTRACT_ADDRESS as string;
const usdtMatchContractAddress = import.meta.env.VITE_USDT_MATCH_CONTRACT_ADDRESS as string;

const shineGameFiBscPresaleAddress = import.meta.env
	.VITE_MINER_BSC_PRESALE_CONTRACT_ADDRESS as string;
const shineGameFiMatchPresaleAddress = import.meta.env
	.VITE_MINER_MATCH_PRESALE_CONTRACT_ADDRESS as string;

export default {
	wcProjectId,
	shifiBsc,
	shifiMatch,
	usdtBscContractAddress,
	usdtMatchContractAddress,
	shineGameFiBscPresaleAddress,
	shineGameFiMatchPresaleAddress,
};
