// style imports
import * as Style from './navbar.style';

// web3modal imports
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';

// image imports
import LogoImage from '../../../assets/images/logo.png';

// component imports
import Button from '../../common/button/button';

const Navbar = () => {
	const { open } = useWeb3Modal();
	const { isConnected } = useWeb3ModalAccount();

	const handleOnClickOpenWeb3Modal = (): void => {
		open({ view: 'Networks' });
	};

	const handleOnClickGoShineWeb = (): void => {
		location.href = 'https://shinegamefi.com';
	};

	return (
		<Style.Container>
			<Style.Content>
				<Style.Logo onClick={handleOnClickGoShineWeb}>
					<img src={LogoImage} alt='Shine Game Fi' />
				</Style.Logo>
				<Button
					text={!isConnected ? 'Connect Wallet' : 'Change network'}
					width='200px'
					onClick={handleOnClickOpenWeb3Modal}
				/>
			</Style.Content>
		</Style.Container>
	);
};

export default Navbar;
