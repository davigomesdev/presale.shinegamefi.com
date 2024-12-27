// style imports
import * as Style from '../styles/home.style';

// theme imports
import { theme } from '../../../themes/theme';

// enum imports
import { InputTypeEnum } from '../../../../domain/enums/input-type.enum';
import { ButtonThemeEnum } from '../../../../domain/enums/button-theme.enum';

// hooks imports
import useHome from '../hooks/use-home';

// utils imports
import { limitDecimalPlaces } from '../../../../application/utils/string.utils';
import { formatTimestampToDate, formatTruncateDecimal } from '../../../../application/utils/format.utils';

// icon imports
import { MdArrowDownward } from 'react-icons/md';

// image imports
import SHIFIImage from '../../../assets/images/tokens/shifi.png';

// component imports
import Button from '../../../components/common/button/button';
import Input from '../../../components/common/input/input';
import ModalTokenList from '../../../components/layouts/modal-token-list/modal-token-list';
import ModalLoading from '../../../components/layouts/modal-loading/modal-loading';
import ModalError from '../../../components/layouts/modal-error/modal-error';

const Home = () => {
	const {
		isLoading,
		from,
		to,
		token,
		balance,
		claims,
		firstStageClaimDate,
		firstStagebalances,
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
		handleOnSubmitClaim,
		handleOnSubmitClaimFirstStage,
	} = useHome();

	return (
		<>
			<Style.Container>
				<Style.Content>
					<Style.ProgessBar status={reloadProgress()}>
						<span />
						<p>{`${limitDecimalPlaces(reloadProgress(), 2)}%`}</p>
					</Style.ProgessBar>
					<Style.Form onSubmit={handleOnSubmitBuyTokens}>
						<Style.Header>
							<h1>Shine Sale</h1>
						</Style.Header>
						<Input
							label='From'
							token={token}
							balance={formatTruncateDecimal(Number(balance), 6).toString()}
							placeholder='0.0'
							type={InputTypeEnum.TEXT}
							value={from}
							onClick={handleToggleIsActiveModalTokenList}
							onClickMaxButton={handleOnClickMaxButton}
							onChange={handleOnChangeSetFrom}
							required
						/>
						<Style.Shape>
							<MdArrowDownward />
						</Style.Shape>
						<Input
							label='To'
							token={{ name: 'MINER', symbol: SHIFIImage }}
							balance={shifiBalance}
							placeholder='0.0'
							type={InputTypeEnum.TEXT}
							value={to}
							onChange={handleOnChangeSetTo}
							required
						/>
						<div className='buttons'>
							<Button
								text='Buy Tokens'
								width='100%'
								theme={ButtonThemeEnum.ACTIVE}
								radius='10px'
								disabled={Number(balance) <= 0 || Number(from) > Number(balance) ? true : false}
							/>
						</div>
					</Style.Form>
					<Style.Claims onSubmit={handleOnSubmitClaimFirstStage}>
						<Style.Header>
							<h1>TGE 50% in launch</h1>
						</Style.Header>
						{firstStagebalances > 0 ? (
							<Style.Claim>
								<div>
									<span>
										<img src={SHIFIImage} alt='TOKENSHIFIImage' />
									</span>
									<h2>{limitDecimalPlaces(firstStagebalances)}</h2>
								</div>
								{Math.floor(new Date().getTime() / 1000) >= firstStageClaimDate ? (
									<Button
										text='Claim '
										theme={ButtonThemeEnum.DEFAULT}
										width='80px'
										fontSize={theme.font.size.sm}
									/>
								) : (
									<p>{formatTimestampToDate(firstStageClaimDate)}</p>
								)}
							</Style.Claim>
						) : (
							<p>Ops!, No claims available.</p>
						)}
					</Style.Claims>
					<Style.Claims onSubmit={handleOnSubmitClaim}>
						<Style.Header>
							<h1>50% in March.</h1>
						</Style.Header>
						{claims.length > 0 ? (
							claims.map((calim, index) => (
								<Style.Claim key={index}>
									<div>
										<span>
											<img src={SHIFIImage} alt='TOKENSHIFIImage' />
										</span>
										<h2>{limitDecimalPlaces(calim.amount, 5)}</h2>
									</div>
									{isToday(calim.date) ? (
										<Button
											text='Claim '
											theme={ButtonThemeEnum.DEFAULT}
											width='80px'
											fontSize={theme.font.size.sm}
										/>
									) : (
										<p>{calim.date}</p>
									)}
								</Style.Claim>
							))
						) : (
							<p>Ops!, No claims available.</p>
						)}
					</Style.Claims>
				</Style.Content>
			</Style.Container>
			{isActiveModalTokenList && (
				<ModalTokenList onClickClose={handleToggleIsActiveModalTokenList} />
			)}
			{isLoading && (
				<ModalLoading
					title='Wait for the transaction'
					message='Wait for the transaction to complete.'
				/>
			)}
			{isActiveModalError && (
				<ModalError
					title='Transaction error'
					message='Check your balance and the minimum purchase is $2.'
					onClickClose={handleToggleIsActiveModalError}
				/>
			)}
		</>
	);
};

export default Home;
