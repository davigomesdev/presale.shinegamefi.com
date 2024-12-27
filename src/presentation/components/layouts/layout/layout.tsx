// style imports
import * as Style from './layout.style';

// react imports
import { useEffect, useState } from 'react';

// env imports
import networkEnv from '../../../../domain/env/network.env';

// web3modal imports
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';

// props imports
import { LayoutProps } from './layout.props';

// store imports
import { useAccountStore } from '../../../../application/stores/ethers/account.store';

// component imports
import Navbar from '../navbar/navbar';
import Button from '../../common/button/button';
import tokens from '../../../../infrastructure/data/tokens.data';

const Layout = ({ children }: LayoutProps) => {
	const { open } = useWeb3Modal();
	const { address, isConnected, chainId } = useWeb3ModalAccount();

	const { setAccount, setToken } = useAccountStore((state) => state);
	const [key, setKey] = useState<number>(0);

	const handleOnClickOpenWeb3Modal = (): void => {
		open({ view: 'Networks' });
	};

	const isValidChain = (chainId: number | undefined): boolean => {
		if (chainId === networkEnv.bscId) {
			return true;
		} else if (chainId === networkEnv.matchId) {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		if (address) {
			setAccount(address);
			setKey((prevKey) => prevKey + 1);
		}
	}, [address, chainId]);

	useEffect(() => {
		if (chainId) {
			if (isValidChain(chainId)) setToken(tokens[chainId][0]);
		}
	}, [chainId]);

	return (
		<Style.Container>
			<Navbar />
			{isConnected && isValidChain(chainId) ? (
				<Style.Content key={key}>{children}</Style.Content>
			) : (
				<Style.Connect>
					<h1>Your wallet is not connected.</h1>
					<Button text='Connect Wallet to buy' width='300px' onClick={handleOnClickOpenWeb3Modal} />
				</Style.Connect>
			)}
		</Style.Container>
	);
};

export default Layout;
