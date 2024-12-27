// style imports
import * as Style from './input.style';

// prop imports
import { InputProps } from './input-props';

// icon imports
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { limitDecimalPlaces } from '../../../../application/utils/string.utils';

const Input = ({
	label,
	token,
	balance,
	placeholder,
	value,
	type,
	required,
	onClick,
	onClickMaxButton,
	onChange,
}: InputProps) => {
	const isValid = value.toString().length > 0;

	return (
		<Style.Group>
			<Style.Label>
				<p>{label}</p>
				<p>Balance: {limitDecimalPlaces(Number(balance), 7)}</p>
			</Style.Label>
			<Style.Content>
				<Style.Container
					value={value}
					placeholder={placeholder}
					type={type}
					onChange={onChange}
					isValid={isValid}
					required={required}
				/>
				{label === 'From' && (
					<Style.MaxButton onClick={onClickMaxButton} type='button'>
						MAX
					</Style.MaxButton>
				)}
				<Style.SelectButton onClick={onClick} type='button'>
					<span>
						<img src={token.symbol} alt='TOKEN' />
					</span>
					<p>{token.name}</p>
					<MdOutlineKeyboardArrowDown />
				</Style.SelectButton>
			</Style.Content>
		</Style.Group>
	);
};

export default Input;
