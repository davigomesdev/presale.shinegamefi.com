// zustand imports
import { create } from 'zustand';

// store imports
import { useAccountStore } from './account.store';

// byd cars service imports
import * as tokenERC20Service from '../../../infrastructure/ethers/services/token-erc-20/token-erc-20.service';

type State = {
	address: string | null | undefined;
	balance: string;
	allowance: number;
	success: boolean;
	error: string | null;
	isLoading: boolean;
};

type Actions = {
	getBalanceOf: () => void;
	getBalanceOfEther: () => void;
	getAllowance: (spender: string) => void;
	setAddress: (address: string | null | undefined) => void;
	approve: (spender: string, value: string) => void;
	reset: () => void;
};

const initialState: State = {
	address: null,
	balance: '0.0',
	allowance: 0,
	success: false,
	error: null,
	isLoading: false,
};

export const useTokenERC20Store = create<State & Actions>((set, get) => {
	return {
		...initialState,
		getBalanceOf: async (): Promise<void> => {
			const address = get().address;

			if (!address) return;

			const { account } = useAccountStore.getState();

			await tokenERC20Service
				.balanceOf(account, address)
				.then((balance) => {
					set({
						balance: balance,
						success: true,
						error: null,
					});
				})
				.catch(() => {
					set({
						success: false,
						error: 'There was an error in the request',
					});
				});
		},
		getBalanceOfEther: async (): Promise<void> => {
			const { account } = useAccountStore.getState();

			await tokenERC20Service
				.balanceOfEther(account)
				.then((balance) => {
					set({
						balance: balance,
						success: true,
						error: null,
					});
				})
				.catch(() => {
					set({
						success: false,
						error: 'There was an error in the request',
					});
				});
		},
		getAllowance: async (spender: string): Promise<void> => {
			const address = get().address;

			if (!address) return;

			const { account } = useAccountStore.getState();

			await tokenERC20Service
				.allowance(account, spender, address)
				.then((allowance) => {
					set({
						allowance: allowance,
					});
				})
				.catch(() => {
					set({
						error: 'There was an error in the request',
					});
				});
		},
		setAddress: (address: string | null | undefined): void => {
			set({ address });
		},
		approve: async (spender: string, value: string): Promise<void> => {
			const address = get().address;

			if (!address) return;

			set({ isLoading: true });

			await tokenERC20Service
				.approve(spender, value, address)
				.then(() => {
					set({
						isLoading: false,
						success: true,
						error: null,
					});
					get().getAllowance(spender);
				})
				.catch(() => {
					set({
						isLoading: false,
						success: false,
						error: 'Error approving tokens',
					});
				});
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
