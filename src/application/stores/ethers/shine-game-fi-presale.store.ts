// zustand imports
import { create } from 'zustand';

// env imports
import ethersEnv from '../../../domain/env/ethers.env';

// byd cars service imports
import * as ShineGameFiPresale from '../../../infrastructure/ethers/services/shine-game-fi-presale/shine-game-fi-presale.service';

type State = {
	address: string;
	balance: number;
	firstStagebalances: number;
	claimDay: number;
	firstStageClaimDate: number;
	secondStageClaimDate: number;
	maxClaims: number;
	numClaims: number;
	lastClaimTime: number;
	claimableAmount: number | null;
	tokenPerUSDT: number;
	etherPerUSDT: number;
	success: boolean;
	error: string | null;
	isLoading: boolean;
};

type Actions = {
	getClaimData: () => void;
	getFirstStagebalances: () => void;
	getFirstStageClaimDate: () => void;
	getSecondStageClaimDate: () => void;
	getTokenBalanceAvailableForPurchase: () => void;
	getTokenPerUSDT: () => void;
	getEtherToUSDT: () => void;
	setAddress: (presale: string) => void;
	buyTokensByEther: (amount: string) => void;
	buyTokensByUSDT: (amount: string) => void;
	claimFirstStage: () => void;
	claim: () => void;
	reset: () => void;
};

const initialState: State = {
	balance: 0,
	firstStagebalances: 0,
	claimDay: 10,
	firstStageClaimDate: 0,
	secondStageClaimDate: 0,
	maxClaims: 6,
	numClaims: 0,
	lastClaimTime: 0,
	claimableAmount: null,
	address: ethersEnv.shineGameFiBscPresaleAddress,
	tokenPerUSDT: 0,
	etherPerUSDT: 0,
	success: false,
	error: null,
	isLoading: false,
};

export const useShineGameFiPresaleStore = create<State & Actions>((set, get) => {
	return {
		...initialState,
		getClaimData: async (): Promise<void> => {
			await ShineGameFiPresale.maxClaims(get().address)
				.then((maxClaims) => {
					set({
						maxClaims,
					});
				})
				.catch(() => {
					set({
						maxClaims: 6,
					});
				});
			await ShineGameFiPresale.buyerClaims(get().address)
				.then((numClaims) => {
					set({
						numClaims,
					});
				})
				.catch(() => {
					set({
						numClaims: 0,
					});
				});
			await ShineGameFiPresale.claimDay(get().address)
				.then((claimDay) => {
					set({
						claimDay,
					});
				})
				.catch(() => {
					set({
						claimDay: 10,
					});
				});
			await ShineGameFiPresale.calculateClaimableAmount(get().address)
				.then((claimableAmount) => {
					set({
						claimableAmount,
					});
				})
				.catch(() => {
					set({
						claimableAmount: 0,
					});
				});

			await ShineGameFiPresale.lastClaimTime(get().address)
				.then((lastClaimTime) => {
					set({
						lastClaimTime,
					});
				})
				.catch(() => {
					set({
						lastClaimTime: 0,
					});
				});
		},
		getFirstStageClaimDate: async (): Promise<void> => {
			await ShineGameFiPresale.firstStageClaimDate(get().address)
				.then((firstStageClaimDate) => {
					set({
						firstStageClaimDate,
					});
				})
				.catch(() => {
					set({
						firstStageClaimDate: 0,
					});
				});
		},
		getFirstStagebalances: async (): Promise<void> => {
			await ShineGameFiPresale.firstStagebalances(get().address)
				.then((firstStagebalances) => {
					set({
						firstStagebalances,
					});
				})
				.catch(() => {
					set({
						firstStagebalances: 0,
					});
				});
		},
		getSecondStageClaimDate: async (): Promise<void> => {
			await ShineGameFiPresale.secondStageClaimDate(get().address)
				.then((secondStageClaimDate) => {
					set({
						secondStageClaimDate,
					});
				})
				.catch(() => {
					set({
						secondStageClaimDate: 0,
					});
				});
		},
		getTokenBalanceAvailableForPurchase: async (): Promise<void> => {
			await ShineGameFiPresale.tokenBalanceAvailableForPurchase(get().address)
				.then((balance) => {
					set({
						balance,
					});
				})
				.catch(() => {
					set({
						balance: 0,
					});
				});
		},
		getTokenPerUSDT: async (): Promise<void> => {
			await ShineGameFiPresale.tokenPerUSDT(get().address)
				.then((tokenPerUSDT) => {
					set({
						tokenPerUSDT: tokenPerUSDT,
					});
				})
				.catch(() => {
					set({
						tokenPerUSDT: 0,
					});
				});
		},
		getEtherToUSDT: async (): Promise<void> => {
			await ShineGameFiPresale.etherToUSDT('1', get().address)
				.then((etherPerUSDT) => {
					set({
						etherPerUSDT: etherPerUSDT,
					});
				})
				.catch(() => {
					set({
						etherPerUSDT: 0,
					});
				});
		},
		buyTokensByEther: async (amount: string): Promise<void> => {
			set({ isLoading: true });

			await ShineGameFiPresale.buyTokensByEther(amount, get().address)
				.then(() => {
					set({
						isLoading: false,
						success: true,
						error: null,
					});
				})
				.catch(() => {
					set({
						isLoading: false,
						success: false,
						error: 'Error approving tokens',
					});
				});
		},
		buyTokensByUSDT: async (amount: string): Promise<void> => {
			set({ isLoading: true });

			await ShineGameFiPresale.buyTokensByUSDT(amount, get().address)
				.then(() => {
					set({
						isLoading: false,
						success: true,
						error: null,
					});
				})
				.catch(() => {
					set({
						isLoading: false,
						success: false,
						error: 'Error approving tokens',
					});
				});
		},
		claimFirstStage: async (): Promise<void> => {
			set({ isLoading: true });

			await ShineGameFiPresale.claimFirstStage(get().address)
				.then(() => {
					set({
						isLoading: false,
						success: true,
						error: null,
					});
				})
				.catch(() => {
					set({
						isLoading: false,
						success: false,
					});
				});
		},
		claim: async (): Promise<void> => {
			set({ isLoading: true });

			await ShineGameFiPresale.claim(get().address)
				.then(() => {
					set({
						isLoading: false,
						success: true,
						error: null,
					});
				})
				.catch(() => {
					set({
						isLoading: false,
						success: false,
					});
				});
		},
		setAddress: (address: string): void => {
			set({ address });
		},
		reset: (): void => {
			set({
				isLoading: false,
				success: false,
				error: null,
			});
		},
	};
});
