// zustand imports
import { create } from 'zustand';

// store imports
import { useAccountStore } from './account.store';

// byd cars service imports
import * as tokenERC20Service from '../../../infrastructure/ethers/services/token-erc-20/token-erc-20.service';

type State = {
	balance: string;
};

type Actions = {
	getBalanceOf: (address: string) => void;
};

const initialState: State = {
	balance: '0.0',
};

export const useShifiStore = create<State & Actions>((set) => {
	return {
		...initialState,
		getBalanceOf: async (address: string): Promise<void> => {
			const { account } = useAccountStore.getState();

			await tokenERC20Service
				.balanceOf(account, address)
				.then((balance) => {
					set({
						balance: balance,
					});
				})
				.catch(() => {
					set({
						balance: '0.0',
					});
				});
		},
	};
});
