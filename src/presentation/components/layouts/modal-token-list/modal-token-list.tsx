// style imports
import * as Style from './modal-token-list.style';

// props imports
import { ModalTokenListProps } from './modal-token-list.props';

// react imports
import { useEffect, useRef } from 'react';

// env imports
import networkEnv from '../../../../domain/env/network.env';

// type imports
import { TokenType } from '../../../../domain/types/token.type';

// data imports
import tokens from '../../../../infrastructure/data/tokens.data';

// web3modal imports
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

// store imports
import { useAccountStore } from '../../../../application/stores/ethers/account.store';
import { useTokenERC20Store } from '../../../../application/stores/ethers/token-erc-20.store';

const ModalTokenList = ({ onClickClose }: ModalTokenListProps) => {
	const { chainId } = useWeb3ModalAccount();

	const [setToken] = useAccountStore((state) => [state.setToken]);
	const [setAddress] = useTokenERC20Store((state) => [state.setAddress]);

	const content = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
		if (content.current && !content.current.contains(event.target as Node)) {
			onClickClose();
		}
	};

	const handleOnClickItem = (token: TokenType): void => {
		onClickClose();
		setToken(token);
		setAddress(token.contract);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, []);

	return (
		<Style.Container>
			<Style.Background />
			<Style.Content ref={content}>
				<h1>Select a token</h1>
				<Style.List>
					{chainId === networkEnv.bscId && (
						<>
							<Style.Item onClick={() => handleOnClickItem(tokens[networkEnv.bscId][0])}>
								<span>
									<img src={tokens[networkEnv.bscId][0].symbol} alt='TOKEN' />
								</span>
								<p>BNB</p>
							</Style.Item>
							<Style.Item onClick={() => handleOnClickItem(tokens[networkEnv.bscId][1])}>
								<span>
									<img src={tokens[networkEnv.bscId][1].symbol} alt='TOKEN' />
								</span>
								<p>USDT</p>
							</Style.Item>
						</>
					)}
					{chainId === networkEnv.matchId && (
						<>
							<Style.Item onClick={() => handleOnClickItem(tokens[networkEnv.matchId][0])}>
								<span>
									<img src={tokens[networkEnv.matchId][0].symbol} alt='TOKEN' />
								</span>
								<p>BNB</p>
							</Style.Item>
							<Style.Item onClick={() => handleOnClickItem(tokens[networkEnv.matchId][1])}>
								<span>
									<img src={tokens[networkEnv.matchId][1].symbol} alt='TOKEN' />
								</span>
								<p>USDT</p>
							</Style.Item>
						</>
					)}
				</Style.List>
			</Style.Content>
		</Style.Container>
	);
};

export default ModalTokenList;
