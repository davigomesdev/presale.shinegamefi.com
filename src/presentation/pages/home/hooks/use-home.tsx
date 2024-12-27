// react imports
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

// data imports
import tokens from '../../../../infrastructure/data/tokens.data';
import contracts from '../../../../infrastructure/data/contracts.data';

// type imports
import { ClaimType } from '../../../../domain/types/calim.type';

// utils imports
import { formatDate, formatTruncateDecimal } from '../../../../application/utils/format.utils';

// web3modal imports
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

// store imports
import { useAccountStore } from '../../../../application/stores/ethers/account.store';
import { useTokenERC20Store } from '../../../../application/stores/ethers/token-erc-20.store';
import { useShifiStore } from '../../../../application/stores/ethers/shifi.store';
import { useShineGameFiPresaleStore } from '../../../../application/stores/ethers/shine-game-fi-presale.store';

const useHome = () => {
	const { chainId } = useWeb3ModalAccount();

	const shineGameFiPresaleStore = useShineGameFiPresaleStore((state) => state);
	const { balance: shifiBalance, getBalanceOf: getShifiBalanceOf } = useShifiStore(
		(state) => state,
	);
	const [token] = useAccountStore((state) => [state.token]);
	const [balance, address, getBalanceOf, getBalanceOfEther] = useTokenERC20Store((state) => [
		state.balance,
		state.address,
		state.getBalanceOf,
		state.getBalanceOfEther,
	]);

	const [isActiveModalTokenList, setIsActiveModalTokenList] = useState<boolean>(false);
	const [isActiveModalError, setIsActiveModalError] = useState<boolean>(false);

	const [from, setFrom] = useState<string>('');
	const [to, setTo] = useState<string>('');

	const [claims, setClaims] = useState<ClaimType[]>([]);

	const reloadProgress = (): number => {
		const tokenTotal = 600_000_000;
		return ((tokenTotal - shineGameFiPresaleStore.balance) / tokenTotal) * 100;
	};

	const totalSumOfTokensPerUSDT = (usdAmount: number): number => {
		return shineGameFiPresaleStore.tokenPerUSDT * usdAmount;
	};

	const totalSumOfUSDTsPerToken = (tokenAmount: number): number => {
		return Number(tokenAmount) / shineGameFiPresaleStore.tokenPerUSDT;
	};

	const isToday = (strDate: string): boolean => {
		const today = new Date();
		const date = new Date(strDate);

		return (
			today.getDate() >= shineGameFiPresaleStore.claimDay &&
			today.getMonth() === date.getMonth() &&
			today.getFullYear() === date.getFullYear()
		);
	};

	const listClaims = (claimableAmount: number): ClaimType[] => {
		if (claimableAmount === 0) return [];

		const length =
			Number(shineGameFiPresaleStore.maxClaims) - Number(shineGameFiPresaleStore.numClaims);
		const tempClaimsList: ClaimType[] = [];
		const currentDate = new Date(shineGameFiPresaleStore.secondStageClaimDate * 1000);

		for (let i = 0; i < length; i++) {
			const withdrawalDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() + Number(shineGameFiPresaleStore.numClaims) + i,
				Number(shineGameFiPresaleStore.claimDay),
			);

			const claim: ClaimType = {
				amount: claimableAmount,
				date: formatDate(String(withdrawalDate)),
			};
			tempClaimsList.push(claim);
		}

		return tempClaimsList;
	};

	const handleToggleIsActiveModalTokenList = (): void => {
		setIsActiveModalTokenList(!isActiveModalTokenList);
	};

	const handleToggleIsActiveModalError = (): void => {
		setIsActiveModalError(!isActiveModalError);
	};

	const handleOnClickMaxButton = (): void => {
		const targetValue: string = balance;
		const sanitizedValue: string = targetValue.replace(/[^0-9.]/g, '');

		const nativeAmount: number = shineGameFiPresaleStore.etherPerUSDT * Number(sanitizedValue);
		const value: string = token.contract ? targetValue : String(nativeAmount);

		const totalTokensPerUSDT: number = totalSumOfTokensPerUSDT(Number(value));

		setFrom(sanitizedValue);
		setTo(totalTokensPerUSDT.toString());
	};

	const handleOnChangeSetFrom = (e: ChangeEvent<HTMLInputElement>): void => {
		const targetValue: string = e.target.value;
		const sanitizedValue: string = targetValue.replace(/[^0-9.]/g, '');

		const nativeAmount: number = shineGameFiPresaleStore.etherPerUSDT * Number(sanitizedValue);
		const value: string = token.contract ? targetValue : String(nativeAmount);

		const totalTokensPerUSDT: number = totalSumOfTokensPerUSDT(Number(value));

		setFrom(formatTruncateDecimal(Number(sanitizedValue), 6).toString());
		setTo(formatTruncateDecimal(totalTokensPerUSDT, 6).toString());
	};

	const handleOnChangeSetTo = (e: ChangeEvent<HTMLInputElement>): void => {
		const targetValue: string = e.target.value;
		const sanitizedValue: string = targetValue.replace(/[^0-9.]/g, '');

		const usdtAmount: number = totalSumOfUSDTsPerToken(Number(sanitizedValue));
		const nativeAmount: number = usdtAmount / shineGameFiPresaleStore.etherPerUSDT;

		setTo(formatTruncateDecimal(Number(sanitizedValue), 6).toString());
		setFrom(formatTruncateDecimal(token.contract ? usdtAmount : nativeAmount, 6).toString());
	};

	const handleOnSubmitBuyTokens = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		shineGameFiPresaleStore.reset();

		if (token.contract) {
			await shineGameFiPresaleStore.buyTokensByUSDT(from);
		} else {
			await shineGameFiPresaleStore.buyTokensByEther(from);
		}
	};

	const handleOnSubmitClaimFirstStage = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		await shineGameFiPresaleStore.reset();
		await shineGameFiPresaleStore.claimFirstStage();
	};

	const handleOnSubmitClaim = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		await shineGameFiPresaleStore.reset();
		await shineGameFiPresaleStore.claim();
	};

	useEffect(() => {
		setFrom('');
		setTo('');
	}, [token]);

	useEffect(() => {
		if (address) getBalanceOf();
		else getBalanceOfEther();
	}, [address]);

	useEffect(() => {
		if (shineGameFiPresaleStore.address) {
			shineGameFiPresaleStore.getTokenPerUSDT();
			shineGameFiPresaleStore.getEtherToUSDT();
		}
	}, [shineGameFiPresaleStore.address]);

	useEffect(() => {
		if (chainId) {
			getShifiBalanceOf(tokens[chainId][2].contract || '');
			shineGameFiPresaleStore.setAddress(contracts[chainId]);
		}
	}, [chainId]);

	useEffect(() => {
		setFrom('');
		setTo('');
		shineGameFiPresaleStore.getClaimData();
		shineGameFiPresaleStore.getTokenBalanceAvailableForPurchase();
		shineGameFiPresaleStore.getFirstStagebalances();
		if (chainId) getShifiBalanceOf(tokens[chainId][2].contract || '');
		if (token.contract) getBalanceOf();
		else getBalanceOfEther();
	}, [shineGameFiPresaleStore.success]);

	useEffect(() => {
		if (shineGameFiPresaleStore.error) setIsActiveModalError(true);
		else setIsActiveModalError(false);
	}, [shineGameFiPresaleStore.error]);

	useEffect(() => {
		if (shineGameFiPresaleStore.claimableAmount !== null) {
			setClaims(listClaims(shineGameFiPresaleStore.claimableAmount));
		}
	}, [shineGameFiPresaleStore.claimableAmount]);

	useEffect(() => {
		if (shineGameFiPresaleStore.claimableAmount !== null) {
			setClaims(listClaims(shineGameFiPresaleStore.claimableAmount));
		}
	}, [shineGameFiPresaleStore.numClaims]);

	useEffect(() => {
		if (shineGameFiPresaleStore.claimableAmount !== null) {
			setClaims(listClaims(shineGameFiPresaleStore.claimableAmount));
		}
	}, [shineGameFiPresaleStore.secondStageClaimDate]);

	useEffect(() => {
		shineGameFiPresaleStore.reset();
		shineGameFiPresaleStore.getClaimData();
		shineGameFiPresaleStore.getTokenBalanceAvailableForPurchase();
		shineGameFiPresaleStore.getFirstStageClaimDate();
		shineGameFiPresaleStore.getSecondStageClaimDate();
		shineGameFiPresaleStore.getFirstStagebalances();
	}, []);

	return {
		isLoading: shineGameFiPresaleStore.isLoading,
		from,
		to,
		token,
		balance,
		claims,
		lastClaimTime: shineGameFiPresaleStore.lastClaimTime,
		firstStageClaimDate: shineGameFiPresaleStore.firstStageClaimDate,
		firstStagebalances: shineGameFiPresaleStore.firstStagebalances,
		shifiBalance,
		isActiveModalTokenList,
		isActiveModalError,
		isToday,
		reloadProgress,
		handleOnClickMaxButton,
		handleOnChangeSetFrom,
		handleOnChangeSetTo,
		handleToggleIsActiveModalTokenList,
		handleToggleIsActiveModalError,
		handleOnSubmitBuyTokens,
		handleOnSubmitClaimFirstStage,
		handleOnSubmitClaim,
	};
};

export default useHome;
