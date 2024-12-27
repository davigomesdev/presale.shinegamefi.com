// zustand imports
import { create } from 'zustand';

// env imports
import networkEnv from '../../../domain/env/network.env';

// type imports
import { TokenType } from '../../../domain/types/token.type';

// data imports
import tokens from '../../../infrastructure/data/tokens.data';

type State = {
	account: string;
	token: TokenType;
};

type Actions = {
	setAccount: (account: string) => void;
	setToken: (token: TokenType) => void;
};

const initialState: State = {
	account: localStorage.getItem('account') || '0x',
	token: JSON.parse(localStorage.getItem('token') || JSON.stringify(tokens[networkEnv.bscId][0])),
};

export const useAccountStore = create<State & Actions>()((set) => ({
	...initialState,
	setAccount: (account: string): void => {
		localStorage.setItem('account', account);
		set({ account });
	},
	setToken: (token: TokenType): void => {
		localStorage.setItem('token', JSON.stringify(token));
		set({ token });
	},
}));
