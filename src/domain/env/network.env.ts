const bscId = Number(import.meta.env.VITE_BSC_ID);
const matchId = Number(import.meta.env.VITE_MATCH_ID);

const bscRpc = import.meta.env.VITE_BSC_RPC;
const matchRpc = import.meta.env.VITE_MATCH_RPC;

export default {
	bscId,
	matchId,
	bscRpc,
	matchRpc,
};
